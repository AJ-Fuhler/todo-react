import type { Todo, TodoUpdate } from '../types/index'

const API_BASE = 'http://localhost:3000/api'

export const todoService = {
  async getAll(): Promise<Todo[]> {
    const response = await fetch(`${API_BASE}/todos`);
    if (!response.ok) throw new Error('Failed to fetch todos')
    return response.json();
  },

  async create(todo: Todo): Promise<Todo> {
    const response = await fetch(`${API_BASE}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    });

    if (!response.ok) throw new Error(`Failed to create todo: ${response.status}`);

    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) throw new Error(`Failed to delete todo: ${response.status}`);
  },

  async toggleCompleted(id: number, completed: boolean): Promise<void> {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"completed": !completed})
    });
    if (!response.ok) throw new Error(`Failed to toggle todo completion: ${response.status}`)
  },

  async update(id: number, payload: TodoUpdate): Promise<void> {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`Failed to update todo: ${response.status}`);
  }
}