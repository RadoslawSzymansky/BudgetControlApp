const express = require('express');
const router = express.Router();
// models
const Incomes = require('../models/incomes');
const Expenses = require('../models/expenses');

// routers 
router.get('/incomes', (req, res, next) => {
  const incomes = Incomes.find({});
  incomes.exec((req, data) => {
    res.json(data);
  });
});

// find just one by id and here delete
router.delete('/incomes/:id', (req, res, next) => {
  const id = req.params.id;
  const income = Incomes.findById(id);
  income.exec((req, data) => {
    console.log(data, id)
    if (data) {
      data.remove()
      res.send('deleted')
    }  });
  // res.send('deleted')
  /// znajdywanie wiecej: 
  //   const findNews = News
    // .find({ title: new RegExp(search.trim(), 'i') })
    // .sort({ created: sort })
    // i inne
});

router.delete('/expenses/:id', (req, res, next) => {
  const id = req.params.id;
  const expense = Expenses.findById(id);
  expense.exec((req, data) => {
    if (data) {
      data.remove()
      res.send('deleted')
    }
  });
  
});

// add
router.post('/incomes/add', (req, res, next) => {
  const body = req.body;
  const incomeData = new Incomes(body);

  const errors = incomeData.validateSync();
  incomeData.save(err => {
    if (err) console.log(err, errors)
  })
  res.send('Ok')
});

router.get('/expenses', (req, res, next) => {
  const expenses = Expenses.find({});
  expenses.exec((req, data) => {
    res.json(data);
  });
});


router.post('/expenses/add', (req, res, next) => {
  const body = req.body;
  const expenseData = new Expenses(body);

  const errors = expenseData.validateSync();
  expenseData.save(err => {
    if (err) console.log(err, errors)
  })
  // wymagane cos wyslac żeby mogło sie spelnić promise na then po post, chyba powinno sie wyslac status polaczenia
  res.send('Ok')

});




module.exports = router;