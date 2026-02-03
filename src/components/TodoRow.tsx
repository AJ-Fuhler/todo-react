import type { Todo } from '../types';
import { todoService } from '../services/todos';
import { useTodoApp } from '../contexts/TodoAppContext';
import trashIcon from '../images/trash.png';

export interface TodoRowProps {
  todo: Todo;
}

export function TodoRow({ todo }: TodoRowProps) {
  const { refreshTodos, setSelectedTodo, setModalOpen } = useTodoApp();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this todo?')) return;
    try {
      if (todo.id != null) {
        await todoService.delete(todo.id);
        await refreshTodos();
      }
    } catch (err) {
      console.error('An error occurred during deletion: ', err);
    }
  };

  const handleCompletedToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (todo.id != null) {
        await todoService.toggleCompleted(todo.id, todo.completed);
        await refreshTodos();
      }
    } catch (err) {
      console.error('An error occurred during completion toggle: ', err);
    }
  };

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTodo(todo);
    setModalOpen(true);
  };

  const dueDateLabel =
    !todo.month || !todo.year
      ? 'No Due Date'
      : `${todo.month}/${todo.year.slice(2)}`;

  return (
    <div
      className="todo-row"
      onClick={(e) => handleCompletedToggle(e)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCompletedToggle(e as unknown as React.MouseEvent);
        }
      }}
    >
      <div className="todo-row__content">
        <input
          type="checkbox"
          className="todo-row__checkbox"
          checked={todo.completed}
          readOnly
          onClick={(e) => handleCompletedToggle(e)}
          aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
        />
        <span
          onClick={(e) => handleOpenModal(e)}
          className={`todo-row__title ${todo.completed ? 'todo-row__title--completed' : ''}`}
        >
          {todo.title} — {dueDateLabel}
        </span>
      </div>
      <button
        type="button"
        className="todo-row__delete"
        onClick={handleDelete}
        aria-label={`Delete ${todo.title}`}
      >
        <img className="todo-row__trash-icon" src={trashIcon} alt="" />
      </button>
    </div>
  );
}
