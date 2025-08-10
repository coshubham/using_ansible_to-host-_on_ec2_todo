const controllers = require("../../controllers/controllers"); // Ensure the path is correct

jest.mock('../../models/todoModel.js'); // Mock the Todo model

const mockSave = jest.fn();
const mockFind = jest.fn();

const Todo = require('../../models/todoModel'); // Import the Todo model

Todo.find = mockFind
Todo.mockImplementation(() => ({
       save: mockSave
     }));
     
// Todo.save = mockSave;

describe('When Todo Controller Is invoked Tests', () => {
       let req, res;

       beforeEach(() => {
              req = {
                     body: {},
                     params: {}
              };
              res = {
                     status: jest.fn(()=>res),
                     json: jest.fn(()=>req),
              };
              mockSave.mockClear();
              mockFind.mockClear();
       });
       describe("For getTodos function", () => {
              it("If everything gose right, should return all todos", async () => {
                     const mockTodos = [
                            { _id: '1', title: 'Todo 1', completed: false},
                            { _id: '2', title: 'Todo 2', completed: false },
                            { _id: '3', title: 'Todo 3', completed: false },
                            { _id: '4', title: 'Todo 4', completed: false }
                     ];
                     mockFind.mockResolvedValue(mockTodos);
                     await controllers.getTodos(req,res);


                     expect(mockFind).toHaveBeenCalled();
                     expect(res.status).toHaveBeenCalledWith(200);
                     expect(res.json).toHaveBeenCalledWith(mockTodos);
                     
              });

              it(" If something goes wrong, it should handel errors", async () => {
                     const errorMessage = "Error fetching todos";
                     mockFind.mockRejectedValue(new Error(errorMessage));
                     await controllers.getTodos(req,res);
                     expect(mockFind).toHaveBeenCalled();
                     expect(res.status).toHaveBeenCalledWith(500);
                     expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
              });
       });    

       describe("For addTodo function", () => {
              it("If everything goes right, should add a new todo", async () => {
                  const newTodo = { _id: '1', title: 'New Todo', completed: false };
                  req.body = { title: "New Todo" };
                
                  mockSave.mockResolvedValue(newTodo);
          
                  await controllers.addTodo(req, res);
          
                  expect(mockSave).toHaveBeenCalled();
                  expect(res.status).toHaveBeenCalledWith(200);
                  expect(res.json).toHaveBeenCalledWith(newTodo);  // ✅ Updated
              });
          
              it("If something goes wrong, it should handle errors", async () => {
                  const errorMessage = "Error adding todo";
                  req.body = { title: "New Todo" }; // ✅ Make sure req.body is set
                  mockSave.mockRejectedValue(new Error(errorMessage));
                  
                  await controllers.addTodo(req, res);
          
                  expect(mockSave).toHaveBeenCalled(); // ✅ Correct mock
                  expect(res.status).toHaveBeenCalledWith(500);
                  expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
              });
          });
          
       });