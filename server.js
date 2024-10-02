// server.js
const app = require('./app')

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Export server za potrebe testiranja
module.exports = server
