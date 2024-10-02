// tests/auth.test.js
const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const User = require('../models/User')

describe('Auth API', () => {
  // Pre svih testova, poveži se na test bazu
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  })

  // Nakon svih testova, očisti bazu i zatvori konekciju
  afterAll(async () => {
    await User.deleteMany({})
    await mongoose.connection.close()
  })

  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      password: 'password123',
      role: 'user'
    })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('token')
  })

  it('should not register a user with existing username', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      password: 'password123',
      role: 'user'
    })
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('msg', 'Korisnik već postoji')
  })

  it('should login an existing user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'testuser',
      password: 'password123'
    })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('token')
  })

  it('should not login with incorrect password', async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'testuser',
      password: 'wrongpassword'
    })
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('msg', 'Neispravni kredencijali')
  })
})
