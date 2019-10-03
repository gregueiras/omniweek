import request from 'supertest'
import app from '../src/app'

describe('Session Controller', () => {
  it('should add a user to the database', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'test@test.com',
      })

    expect(response.status).toBe(200)
  })
})
