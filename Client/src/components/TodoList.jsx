function TodoList({ listId, items, onUpdateItem, onDeleteItem }) {
  const handleToggleComplete = (item) => {
    onUpdateItem(listId, item._id, { completed: !item.completed });
  };

  const handleUpdateTitle = (item, newTitle) => {
    if (newTitle.trim()) {
      onUpdateItem(listId, item._id, { title: newTitle });
    }
  };

  return (
    <ul className="space-y-3">
      {items.length === 0 && (
        <p className="text-gray-500 text-center italic text-lg">No items in this list yet.</p>
      )}
      {items.map(item => (
        <li
          key={item._id}
          className="todo-item"
        >
          <div className="flex items-center space-x-4 flex-1">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggleComplete(item)}
              className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
            />
            <input
              type="text"
              defaultValue={item.title}
              onBlur={(e) => handleUpdateTitle(item, e.target.value)}
              className={`input-field flex-1 ${item.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
            />
          </div>
          <button
            onClick={() => onDeleteItem(listId, item._id)}
          className="flex items-right gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;

 