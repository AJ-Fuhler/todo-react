import { useTodoApp } from '../contexts/TodoAppContext';
import { SidebarItem } from './SidebarItem';

export function Sidebar() {
  const {
    selectedTitle,
    setSelectedTitle,
    todosByDate,
    completedTodosByDate,
    completedOnly,
    setCompletedOnly,
  } = useTodoApp();

  return (
    <div className="sidebar__list">
      {todosByDate.size > 0 &&
        Array.from(todosByDate.entries()).map(([title, todos]) => (
          <SidebarItem
            key={title}
            title={title}
            count={todos.length}
            isSelected={selectedTitle === title && !completedOnly}
            onSelect={() => {
              setCompletedOnly(false);
              setSelectedTitle(title);
            }}
          />
        ))}
      {completedTodosByDate.size > 0 &&
        Array.from(completedTodosByDate.entries()).map(([title, todos]) => (
          <SidebarItem
            key={`completed-${title}`}
            title={title}
            count={todos.length}
            isSelected={selectedTitle === title && completedOnly}
            onSelect={() => {
              setCompletedOnly(true);
              setSelectedTitle(title);
            }}
          />
        ))}
    </div>
  );
}
