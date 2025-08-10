import React from "react";

import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import TodoItem from "../../components/TodoItem";

afterEach(() => {
       cleanup();
       jest.clearAllMocks();
});


describe("Testing TodoItem Component", () => {
              const mockTodo = {
                     id: 1,
                     title: "New Todo",
                     completed: false,
              };

              test("check if the todo title gets rendered", () => {   
                     render(<TodoItem todo={mockTodo} />);
                     expect(screen.getByText(mockTodo.title)).toBeInTheDocument();
              });



       // check if the status of the todo is rendered
              test("check if the status of the todo is rendered", () => {
                     render(<TodoItem todo={mockTodo} />);
                     const todoElement = screen.getByText(mockTodo.title);
                     expect(todoElement).toBeInTheDocument();});


       // check if the ondelete method is invoked when the delete button is clicked
              test("check if the onDelete method is invoked when the delete button is clicked", () => {
                     const mockOnDelete = jest.fn();

              render(<TodoItem todo={mockTodo} onDelete={mockOnDelete} />);

              const deleteButton = screen.getByText("Delete");
              fireEvent.click(deleteButton);

              expect(mockOnDelete).toHaveBeenCalledTimes(1);
              });

});