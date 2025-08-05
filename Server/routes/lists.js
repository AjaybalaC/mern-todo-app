import express from 'express';
import TodoList from '../models/TodoList.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create a new to-do list
router.post('/', auth, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'List name is required' });
    }

    const list = new TodoList({
      userId: req.user,
      name,
      items: []
    });

    await list.save();
    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get 
router.get('/', auth, async (req, res) => {
  try {
    const lists = await TodoList.find({ userId: req.user }).sort({ createdAt: -1 });
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update 
router.put('/:id', auth, async (req, res) => {
  try {
    const { name } = req.body;
    const list = await TodoList.findOne({ _id: req.params.id, userId: req.user });

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    if (name) list.name = name;

    await list.save();
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete 
router.delete('/:id', auth, async (req, res) => {
  try {
    const list = await TodoList.findOneAndDelete({ _id: req.params.id, userId: req.user });

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    res.json({ message: 'List deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create in a specific list
router.post('/:id/items', auth, async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Item title is required' });
    }

    const list = await TodoList.findOne({ _id: req.params.id, userId: req.user });
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    list.items.push({ title });
    await list.save();
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a to-do item
router.put('/:listId/items/:itemId', auth, async (req, res) => {
  try {
    const { title, completed } = req.body;
    const list = await TodoList.findOne({ _id: req.params.listId, userId: req.user });

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    const item = list.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (title) item.title = title;
    if (typeof completed === 'boolean') item.completed = completed;

    await list.save();
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a to-do item
router.delete('/:listId/items/:itemId', auth, async (req, res) => {
  try {
    const list = await TodoList.findOne({ _id: req.params.listId, userId: req.user });

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    list.items.pull(req.params.itemId);
    await list.save();
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;