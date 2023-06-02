import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

interface Todo {
  id: number;
  text: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data, error }: { data: any; error: any } = await supabase
      .from("todos")
      .select("*");
    if (error) {
      console.error("Error fetching todos:", error.message);
    } else {
      if (data !== null) {
        setTodos(data);
      } else {
        setTodos([]);
      }
    }
  };

  const addTodo = async (todoText: any) => {
    const { data, error }: { data: any; error: any } = await supabase
      .from("todos")
      .insert([{ text: todoText }])
      .select("*");
    if (error) {
      console.error("Error adding todo:", error.message);
    } else {
      if (data !== null && data.length > 0) {
        const newTodo = data[0];
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setTodoText("");
      }
    }
    console.log(data.type)
  };

  const deleteTodo = async (id: number) => {
    const { error } = await supabase.from("todos").delete().match({ id });
    if (error) {
      console.error("Error deleting todo:", error.message);
    } else {
      setTodos(todos.filter((todo: any) => todo.id !== id));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (todoText.trim() !== "") {
      await addTodo(todoText);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="any"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>
            {todo.text}{" "}
            <button onClick={() => deleteTodo(todo.id)}>Finished</button>
          </li>
        ))}
        <li>{todoText}</li>
      </ul>
    </>
  );
}
