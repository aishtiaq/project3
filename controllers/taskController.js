const db = require("../models");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");


// Defining methods for the TaskssController
module.exports = {
  findAll: function(req, res) {
    
    db.Tasks
      .find(req.query)
      .sort({ date: -1 })
      .populate('user')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUserId: function(req, res) {
    db.Tasks
      .find({ user: req.params.id})
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Tasks
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Tasks
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => {res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Tasks
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}
