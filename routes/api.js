const express = require('express');
const router = express.Router();

// models
const Incomes = require('../models/incomes');
const Expenses = require('../models/expenses');

// get all
router.get('/incomes', (req, res, next) => {
  const incomes = Incomes.find({}, (err, docs) => {
    if (err) next(err);
  });

  incomes.exec((req, data) => {
    res.json(data);
  });
});

router.get('/expenses', (req, res, next) => {
  const expenses = Expenses.find({});
  expenses.exec((err, data) => {
    if (err) {
      res.status(400).send(err);
      next(err);
    };
    res.json(data);
  });
});

// find just one by id and here delete
router.delete('/incomes/:id', (req, res, next) => {
  const id = req.params.id;
  const income = Incomes.findById(id);

  income.exec((err, data,) => {
    if (err) {
       res.status(400).send(err);
       next(err);
    };
    if (data) {
      data.remove();
      res.send();
    }});
});

router.delete('/expenses/:id', (req, res, next) => {
  const id = req.params.id;
  const expense = Expenses.findById(id);
  expense.exec((err, data) => {
    if (err) {
      res.status(400).send(err);
      next(err);
    };

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
    if (err) console.log(err, errors);
    next(err);
  });
  
  res.send(incomeData.id);
});

router.post('/expenses/add', (req, res, next) => {
  const body = req.body;
  const expenseData = new Expenses(body);

  const errors = expenseData.validateSync();
  expenseData.save(err => {
    if (err) console.log(err, errors)
  })

  // tutaj powinienem wyslac http status code , tak jak overment
  // przed musze sprawdzic w network co pokazuje, jaki status
  res.status(200).send(expenseData.id);
});




module.exports = router;