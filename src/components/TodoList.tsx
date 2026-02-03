import { useTodoApp } from '../contexts/TodoAppContext';
import { ThemeToggle } from './ThemeToggle';
import { TodoRow } from './TodoRow';

export function TodoList() {
  const {
    selectedTodos,
    selectedTitle,
    setSelectedTodo,
    setModalOpen,
  } = useTodoApp();

  const handleCreateNew = () => {
    setSelectedTodo(null);
    setModalOpen(true);
  };

  return (
    <div className="main">
      <header className="main__header">
        <h2 className="main__title">{selectedTitle}</h2>
        <div className="main__header-actions">
          <ThemeToggle />
          <button
            type="button"
            className="main__add-btn"
            onClick={handleCreateNew}
          >
            + Create New Todo
          </button>
        </div>
      </header>

      <ul className="main__list" aria-label="Todo list">
        {selectedTodos.map((todo) => (
          <li key={todo.id ?? todo.title}>
            <TodoRow todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  );
}
