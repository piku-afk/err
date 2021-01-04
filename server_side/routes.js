const express = require('express');
const connection = require('./mysqlConfig');
const moment = require('moment');

const router = express.Router();

//getting all drugs
router.get('/', (req, res) => {
  const searchQuery = req.query.search;
  let query;
  if(searchQuery) {
    query = `call get_drugs('${searchQuery}')`;
  } else {
    query = 'call get_all_drugs()';
  }

  connection.query(query, (error, results, fields) => {
    if(error) {
      console.log(error);
      return
    }
    res.send(results);
  });
});

//adding new drug
router.post('/new', (req, res) => {
  const {
    mName,
    mAddress,
    dName,
    dType,
    dQuantity,
    dPrice
  } = req.body;

  const query = `call add_new_drug('${mName}', '${mAddress}', '${dName}', ${dType}, ${dQuantity}, ${dPrice})`;
  connection.query(query, (error, results, fields) => {
    if(error) {
      console.log(error);
      return
    }
    res.json(results);
  });
  // res.json(query);
});

//creating bill
router.post('/bill', (req, res) => {
  let {
    cFirst,
    cLast,
    cPhone,
    dName,
    dPhone,
    oPayMethod,
    orderItems
  } = req.body;

  !cLast ? cLast = null : cLast = `'${cLast}'`;
  !dName ? dName = null : dName = `'${dName}'`;
  !dPhone ? dPhone = null : dPhone = `'${dPhone}'`;

  const oDate = moment().format('YYYY-MM-DD H:mm:ss');
  
  const query = `call add_new_order('${cFirst}', ${cLast}, '${cPhone}', ${dName}, ${dPhone}, '${oDate}', ${oPayMethod})`;
  connection.query(query, (error, results, fields) => {
    if(error) {
      console.log(error);
      return
    }
    results.pop();
    const ordId = results[0][0].ord_id;

    orderItems.forEach(({id, quantity}) => {
      const query = `call add_new_order_items(${ordId}, ${id}, ${quantity})`;
      connection.query(query, (error, results, fields) => {
        if(error) {
          console.log(error);
          return
        }
        if(results) {
          console.log('successfully added...');
        }
      });
    });
    res.json(results);
  });
})

//getting all orders
router.get('/orders', (req, res) => {

  const searchQuery = req.query.search;
  const dateQuery = req.query.date;
  let query;
  if(searchQuery) {
    query = `call get_orders_by_name('${searchQuery}')`;
  } else if (dateQuery) {
    query = `call get_orders_by_date('${dateQuery}')`;
  } else {
    query = 'call get_all_orders()';
  }
  connection.query(query, (error, results, fields) => {
    if(error) {
      console.log(error);
      return
    }
    res.send(results);
  });
});

//getting order items for an order
router.get('/orders/:id', (req, res) => {
  const id = req.params.id;
  const query = `call get_order_items(${id})`;
  connection.query(query, (error, results, fields) => {
    if(error) {
      console.log(error);
      return
    }
    res.send(results);
  });
});

module.exports = router;