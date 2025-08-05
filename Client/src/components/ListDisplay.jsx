import { useState } from 'react';
import { FiEdit3, FiTrash2, FiSave, FiX, FiPlus, FiList } from 'react-icons/fi';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function ListDisplay({ lists, onUpdateList, onDeleteList, onAddItem, onUpdateItem, onDeleteItem }) {
  const [editingListId, setEditingListId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleEditStart = (list) => {
    setEditingListId(list._id);
    setEditName(list.name);
  };

  const handleEditSave = (listId) => {
    if (editName.trim()) {
      onUpdateList(listId, editName);
      setEditingListId(null);
      setEditName('');
    }
  };

  const handleEditCancel = () => {
    setEditingListId(null);
    setEditName('');
  };

  if (lists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full p-6 mb-6">
          <FiList className="w-12 h-12 text-blue-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No lists yet</h3>
        <p className="text-gray-500 text-center max-w-md">
          Create your first todo list to get organized and start tracking your tasks!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1">
      {lists.map(list => (
        <div 
          key={list._id} 
          className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden"
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-100">
            {editingListId === list._id ? (
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Enter list name"
                  className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
                  autoFocus
                />
                <button
                  onClick={() => handleEditSave(list._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  <FiSave className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleEditCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
                >
                  <FiX className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-gray-800 tracking-tight">{list.name}</h3>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm font-medium">
                    {list.items?.length || 0} tasks
                  </span>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => handleEditStart(list)}
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                  >
                    <FiEdit3 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteList(list._id)}
                    className="flex items-right gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Card Content */}
          <div className="p-6">
            {/* Add New Task Section */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
              <div className="flex items-center gap-2 mb-3">
                <FiPlus className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">Add New Task</span>
              </div>
              <TodoForm listId={list._id} onAddItem={onAddItem} />
            </div>

            {/* Tasks List */}
            <div className="space-y-3">
              {list.items && list.items.length > 0 ? (
                <TodoList
                  listId={list._id}
                  items={list.items}
                  onUpdateItem={onUpdateItem}
                  onDeleteItem={onDeleteItem}
                />
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiList className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">No tasks yet</p>
                  <p className="text-gray-400 text-sm">Add your first task above to get started</p>
                </div>
              )}
            </div>
          </div>

          {/* Card Footer */}
          {list.items && list.items.length > 0 && (
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  {list.items.filter(item => item.completed).length} of {list.items.length} completed
                </span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${list.items.length > 0 ? (list.items.filter(item => item.completed).length / list.items.length) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ListDisplay;