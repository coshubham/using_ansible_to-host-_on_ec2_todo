import React from "react";

import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import AddTodo from "../../components/AddTodo";

afterEach(() => {
       cleanup();
       jest.clearAllMocks();
});

describe("Testing AddTodo Component", () => {
       test("Render the input field and add button", () => {
              render(<AddTodo onAdd={() => {}}/>)
              expect(screen.getByPlaceholderText("Enter a new todo")).toBeInTheDocument();
              expect(screen.getByRole("button", { name: "Add Todo" })).toBeInTheDocument();
       })

       test("When form is submit, the oadd function to be invoked", () => {
              const mockOnAdd = jest.fn();
              render(<AddTodo onAdd={mockOnAdd} />);

              const input = screen.getByPlaceholderText("Enter a new todo");
              const button = screen.getByRole("button", { name: "Add Todo" });

              fireEvent.change(input, { target: { value: "New Todo" } });
              fireEvent.click(button);
              expect(mockOnAdd).toHaveBeenCalledWith("New Todo");
       })
})
       