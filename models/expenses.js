var mongoose = require("mongoose");
var Schema = mongoose.Schema

var Expenses = new Schema({
  text: { type: String, required: [true, 'Pole description jest wymagane'] },
  currency: { type: String, required: [true, 'Pole tytuł jest wymagane'], default: "PLN" },
  date: { type: Date, default: Date.toString },
  value: { type: Number, required: true }
});

module.exports = mongoose.model('Expenses', Expenses)
