import type { SidebarProps } from '../types'

const SideBar = ({ selectedTitle, setSelectedTitle, todosByDate, completedTodosByDate, setCompletedOnly, completedOnly }: SidebarProps
) => {
  return (
    <>
      {todosByDate.size > 0 && Array.from(todosByDate.entries())
        .map(([title, todos]) => (
          <div
            className={title === selectedTitle && !completedOnly ? "sidebar selected" : "sidebar"}
            key={title}
            onClick={() => {
              setCompletedOnly(false);
              setSelectedTitle(title);
            }}
            style={{ padding: "12px 16px", cursor: "pointer" }}
          >
            {title} ({todos.length})
          </div>
        ))}
      {completedTodosByDate.size > 0 && Array.from(completedTodosByDate.entries())
        .map(([title, todos]) => (
          <div
            className={title === selectedTitle && completedOnly ? "sidebar selected" : "sidebar"}
            key={title}
            onClick={() => {
              setCompletedOnly(true);
              setSelectedTitle(title);
            }}
            style={{ padding: "12px 16px", cursor: "pointer" }}
          >
            {title} ({todos.length})
          </div>
        ))}
    </>
  )
}

export default SideBar