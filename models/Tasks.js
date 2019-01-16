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
  completeDate: {
    type: Date,
    required: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

var Tasks = mongoose.model("tasks", TaskSchema);

module.exports = Tasks