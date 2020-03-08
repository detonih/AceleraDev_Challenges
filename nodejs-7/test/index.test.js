const request = require('supertest')
const server = require('../src/server')
const { sequelize, animals } = require('../src/model');

const constantDate = new Date('2020-02-15T18:01:01.000Z')

global.Date = class extends Date {
  constructor() {
    return constantDate;
  }
}

beforeAll(async () => {
  await animals.destroy({
    where: {},
    truncate:true
  })
});

beforeEach(async () => {
  await animals.create({
    "pet_name": "Handu",
    "description": "Cigano matador",
    "animal_type": 1,
    "pet_age": 13,
    "pet_size": 2,
    "sex": 1,
    "color": "Branco e preto",
    "image_url": "não tem"
  })
})

afterEach( async () => {
  await animals.destroy({
    where: {},
    truncate:true
  })
});

afterAll(() => sequelize.close());

describe('Adoptable Pets API Endpoints...', () => {
  test('GET /v1/animals', async () => {
    const res = await request(server.app)
      .get('/v1/animals')

    expect(res.statusCode).toEqual(200)
  })

  test('GET /v1/animals/:animalId', async () => {
    const res = await request(server.app)
      .get('/v1/animals/1')

    expect(res.statusCode).toEqual(200)
  })

  test('POST /v1/animals/:animalId', async () => {
    const res = await request(server.app)
      .post('/v1/animals')

    expect(res.statusCode).toEqual(200)
  })

  test('PATCH /v1/animals/:animalId', async () => {
    const res = await request(server.app)
      .patch('/v1/animals/1')

    expect(res.statusCode).toEqual(200)
  })

  test('DELETE /v1/animals/:animalId', async () => {
    const res = await request(server.app)
      .patch('/v1/animals/1')

    expect(res.statusCode).toEqual(200)
  })
})
