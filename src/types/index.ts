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