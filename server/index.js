require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
  SELECT    "productId", "name", "price", "image", "shortDescription"
  FROM      "products"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const { productId } = req.params;
  if (!parseInt(productId, 10) || parseInt(productId, 10) < 1) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }
  const sql = `
    SELECT  *
    FROM    "products"
    WHERE   "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        res.status(404).json({
          error: `"productId" ${productId} is not found`
        });
      } else {
        res.json(product);
      }
    })
    .catch(err => next(err));
});

app.get('/api/carts', (req, res, next) => {
  if (req.session.cartId) {
    const sql = `
    select "c"."cartItemId",
       "c"."price",
       "p"."productId",
       "p"."image",
       "p"."name",
       "p"."shortDescription"
    from "cartItems" as "c"
    join "products" as "p" using ("productId")
    where "c"."cartId" = $1
    `;
    const param = [req.session.cartId];
    db.query(sql, param)
      .then(result => res.json(result.rows))
      .catch(err => next(err));
  } else {
    return res.json([]);
  }
});

app.post('/api/carts', (req, res, next) => {
  const cart = req.body;
  if (!parseInt(cart.productId, 10) || parseInt(cart.productId, 10) < 0) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }
  const sql1 = `
  SELECT      "price"
  FROM        "products"
  WHERE       "productId" = $1
  `;
  const params1 = [cart.productId];
  db.query(sql1, params1)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        throw new ClientError('cannot find "productId"', 400);
      } else {
        if (req.session.cartId) {
          return ({ price: product.price, cartId: req.session.cartId });
        } else {
          const sql2 = `
            INSERT INTO   "carts" ("cartId", "createdAt")
            VALUES (default, default)
            RETURNING "cartId"
          `;
          return db.query(sql2)
            .then(cart => ({ price: product.price, cartId: cart.rows[0].cartId }));
        }
      }
    })
    .then(data => {
      req.session.cartId = data.cartId;
      const sql3 = `
      INSERT INTO   "cartItems" ("cartId", "productId", "price")
      VALUES        ($1, $2, $3)
      RETURNING     *
      `;
      const params3 = [data.cartId, cart.productId, data.price];
      return db.query(sql3, params3)
        .then(result => result.rows[0]);
    })
    .then(data => {
      const sql4 = `
      SELECT  "c"."cartItemId",
              "c"."price",
              "p"."productId",
              "p"."image",
              "p"."name",
              "p"."shortDescription"
      FROM    "cartItems" as "c"
      JOIN    "products" as "p" using ("productId")
      WHERE   "c"."cartItemId" = $1
      `;
      const params4 = [data.cartItemId];
      return db.query(sql4, params4)
        .then(result => res.status(201).json(result.rows));
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
