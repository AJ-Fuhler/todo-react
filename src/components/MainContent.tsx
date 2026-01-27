import type { MainContentProps, Todo } from '../types';
import trashIcon from '../images/trash.png';
import { todoService } from '../services/todos';

const Main = ({ selectedTitle, todos, setModalOpen, refreshTodos, setSelectedTodo }: MainContentProps) => {

  const handleDelete = async (todoId: number) => {
    if (!confirm("Are you sure you want to delete this todo?")) return;

    try {
      await todoService.delete(todoId);
      await refreshTodos()

    } catch (err) {
      console.error(`An error occurred during deletion: `, err)
    }
  }

  const handleCompletedToggle = async (e: React.MouseEvent, TodoId: number, completedStatus: boolean) => {
    e.stopPropagation();
    try {
      await todoService.toggleCompleted(TodoId, completedStatus)
      await refreshTodos();
    } catch (err) {
      console.error(`An error occurred during completion toggle: `, err);
    }
  }

  const handleModalOpen = (e: React.MouseEvent, todo: Todo) => {
    e.stopPropagation();
    setSelectedTodo(todo);
    setModalOpen(true);
  }

  return (
    <div className="main">
      <h2>
        {selectedTitle}
      </h2>

      <div>
        <button onClick={() => {
          setSelectedTodo(null);
          setModalOpen(true)
        }}> + Create New Todo</button>
      </div>

      {todos.map(todo => (
        <div onClick={(e) => handleCompletedToggle(e, todo.id!, todo.completed)} className="todo-row" key={todo.id} style={{ padding: "12px 0", borderBottom: "1px solid #eee" }}>
          <div>
            <input onClick={(e) => handleCompletedToggle(e, todo.id!, todo.completed)} type="checkbox" checked={todo.completed} readOnly />
            <span onClick={(e) => handleModalOpen(e, todo)} className="todo-title" style={{ marginLeft: 12, textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.title} - {(!todo.month || !todo.year) ? "No Due Date" : `${todo.month}/${todo.year.slice(2)}`}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(todo.id!);
            }}
            style={{
              "background": "none",
              "border": "none",
              "cursor": "pointer",
            }}
          >
            <img
              className="trash-icon"
              src={trashIcon}
              alt="Delete"
            />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Main