var express = require('express');
var bodyParser = require('body-parser');
let {ObjectID} = require('mongodb');
// import {ObjectID} from 'mongodb';
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

let port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }
  let returnedTodo = Todo.findOne({_id: id})
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((e) => {
      res.status(400).send();
    })
});

app.get('/todos/', (req, res) => {
  Todo.find({})
    .then((docs) => {
      res.status(200)
        .send(docs);
    })
    .catch((err) => {
      res.status(400)
        .send()
    })
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
