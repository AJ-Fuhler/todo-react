import { useState, useMemo } from 'react';
import Modal from './components/Modal';
import SideBar from './components/Sidebar';
import Main from './components/MainContent';
import { sortUtils } from './utils/sortUtils';
import { groupTodos } from './utils/groupUtils';
import { filterCompletedTodos } from './utils/filterUtils';
import { useTodos } from './hooks/useTodos';
import type {Todo} from './types';

const App = () => {
  // data hooks
  const {todos, refreshTodos} = useTodos();

  // local UI state
  const [selectedTitle, setSelectedTitle] = useState<string>("All Todos");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [completedOnly, setCompletedOnly] = useState<boolean>(false)


  // derived data (memoized)
  const sortedTodos = useMemo(() => sortUtils.sortByDate(todos), [todos]);
  const todosByDate = useMemo(() => groupTodos(sortedTodos), [sortedTodos]);
  const completedTodosByDate = useMemo(() => filterCompletedTodos(todosByDate), [todosByDate]);
  const selectedTodos = useMemo(() => {
    if (completedOnly) {
      return sortUtils.sortByCompletion(completedTodosByDate.get(selectedTitle) ?? []);
    }
    return sortUtils.sortByCompletion(todosByDate.get(selectedTitle) ?? []);
  },
  [todosByDate, completedOnly, completedTodosByDate, selectedTitle]
  );


  return (
    <div>
      <SideBar
        selectedTitle={selectedTitle}
        setSelectedTitle={setSelectedTitle}
        todosByDate={todosByDate}
        completedTodosByDate={completedTodosByDate}
        completedOnly={completedOnly}
        setCompletedOnly={setCompletedOnly}
      />
      <Main
        todos={selectedTodos}
        selectedTitle={selectedTitle}
        setModalOpen={setModalOpen}
        refreshTodos={refreshTodos}
        setSelectedTodo={setSelectedTodo}
      />
      <Modal
        todo={selectedTodo}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        refreshTodos={refreshTodos}
        setSelectedTitle={setSelectedTitle}
      />
    </div>
  )
}

export default App