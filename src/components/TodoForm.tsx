import { todoService } from '../services/todos';
import { DateSelect } from './DateSelect';
import { useTodoForm } from '../hooks/useTodoForm';
import type { Todo } from '../types';

export interface TodoFormProps {
  initialTodo: Todo | null;
  onClose: () => void;
  onSaveSuccess: (isCreate: boolean) => Promise<void>;
}

export function TodoForm({
  initialTodo,
  onClose,
  onSaveSuccess,
}: TodoFormProps) {
  const form = useTodoForm(initialTodo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!initialTodo) {
      createNewTodo();
    } else {
      updateTodo();
    }
  };

  const updateTodo = async () => {
    if (!initialTodo?.id) return;
    if (!form.title.trim()) {
      alert('Todo needs a title!');
      return;
    }
    try {
      const payload: Todo = {
        title: form.title,
        day: form.day,
        month: form.month,
        year: form.year,
        description: form.description || ' ',
        completed: form.completed,
      };
      await todoService.update(initialTodo.id, payload);
      form.reset();
      await onSaveSuccess(false);
    } catch (err) {
      console.error('Error occurred: ', err);
    }
  };

  const handleComplete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (initialTodo?.id) {
      await todoService.update(initialTodo.id, { completed: true });
      form.reset();
      await onSaveSuccess(false);
    } else {
      alert(
        "This cannot be done.\nIf you want to add this todo, click 'Save' instead."
      );
    }
  };

  const createNewTodo = async () => {
    if (!form.title.trim()) {
      alert('Todo needs a title!');
      return;
    }
    try {
      const payload: Todo = {
        title: form.title,
        day: form.day,
        month: form.month,
        year: form.year,
        description: form.description,
        completed: form.completed,
      };
      await todoService.create(payload);
      form.reset();
      await onSaveSuccess(true);
    } catch (err) {
      console.error('Error Occurred: ', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <fieldset>
        <ul>
          <li>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Item 1"
              value={form.title}
              onChange={(e) => form.setTitle(e.target.value)}
            />
          </li>

          <li>
            <label>Due Date</label>
            <DateSelect
              day={form.day}
              month={form.month}
              year={form.year}
              onDayChange={form.setDay}
              onMonthChange={form.setMonth}
              onYearChange={form.setYear}
            />
          </li>

          <li>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => form.setDescription(e.target.value)}
              rows={7}
              placeholder="Description"
            />
          </li>

          <li className="modal-actions">
            <button type="submit" className="save-button">
              Save
            </button>
            <button
              type="button"
              onClick={handleComplete}
              className="complete-button"
            >
              Mark As Complete
            </button>
          </li>
        </ul>
      </fieldset>
    </form>
  );
}
