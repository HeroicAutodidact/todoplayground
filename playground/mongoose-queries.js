const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

let id = "5825549aeb8328f9a5a0d6f4";


// Demonstration of a useful check for ID validation
if (!ObjectID.isValid(id)) {
  console.log('ID not valid!');
}

Todo.find({
  _id: id
})
.then((todos) => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: id
})
.then((todos) => {
  console.log('Todos find one', todos);
});


Todo.findById(id)
.then((todos) => {
  console.log('Todos by Id', todos);
}).catch((e) => console.log(e));
