import type { TodosByDate } from "../types";

export const filterCompletedTodos = (todosByDate: TodosByDate) => {
  const copy = new Map();
  copy.set("Completed", todosByDate.get("All Todos")!.filter(todo => todo.completed));
  todosByDate.forEach((todos, key) => {
    if ((!["All Todos", "Completed"].includes(key))) {
      const completed = todos.filter(todo => todo.completed);
      if (completed.length > 0) {
        copy.set(key, todos.filter(todo => todo.completed));
      }
    }
  });
  return copy;
}