import { useRef, useEffect } from 'react';
import '../styles/modal.css';
import { useTodoApp } from '../contexts/TodoAppContext';
import { TodoForm } from './TodoForm';

export function Modal() {
  const {
    selectedTodo,
    isModalOpen,
    setModalOpen,
    refreshTodos,
    setSelectedTitle,
  } = useTodoApp();
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSaveSuccess = async (isCreate: boolean) => {
    await refreshTodos();
    setModalOpen(false);
    if (isCreate) {
      setSelectedTitle('All Todos');
    }
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, [isModalOpen, setModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal-content">
        <div className="modal-header">
          <h3>New Todo</h3>
          <button
            type="button"
            onClick={closeModal}
            className="close-button"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <TodoForm
          initialTodo={selectedTodo}
          onClose={closeModal}
          onSaveSuccess={handleSaveSuccess}
        />
      </div>
    </div>
  );
}
