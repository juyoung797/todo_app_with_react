import { useEffect, useState } from "react";
import { todoApi } from "../services/api";

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  const loadTodos = async () => {
    try {
      const data = await todoApi.getAllTodos();
      setTodos(data);
    } catch (err) {
      console.error("Error loading stats: ", err);
    }
  };
  const loadStats = async () => {
    try {
      const statsData = await todoApi.getStats();
      setStats(statsData);
    } catch (err) {
      console.error("Error loading stats: ", err);
    }
  };
  const updateTodo = async (id, todoData) => {
    try {
      await todoApi.updateTodo(id, todoData);
      await loadTodos();
      await loadStats();
    } catch (err) {
      console.error("Error toggling todo:", err);
    }
  };
  const toggleTodo = async (id) => {
    try {
      await todoApi.toggleTodoCompleted(id);
      await loadTodos();
      await loadStats();
    } catch (err) {
      console.error("Error toggling todo:", err);
    }
  };
  useEffect(() => {
    loadTodos();
    loadStats();
  }, []);

  return {
    todos,
    stats,
    toggleTodo,
    updateTodo,
  };
};

export default useTodos;
