// routes/projectRoutes.js
const express = require('express')
const router = express.Router()
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
} = require('../controllers/projectController')
const { auth } = require('../middleware/authMiddleware')

// @route   POST /api/projects
// @desc    Kreiranje projekta
// @access  Private
router.post('/', auth, createProject)

// @route   GET /api/projects
// @desc    Dohvatanje svih projekata
// @access  Private
router.get('/', auth, getAllProjects)

// @route   GET /api/projects/:id
// @desc    Dohvatanje projekta po ID
// @access  Private
router.get('/:id', auth, getProjectById)

// @route   PUT /api/projects/:id
// @desc    Ažuriranje projekta
// @access  Private
router.put('/:id', auth, updateProject)

// @route   DELETE /api/projects/:id
// @desc    Brisanje projekta
// @access  Private
router.delete('/:id', auth, deleteProject)

module.exports = router
