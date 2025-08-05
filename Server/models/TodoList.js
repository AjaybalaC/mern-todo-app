import mongoose from 'mongoose';

const todoItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const todoListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  items: [todoItemSchema]
}, { timestamps: true });

const TodoList = mongoose.model('TodoList', todoListSchema);

export default TodoList;