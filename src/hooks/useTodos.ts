import {useState, useEffect} from 'react';
import { todoService } from '../services/todos';
import type { Todo } from '../types/index';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const refreshTodos = async () => {
    try {
      const data = await todoService.getAll();
      const notCompleted = data.filter(todo => !todo.completed);
      const completed = data.filter(todo => todo.completed);
      setTodos([...notCompleted, ...completed]);
    } catch (err) {
      console.log('fetch failed: ', err);
    }
  }

  useEffect(() => {
    refreshTodos();
  }, []);

  return {todos, refreshTodos};
}