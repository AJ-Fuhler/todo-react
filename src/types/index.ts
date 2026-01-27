export interface Todo {
  id?: number,
  title: string,
  day: string,
  month: string,
  year: string,
  completed: boolean,
  description: string
}

export interface TodoUpdate {
  title?: string,
  day?: string,
  month?: string,
  year?: string,
  completed?: boolean,
  description?: string
}

export type TodosByDate = Map<string, Todo[]>

export interface ModalProps {
  isModalOpen: boolean,
  setModalOpen: (open: boolean) => void
  todo: Todo | null
  refreshTodos: () => Promise<void>,
  setSelectedTitle: (title: string) => void
}

export interface MainContentProps {
  selectedTitle: string,
  setModalOpen: (open: boolean) => void,
  todos: Todo[],
  refreshTodos: () => Promise<void>
  setSelectedTodo: (todo: Todo | null) => void
}

export interface SidebarProps {
  selectedTitle: string,
  todosByDate: TodosByDate,
  setSelectedTitle: (title: string) => void,
  completedTodosByDate: TodosByDate,
  completedOnly: boolean,
  setCompletedOnly: (only: boolean) => void
}