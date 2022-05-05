const express = require('express');
const router = express.Router();
const db = require('../models/db');
const Product = require('../models/product');

function promiseQuery(con, query, params) {
  return new Promise((resolve, reject) => {
    return db.query(query, params, (err, resp) => {
      if (err) {
        reject(err);
      } else {
        resolve(resp);
      }
    });
  });
}

/* GET home page. */
router.get('/', async (req, res, next) => {
  if (!req.session.hasOwnProperty('cart')) {
    req.session.cart = [];
  }
  console.log(req.session.cart);
  const products = await Product.loadAll();
  res.render('index', {
    products,
    cart: req.session.cart
  });
});

router.get('/cart', async (req, res, next) => {
  if (!req.session.hasOwnProperty('cart')) {
    req.session.cart = [];
  }
  let cart;
  try {
    cart = await Product.load(req.session.cart);
  } catch (e) {
    cart = [];
  }
  res.render('cart', {
    cart
  });
});

router.get('/cart/error', async (req, res, next) => {
  if (!req.session.hasOwnProperty('cart')) {
    req.session.cart = [];
  }
  console.log(await Product.load(req.session.cart));
  res.render('cart', {
    cart: await Product.load(req.session.cart),
    error: 'Ktoś wykupił produkty w twoim koszyku. Oto pozostałe dostępne produkty!'
  });
});

router.post('/cart/clear', async (req, res, next) => {
  req.session.cart = [];
  res.redirect('/');
});

router.post('/cart/checkout', async (req, res, next) => {
  if (!req.session.hasOwnProperty('cart')) {
    req.session.cart = [];
  }
  if (req.session.cart.length === 0) {
    res.redirect('/');
  }
  db.getConnection(async (err, con) => {
    if (err) {
      throw err;
    }
    await promiseQuery(con,'SET TRANSACTION ISOLATION LEVEL SERIALIZABLE', null);
    let rows = (await promiseQuery(con, `SELECT id from ${Product.databaseName} where id in (?)`, [req.session.cart])).map(e => e.id)
    // let rows = new Promise((await con.query(`SELECT id from ${Product.databaseName} where id in (?)`, [req.session.cart]));

    console.log(rows, rows.length, req.session.cart, req.session.cart.length);
    if (rows.length !== req.session.cart.length) {
      req.session.cart = req.session.cart.filter((e) => rows.includes(e));
      con.rollback();
      con.release();
      res.redirect('/cart/error');
    } else {
      await promiseQuery(con, `delete from ${Product.databaseName} where id in (?)`, [req.session.cart]);
      req.session.cart = []
      await con.commit();
      con.release()
      res.redirect('/');
    }

  });
  // await con.beginTransaction();
  // await con.commit();

});

router.post('/cart/add', async (req, res, next) => {
  if (!req.session.hasOwnProperty('cart')) {
    req.session.cart = [];
  }

  if (Object.hasOwnProperty.call(req.body,'id')) {
    if (await Product.load(req.body.id) && !(req.body.id in req.session.cart)) {
      req.session.cart.push(parseInt(req.body.id));
    }
  }
  res.redirect('/');
})

router.post('/cart/delete', async (req, res, next) => {
  if (!req.session.hasOwnProperty('cart')) {
    req.session.cart = [];
  }
  if (Object.hasOwnProperty.call(req.body,'id')) {
    const i = req.session.cart.indexOf(parseInt(req.body.id));
    console.log(i);
    if (i > -1) {
      req.session.cart.pop();
    }
  }
  res.redirect('/');
})

module.exports = router;
