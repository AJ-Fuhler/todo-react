import type { Todo } from '../types/index'

const sortByDate = (todos: Todo[]) => {
  return [...todos]
    .map(todo => {
      if (todo.month === "mn") {
        todo.month = "";
      }
      if (todo.year === "dflt") {
        todo.year = "";
      }

      return todo;
    })
    .sort((a, b) => {
      if ((!a.month || !a.year) && (!b.month || !b.year)) return 0;
      if ((!a.month || !a.year) && (b.month && b.year)) return -1;
      if ((a.month && a.year) && (!b.month || !b.year)) return 1;

      const yearA  = Number(a.year);
      const yearB  = Number(b.year);
      const monthA = Number(a.month);
      const monthB = Number(b.month);

      if (yearA > yearB) return 1;
      if (yearB > yearA) return -1;
      if (yearA === yearB) {
        if (monthA > monthB) return 1;
        if (monthB > monthA) return -1;
      }

      return 0;
    });
}

const sortByCompletion = (todos: Todo[]) => {
  return todos.filter(todo => !todo.completed).concat(todos.filter(todo => todo.completed));
}

export const sortUtils = {
  sortByDate,
  sortByCompletion
}