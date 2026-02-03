import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from 'react';
import { useTodos } from '../hooks/useTodos';
import { sortUtils } from '../utils/sortUtils';
import { groupTodos } from '../utils/groupUtils';
import { filterCompletedTodos } from '../utils/filterUtils';
import type { Todo, TodosByDate } from '../types';

export interface TodoAppContextValue {
  // data
  todos: Todo[];
  refreshTodos: () => Promise<void>;
  selectedTodos: Todo[];
  todosByDate: TodosByDate;
  completedTodosByDate: TodosByDate;
  // selection
  selectedTitle: string;
  setSelectedTitle: (title: string) => void;
  completedOnly: boolean;
  setCompletedOnly: (value: boolean) => void;
  // modal
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo | null) => void;
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

const TodoAppContext = createContext<TodoAppContextValue | null>(null);

export function TodoAppProvider({ children }: { children: ReactNode }) {
  const { todos, refreshTodos } = useTodos();
  const [selectedTitle, setSelectedTitle] = useState<string>('All Todos');
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [completedOnly, setCompletedOnly] = useState<boolean>(false);

  const sortedTodos = useMemo(() => sortUtils.sortByDate(todos), [todos]);
  const todosByDate = useMemo(() => groupTodos(sortedTodos), [sortedTodos]);
  const completedTodosByDate = useMemo(
    () => filterCompletedTodos(todosByDate),
    [todosByDate]
  );
  const selectedTodos = useMemo(() => {
    if (completedOnly) {
      return sortUtils.sortByCompletion(
        completedTodosByDate.get(selectedTitle) ?? []
      );
    }
    return sortUtils.sortByCompletion(todosByDate.get(selectedTitle) ?? []);
  }, [todosByDate, completedOnly, completedTodosByDate, selectedTitle]);

  const value: TodoAppContextValue = useMemo(
    () => ({
      todos,
      refreshTodos,
      selectedTodos,
      todosByDate,
      completedTodosByDate,
      selectedTitle,
      setSelectedTitle,
      completedOnly,
      setCompletedOnly,
      selectedTodo,
      setSelectedTodo,
      isModalOpen,
      setModalOpen,
    }),
    [
      todos,
      refreshTodos,
      selectedTodos,
      todosByDate,
      completedTodosByDate,
      selectedTitle,
      completedOnly,
      selectedTodo,
      isModalOpen,
    ]
  );

  return (
    <TodoAppContext.Provider value={value}>{children}</TodoAppContext.Provider>
  );
}

export function useTodoApp(): TodoAppContextValue {
  const ctx = useContext(TodoAppContext);
  if (!ctx) {
    throw new Error('useTodoApp must be used within TodoAppProvider');
  }
  return ctx;
}
