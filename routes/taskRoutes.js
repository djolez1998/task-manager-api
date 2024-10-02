// routes/taskRoutes.js
const express = require('express')
const router = express.Router()
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require('../controllers/taskController')
const { auth } = require('../middleware/authMiddleware')

// @route   POST /api/tasks
// @desc    Kreiranje zadatka
// @access  Private
router.post('/', auth, createTask)

// @route   GET /api/tasks
// @desc    Dohvatanje svih zadataka
// @access  Private
router.get('/', auth, getAllTasks)

// @route   GET /api/tasks/:id
// @desc    Dohvatanje zadatka po ID
// @access  Private
router.get('/:id', auth, getTaskById)

// @route   PUT /api/tasks/:id
// @desc    Ažuriranje zadatka
// @access  Private
router.put('/:id', auth, updateTask)

// @route   DELETE /api/tasks/:id
// @desc    Brisanje zadatka
// @access  Private
router.delete('/:id', auth, deleteTask)

module.exports = router
