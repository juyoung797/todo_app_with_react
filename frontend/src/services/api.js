import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// axios.get(`${API_BASE_URL}/todos/stats`);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    console.log(
      "API 요청:",
      config.method?.toUpperCase(),
      config.url,
      config.data
    );
    return config;
  },
  (error) => {
    console.error("API 요청 에러:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("API 응답:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error(
      "API 응답 에러:",
      error.response?.status,
      error.response?.data
    );
    return Promise.reject(error);
  }
);

export const todoApi = {
  getAllTodos: async (params = {}) => {
    const response = await api.get("/todos", { params });
    return response.data;
  },

  getTodosPaged: async (
    page = 0,
    size = 10,
    sortBy = "createdAt",
    sortDir = "desc"
  ) => {
    const response = await api.get("/todos/page", {
      params: { page, size, sortBy, sortDir },
    });
    return response.data;
  },

  getTodobyId: async (id) => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  createTodo: async (todoData) => {
    const response = await api.post("/todos", todoData);
    return response.data;
  },

  updateTodo: async (id, todoData) => {
    const response = await api.put(`/todos/${id}`, todoData);
    return response.data;
  },

  toggleTodoCompleted: async (id) => {
    const response = await api.patch(`/todos/${id}/toggle`);
    return response.data;
  },

  deleteTodo: async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get(`/todos/stats`);
    return response.data;
  },

  searchTodos: async (searchTerm) => {
    const response = await api.get("/todos", {
      params: { search: searchTerm },
    });
  },

  getTodosByCompleted: async (completed) => {
    const response = await api.get("/todos", {
      params: { completed },
    });
    return response.data;
  },
};
