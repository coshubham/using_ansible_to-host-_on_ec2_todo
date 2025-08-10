// using supertest for integration testing and api, http testing

const request = require('supertest');
const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require('mongoose');

const app = require('../../server');
const Todo = require('../../models/todoModel');


describe("Todo API Integeration Tests", () => {
       let mongoServer;

       beforeAll(async () => {
              mongoServer = await MongoMemoryServer.create();
              const mongoUri = mongoServer.getUri();
              await mongoose.disconnect(); // Ensure no previous connections
              await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
       });

       afterAll(async () => {
              await mongoose.disconnect();
              await mongoServer.stop();
       });

       describe("GET /api/get-todo", () => {
              it("should return all todos", async () => {
                  await Todo.create([
                      { title: 'Todo 1', completed: false },
                      { title: 'Todo 2', completed: true }
                  ]);
          
                  const response = await request(app).get('/api/get-todo');
                  console.log("respone is: ",response.body);
                  expect(response.statusCode).toBe(200);
                  // Optionally: check that the response body contains the created todos
                  expect(response.body.length).toBe(2);
                  expect(response.body[0].title).toBe('Todo 1');
                  expect(response.body[1].title).toBe('Todo 2');
              });
          });

          describe("POST /api/add-todo", () => {
              it("should add a new todo", async () => {
                  const newTodo = { title: 'New Todo', completed: false };
          
                  const response = await request(app)
                      .post('/api/add-todo')
                      .send(newTodo);
          
                      console.log("respone is: ",response.body);
                      expect(response.statusCode).toBe(200);
                      expect(response.body.title).toBe('New Todo');

                      const todo = await Todo.findById(response.body._id);
                      console.log("todo is: ",todo);
                      expect(todo).toBeTruthy();
                      expect(todo.title).toBe('New Todo');

              });
          });
          
})