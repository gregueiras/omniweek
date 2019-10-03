const request = require('supertest')
const mongoose = require('mongoose')

const fs = require('fs')
const path = require('path')

const app = require('../src/app')
const User = require('../src/models/User')
const Spot = require('../src/models/Spot')
const { destination } = require('../src/config/upload')

describe('Spot Controller', () => {
  afterEach(async () => {
    await User.deleteMany({})
    await Spot.deleteMany({})
  })
  afterAll(async () => {
    await mongoose.connection.close()

    fs.readdir(destination, (err, files) => {
      if (err) throw err
      for (const file of files) {
        fs.unlink(path.join(destination, file), err => {
          if (err) throw err
        })
      }
    })
  })

  it(`shouldn't add a spot to the database if user_id is invalid`, async () => {
    const expectedSpot = {
      company: 'Farfetch',
      price: 40,
      thumbnail: null,
      techs: 'ReactJS,React Native,Kotlin',
    }

    const response = await request(app)
      .post('/spots')
      .attach('thumbnail', `${__dirname}/testFiles/polo_zero.jpg`)
      .set('user_id', '5d952f875232891492e3c298')
      .field('company', expectedSpot.company)
      .field('price', expectedSpot.price)
      .field('techs', expectedSpot.techs)

    expect(response.status).toBe(400)
  })
  it('should add a spot to the database', async () => {
    const expectedSpot = {
      company: 'Farfetch',
      price: 40,
      thumbnail: null,
      techs: 'ReactJS,React Native,Kotlin',
    }

    const user = await request(app)
      .post('/sessions')
      .send({
        email: 'user@test.com',
      })

    const response = await request(app)
      .post('/spots')
      .attach('thumbnail', `${__dirname}/testFiles/polo_zero.jpg`)
      .set('user_id', user.body._id)
      .field('company', expectedSpot.company)
      .field('price', expectedSpot.price)
      .field('techs', expectedSpot.techs)

    const spot = await Spot.findOne({}, {}, { sort: { created_at: -1 } })

    expect(spot.company).toBe(expectedSpot.company)
    expect(spot.price).toBe(expectedSpot.price)

    expect(spot.company).toBe(expectedSpot.company)
    expect(response.status).toBe(201)
  })

  it('should be able to find spot by company name', async () => {
    const expectedSpot = {
      company: 'Farfetch',
      price: 40,
      thumbnail: null,
      techs: 'ReactJS,React Native,Kotlin',
    }

    const user = await request(app)
      .post('/sessions')
      .send({
        email: 'user@test.com',
      })

    await request(app)
      .post('/spots')
      .attach('thumbnail', `${__dirname}/testFiles/polo_zero.jpg`)
      .set('user_id', user.body._id)
      .field('company', expectedSpot.company)
      .field('price', expectedSpot.price)
      .field('techs', expectedSpot.techs)

    const response = await request(app)
      .get('/spots')
      .send({ company: expectedSpot.company })

    expect(response.status).toBe(200)
    expect(response.body.company).toBe(expectedSpot.company)
  })
})
