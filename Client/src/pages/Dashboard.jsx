import { useState, useEffect } from 'react';
import api from '../api';
import ListForm from '../components/ListForm';
import ListDisplay from '../components/ListDisplay';

function Dashboard() {
  const [lists, setLists] = useState([]);
  const [error, setError] = useState('');

  const fetchLists = async () => {
    try {
      const response = await api.get('/lists');
      setLists(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch lists');
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const handleAddList = async (name) => {
    try {
      const response = await api.post('/lists', { name });
      setLists([response.data, ...lists]);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add list');
    }
  };

  const handleUpdateList = async (id, name) => {
    try {
      const response = await api.put(`/lists/${id}`, { name });
      setLists(lists.map(list => list._id === id ? response.data : list));
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update list');
    }
  };

  const handleDeleteList = async (id) => {
    try {
      await api.delete(`/lists/${id}`);
      setLists(lists.filter(list => list._id !== id));
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete list');
    }
  };

  const handleAddItem = async (listId, title) => {
    try {
      const response = await api.post(`/lists/${listId}/items`, { title });
      setLists(lists.map(list => list._id === listId ? response.data : list));
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add item');
    }
  };

  const handleUpdateItem = async (listId, itemId, updates) => {
    try {
      const response = await api.put(`/lists/${listId}/items/${itemId}`, updates);
      setLists(lists.map(list => list._id === listId ? response.data : list));
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update item');
    }
  };

  const handleDeleteItem = async (listId, itemId) => {
    try {
      const response = await api.delete(`/lists/${listId}/items/${itemId}`);
      setLists(lists.map(list => list._id === listId ? response.data : list));
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete item');
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">My To-Do Lists</h2>
      {error && <p className="text-red-500 mb-6 font-medium">{error}</p>}
      <ListForm onAddList={handleAddList} />
      <ListDisplay
        lists={lists}
        onUpdateList={handleUpdateList}
        onDeleteList={handleDeleteList}
        onAddItem={handleAddItem}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
}

export default Dashboard;