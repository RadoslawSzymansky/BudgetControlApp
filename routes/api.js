const express = require('express');
const router = express.Router();
// models
const Incomes = require('../models/incomes');

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
    data.remove()
  });
  /// znajdywanie wiecej: 
  //   const findNews = News
    // .find({ title: new RegExp(search.trim(), 'i') })
    // .sort({ created: sort })
    // i inne
});

// add
router.post('/incomes/add', (req, res, next) => {
  const body = req.body;
  const incomeData = new Incomes(body);

  const errors = incomeData.validateSync();
  incomeData.save(err => {
    if (err) console.log(err, errors)
  })
});

router.get('/expenses', (req, res, next) => {
  const incomes = Incomes.find({});
  incomes.exec((req, data) => {
    res.json(data);
  });
});

router.delete('/expenses/:id', (req, res, next) => {
  const id = req.params.id;
  const expense= Incomes.findById(id);
    expense.exec((req, data) => {
    data.remove()
  });
});

router.post('/expenses/add', (req, res, next) => {
  const body = req.body;
  const expenseData = new Incomes(body);

  const errors = expenseData.validateSync();
  expenseData.save(err => {
    if (err) console.log(err, errors)
  })
});




module.exports = router;