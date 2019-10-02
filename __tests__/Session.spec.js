const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/User')
const mongoose = require('mongoose')

describe('Session Controller', () => {
  afterEach(async () => {
    await User.deleteMany({})
  })
  afterAll(async () => {
    await mongoose.connection.close()
  })

  it('should add a user to the database', async () => {
    const userEmail = 'test@test.com'

    const response = await request(app)
      .post('/sessions')
      .send({
        email: userEmail,
      })

    const user = await User.findOne({}, {}, { sort: { created_at: -1 } })

    expect(user.email).toBe(userEmail)
    expect(response.status).toBe(201)
  })

  it(`shouldn't add a duplicated user to the database`, async () => {
    const response0 = await request(app)
      .post('/sessions')
      .send({
        email: 'test@test.com',
      })

    expect(response0.status).toBe(201)

    const response1 = await request(app)
      .post('/sessions')
      .send({
        email: 'test@test.com',
      })

    expect(response1.status).toBe(400)
  })
})
