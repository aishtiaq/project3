const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TaskSchema = new Schema({
  taskName: {
    type: String,
    required: true
  },
  taskDetails: {
    type: String,
    required: true
  },
  status: {
    type: String, 
    default: 'new',
    required: true
  },
  dueDate: {
    type: Date,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Tasks = mongoose.model("tasks", TaskSchema);