import express from 'express';
import TodoList from '../models/TodoList.js';
import auth from '../middleware/auth.js';
import TodoController from '../controllers/todoController.js';

const router = express.Router();

// To-do list routes
router.post('/', auth, TodoController.createList);
router.get('/', auth, TodoController.getLists);
router.put('/:id', auth, TodoController.updateList);
router.delete('/:id', auth, TodoController.deleteList);

// To-do item routes
router.post('/:id/items', auth, TodoController.createItem);
router.put('/:listId/items/:itemId', auth, TodoController.updateItem);
router.delete('/:listId/items/:itemId', auth, TodoController.deleteItem);

export default router;