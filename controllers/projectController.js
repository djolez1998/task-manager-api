const Project = require('../models/Project')

exports.createProject = async (req, res) => {
  const { name, description, team } = req.body
  try {
    const project = new Project({
      name,
      description,
      createdBy: req.user.id,
      team
    })

    await project.save()
    res.status(201).json(project)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server greška')
  }
}

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('createdBy', 'username')
      .populate('team', 'username')
    res.json(projects)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server greška')
  }
}

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('createdBy', 'username')
      .populate('team', 'username')
    if (!project) return res.status(404).json({ msg: 'Projekat nije pronađen' })
    res.json(project)
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Projekat nije pronađen' })
    res.status(500).send('Server greška')
  }
}

exports.updateProject = async (req, res) => {
  const { name, description, team } = req.body
  const projectFields = { name, description, team }

  try {
    let project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ msg: 'Projekat nije pronađen' })

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: projectFields },
      { new: true }
    )
    res.json(project)
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Projekat nije pronađen' })
    res.status(500).send('Server greška')
  }
}

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ msg: 'Projekat nije pronađen' })

    await project.remove()
    res.json({ msg: 'Projekat obrisan' })
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Projekat nije pronađen' })
    res.status(500).send('Server greška')
  }
}
