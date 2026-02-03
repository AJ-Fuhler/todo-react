export interface SidebarItemProps {
  title: string;
  count: number;
  isSelected: boolean;
  onSelect: () => void;
}

export function SidebarItem({
  title,
  count,
  isSelected,
  onSelect,
}: SidebarItemProps) {
  return (
    <div
      className={`sidebar-item ${isSelected ? 'sidebar-item--selected' : ''}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <span className="sidebar-item__label">{title}</span>
      <span className="sidebar-item__count">{count}</span>
    </div>
  );
}
