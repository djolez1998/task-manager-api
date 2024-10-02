const Task = require('../models/Task')

exports.createTask = async (req, res) => {
  const { title, description, status, priority, dueDate, project, assignedTo } =
    req.body
  try {
    const task = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      project,
      assignedTo
    })

    await task.save()
    res.status(201).json(task)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server greška')
  }
}

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('project')
      .populate('assignedTo', 'username')
    res.json(tasks)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server greška')
  }
}

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('project')
      .populate('assignedTo', 'username')
    if (!task) return res.status(404).json({ msg: 'Zadatak nije pronađen' })
    res.json(task)
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Zadatak nije pronađen' })
    res.status(500).send('Server greška')
  }
}

exports.updateTask = async (req, res) => {
  const { title, description, status, priority, dueDate, project, assignedTo } =
    req.body
  const taskFields = {
    title,
    description,
    status,
    priority,
    dueDate,
    project,
    assignedTo
  }

  try {
    let task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({ msg: 'Zadatak nije pronađen' })

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    )
    res.json(task)
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Zadatak nije pronađen' })
    res.status(500).send('Server greška')
  }
}

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({ msg: 'Zadatak nije pronađen' })

    await task.remove()
    res.json({ msg: 'Zadatak obrisan' })
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Zadatak nije pronađen' })
    res.status(500).send('Server greška')
  }
}
