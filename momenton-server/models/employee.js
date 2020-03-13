const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    ID: {
      type: Number,
      required: true
    },
    employeeName: {
      type: String,
      required: true
    },
    managerID: {
      type: Number,
      required: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('employee', employeeSchema);
