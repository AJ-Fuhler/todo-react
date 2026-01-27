import type { Todo, TodosByDate } from '../types/index'

export const groupTodos = (todos: Todo[]) => {
  const groups: TodosByDate = new Map<string, Todo[]>();
  groups.set('All Todos', todos)

  todos.forEach(todo => {
    let key = "No Due Date";

    if (todo.month && todo.year) {
      key = `${todo.month}/${todo.year.slice(2)}`;
    }
    if (!groups.has(key)) groups.set(key, []);

    groups.get(key)!.push(todo);
  });


  return groups;
}