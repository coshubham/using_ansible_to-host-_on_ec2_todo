import React from "react";
import { fireEvent, render, screen, cleanup, waitFor } from "@testing-library/react";
import TodoList from "../../components/TodoList";
import BACKEND_URL from "../../config/config";

// Cleanup between tests
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

// Global fetch mock
global.fetch = jest.fn();

describe("TodoList Component", () => {
  test("fetches and renders todos", async () => {
    const mockTodos = [
      { _id: "1", title: "Todo 1", completed: false },
      { _id: "2", title: "Todo 2", completed: false },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTodos,
    });

    render(<TodoList />);

    // Wait for todos to be rendered
    await waitFor(() => {
      expect(screen.getByText("Todo 1")).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith(`${BACKEND_URL}/get-todo`);
  });

  test("adds a new todo when form is submitted", async () => {
    const newTodo = { _id: "3", title: "New Todo", completed: false };

    // First mock the GET
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    // Then mock the POST for new todo
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => newTodo,
    });

    fetch.mockResolvedValueOnce({
       ok: true,
       json: async () => [],
       }).mockResolvedValueOnce({
       ok: true,
       json: async () => newTodo,
       });
    render(<TodoList />);


    const input = screen.getByPlaceholderText("Enter a new todo");
    const button = screen.getByRole("button", { name: "Add Todo" });

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(button);

    // Wait for the new todo to appear
    await waitFor(() => {
      expect(screen.getByText("New Todo")).toBeInTheDocument();
    });
    expect(fetch).toHaveBeenCalledWith(`${BACKEND_URL}/add-todo`, expect.any(Object));
  });




  test("renders a Delete button for each todo", async () => {
    const mockTodos = [
      { _id: "1", title: "Todo 1", completed: false },
      { _id: "2", title: "Todo 2", completed: false },
    ];

    // Mock the GET fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTodos,
    });

    render(<TodoList />);

    await waitFor(() => {
      const deleteButtons = screen.getAllByText("Delete");
      expect(deleteButtons.length).toBe(mockTodos.length);
    });
  });
});
