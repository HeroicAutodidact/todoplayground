const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(0);
          done();

          // Note: This is a catch statement on the mongoose async call
          // .end statements do not get catch blocks (they aren't a promise)
        }).catch((e) => done(e));
      });
  });
});


describe('GET /todos/:id', () => {
  it('should get all todos', (done) => {
    firstId = todos[0]._id.toHexString();
    request(app)
      .get(`/todos/${firstId}`)
      .expect(200)
      .expect((res) => {
        Todo.find({
          _id: firstId
        })
          .then((doc) => {
            expect(doc.text).toBe('First test todo');
          })
      })
      .end(done);
      // .end((err, res) => {
      //   if (err) {
      //     return done(err);
      //   }
      //   done();
      // })
      // .catch((e) => {
      //   return done(e);
      // });
  })
});