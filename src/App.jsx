// src/App.jsx
import React, { useState } from "react";

export default function App() {
  // State hooks
  const [todos, setTodos] = useState([
    { id: 1, title: "Learn useState", done: false },
    { id: 2, title: "Build a tiny Todo", done: true },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [nextId, setNextId] = useState(3);

  // Derived counts
  const total = todos.length;
  const completed = todos.filter((t) => t.done).length;
  const active = total - completed;

  // Handlers
  function addTodo(e) {
    e.preventDefault(); // stop page reload
    const title = newTitle.trim();
    if (!title) return; // ignore empty input
    const newTodo = { id: nextId, title, done: false };
    setTodos((prev) => [newTodo, ...prev]); // immutable add
    setNewTitle(""); // reset input
    setNextId((n) => n + 1); // increment ID
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="container">
      <h1>Todo App - useState Only</h1>

      {/* Counters */}
      <div className="kpis">
        <div className="kpi">
          <div className="num">{total}</div>
          <div>Total</div>
        </div>
        <div className="kpi">
          <div className="num">{active}</div>
          <div>Active</div>
        </div>
        <div className="kpi">
          <div className="num">{completed}</div>
          <div>Done</div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={addTodo} className="row">
        <input
          placeholder="Type a new task..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button type="submit" disabled={!newTitle.trim()}>
          Add
        </button>
      </form>

      {/* Todo list */}
      {todos.length === 0 ? (
        <div>No tasks yet. Add your first one!</div>
      ) : (
        <div className="list">
          {todos.map((todo) => (
            <div className="item" key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className={todo.done ? "done" : ""}>{todo.title}</span>
              </label>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
