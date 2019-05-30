const express = require('express');
const router = express.Router();
// models
const Incomes = require('../models/incomes');

router.get('/', (req, res, next) => {
  console.log("alladujeejejjeje")
  const incomes = Incomes.find({});
  incomes.exec((req, data) => {
    res.json(data);
  }); 
});

module.exports = router;