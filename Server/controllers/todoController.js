import TodoList from '../models/TodoList.js';

class TodoController {
  // Create a new to-do list
  static async createList(req, res) {
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
  }

  // Get all to-do lists for a user
  static async getLists(req, res) {
    try {
      const lists = await TodoList.find({ userId: req.user }).sort({ createdAt: -1 });
      res.json(lists);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  // Update a to-do list
  static async updateList(req, res) {
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
  }

  // Delete a to-do list
  static async deleteList(req, res) {
    try {
      const list = await TodoList.findOneAndDelete({ _id: req.params.id, userId: req.user });

      if (!list) {
        return res.status(404).json({ message: 'List not found' });
      }

      res.json({ message: 'List deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  // Create a to-do item in a specific list
  static async createItem(req, res) {
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
  }

  // Update a to-do item
  static async updateItem(req, res) {
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
  }

  // Delete a to-do item
  static async deleteItem(req, res) {
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
  }
}

export default TodoController;