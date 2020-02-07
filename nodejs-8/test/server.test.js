const request = require('supertest')
const server = require('../src/server')
const {
  cleanDB,
  openDB,
  populateDB
} = require('./utils')



const constantDate = new Date('2020-01-28T12:29:59.567Z')

global.Date = class extends Date {
  constructor() {
    return constantDate
  }
}

beforeAll(() => {
  populateDB({
    "ANI1580214599567RD121": {
      "created_at": "2020-01-28T12:29:59.567Z",
      "updated_at": "2020-01-28T12:29:59.567Z",
      "pet_name": "Belchior Fernandes Montalvão",
      "description": "Gatinho mais fofinho desse mundo",
      "animal_type": "Gato",
      "pet_age": "6 Meses",
      "sex": "Macho",
      "color": "Branco Malhado",
      "image_url": ""
    },
    "ANI1580216220549RD493": {
      "created_at": "2020-01-28T12:57:00.550Z",
      "updated_at": "2020-01-28T12:57:00.550Z",
      "pet_name": "Tereza Fernandes Montalvão",
      "description": "Gatinha mais perfeita desse mundão redondo",
      "animal_type": "Gato",
      "pet_age": "6 Meses",
      "sex": "Fêmea",
      "color": "Malhada",
      "image_url": ""
    }
  })
})

afterAll(() => cleanDB())

describe('The method openDB should...', () => {
  test('return the objects on DB', async () => {
    const openDataBase = openDB();

    expect(openDataBase).toEqual({
      "ANI1580214599567RD121": {
        "created_at": "2020-01-28T12:29:59.567Z",
        "updated_at": "2020-01-28T12:29:59.567Z",
        "pet_name": "Belchior Fernandes Montalvão",
        "description": "Gatinho mais fofinho desse mundo",
        "animal_type": "Gato",
        "pet_age": "6 Meses",
        "sex": "Macho",
        "color": "Branco Malhado",
        "image_url": ""
      },
      "ANI1580216220549RD493": {
        "created_at": "2020-01-28T12:57:00.550Z",
        "updated_at": "2020-01-28T12:57:00.550Z",
        "pet_name": "Tereza Fernandes Montalvão",
        "description": "Gatinha mais perfeita desse mundão redondo",
        "animal_type": "Gato",
        "pet_age": "6 Meses",
        "sex": "Fêmea",
        "color": "Malhada",
        "image_url": ""
      }
    })
  });
})

describe('The API on /api/animals Endpoint at GET method should...', () => {
  
  test(`return 200 as status code and have 'total' and 'data' as properties`, async () => {
    expect.assertions(2)

    const res = await request(server.app).get('/api/animals')

    expect(res.statusCode).toEqual(200)
    expect(Object.keys(res.body)).toMatchObject([
      'total',
      'data'
    ])
  })

  test('return the right number of items and an object with all items', async () => {
    expect.assertions(2)

    const res = await request(server.app).get('/api/animals')
    
    expect(res.body.total).toEqual(2)
    expect(typeof res.body.data).toBe('object')
  })

  test(`return the 'data' property with all items from DB`, async () => {
    expect.assertions(1)

    const res = await request(server.app).get('/api/animals')

    expect(res.body).toMatchObject({
      total: 2,
      data: {
        "ANI1580214599567RD121": {
          "created_at": "2020-01-28T12:29:59.567Z",
          "updated_at": "2020-01-28T12:29:59.567Z",
          "pet_name": "Belchior Fernandes Montalvão",
          "description": "Gatinho mais fofinho desse mundo",
          "animal_type": "Gato",
          "pet_age": "6 Meses",
          "sex": "Macho",
          "color": "Branco Malhado",
          "image_url": ""
        },
        "ANI1580216220549RD493": {
          "created_at": "2020-01-28T12:57:00.550Z",
          "updated_at": "2020-01-28T12:57:00.550Z",
          "pet_name": "Tereza Fernandes Montalvão",
          "description": "Gatinha mais perfeita desse mundão redondo",
          "animal_type": "Gato",
          "pet_age": "6 Meses",
          "sex": "Fêmea",
          "color": "Malhada",
          "image_url": ""
        }
      }
    })
  })
})

describe('The API on /api/animals/:id Endpoint at GET method should...', () => {
  
  
  test('return the animal by id and statusCode 200', async () => {
    expect.assertions(2)

    const res = await request(server.app).get('/api/animals/ANI1580214599567RD121')
    
    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
      "created_at": "2020-01-28T12:29:59.567Z",
      "updated_at": "2020-01-28T12:29:59.567Z",
      "pet_name": "Belchior Fernandes Montalvão",
      "description": "Gatinho mais fofinho desse mundo",
      "animal_type": "Gato",
      "pet_age": "6 Meses",
      "sex": "Macho",
      "color": "Branco Malhado",
      "image_url": ""
    });
  });

  test('return the animal by id and statusCode 200', async () => {
    expect.assertions(2)

    const res = await request(server.app).get('/api/animals/ANI1580216220549RD493')
    
    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
      "created_at": "2020-01-28T12:57:00.550Z",
      "updated_at": "2020-01-28T12:57:00.550Z",
      "pet_name": "Tereza Fernandes Montalvão",
      "description": "Gatinha mais perfeita desse mundão redondo",
      "animal_type": "Gato",
      "pet_age": "6 Meses",
      "sex": "Fêmea",
      "color": "Malhada",
      "image_url": ""
    });
  });

  test('return status 404 and json error', async () => {
    expect.assertions(2)

    const res = await request(server.app).get('/api/animals/ThisAnimalIdDoesNotExist');

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: `The record ThisAnimalIdDoesNotExist couldn't be found.` })

  });
})

describe('The API on /api/animals Endpoint at POST method should...', () => {

  test('return status 201 and the keys', async () => {
    expect.assertions(2)

    const res = await request(server.app).post('/api/animals').send({
      "pet_name": "Handu",
      "description": "Cigano matador",
      "animal_type": "Cachorro",
      "pet_age": "14",
      "sex": "Macho",
      "color": "Branco e preto",
      "image_url": "nao tem",
      "created_at": '2020-01-28T12:29:59.567Z',
      "updated_at": '2020-01-28T12:29:59.567Z',
    });

    expect(res.statusCode).toEqual(201);
    expect(Object.keys(res.body)).toMatchObject([
      "pet_name",
      "description",
      "animal_type",
      "pet_age",
      "sex",
      "color",
      "image_url",
      "created_at",
      "updated_at",
    ]);
  });

  test('return the values of the keys and status 201', async () => {
    expect.assertions(2)

    const res = await request(server.app).post('/api/animals').send({
      "pet_name": "null",
      "description": "null",
      "animal_type": "null",
      "pet_age": "null",
      "sex": "null",
      "color": "null",
      "image_url": "null",
      "created_at": '2020-01-28T12:29:59.567Z',
      "updated_at": '2020-01-28T12:29:59.567Z',
    })
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      "pet_name": "null",
      "description": "null",
      "animal_type": "null",
      "pet_age": "null",
      "sex": "null",
      "color": "null",
      "image_url": "null",
      "created_at": '2020-01-28T12:29:59.567Z',
      "updated_at": '2020-01-28T12:29:59.567Z',
    });

  });

  test('return "null" values of the keys when empty object is sent and return status 201', async () => {
    expect.assertions(2)

    const res = await request(server.app).post('/api/animals').send({})
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      "created_at": '2020-01-28T12:29:59.567Z',
      "updated_at": '2020-01-28T12:29:59.567Z',
      "pet_name": "null",
      "description": "null",
      "animal_type": "null",
      "pet_age": "null",
      "sex": "null",
      "color": "null",
      "image_url": "null"
    });

  })

})

describe('The API on /api/animals/:id Endpoint at PATCH method should...', () => {

  test('return the same values of the original animal and status 200 when empty object is sent', async () => {
    expect.assertions(2);

    const res = await request(server.app).patch('/api/animals/ANI1580214599567RD121').send({});

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      "created_at": "2020-01-28T12:29:59.567Z",
      "updated_at": "2020-01-28T12:29:59.567Z",
      "pet_name": "Belchior Fernandes Montalvão",
      "description": "Gatinho mais fofinho desse mundo",
      "animal_type": "Gato",
      "pet_age": "6 Meses",
      "sex": "Macho",
      "color": "Branco Malhado",
      "image_url": ""
    })
  });
  
    test('return the values of keys updated by animal id and status 200', async () => {
      expect.assertions(2);

      const res = await request(server.app).patch('/api/animals/ANI1580214599567RD121').send({
        "pet_name": "test",
        "description": "test",
        "animal_type": "test",
        "pet_age": "test",
        "sex": "test",
        "color": "test",
        "image_url": "test",
        "created_at": '2020-01-28T12:29:59.567Z',
        "updated_at": '2020-01-28T12:29:59.567Z',
      });
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        "pet_name": "test",
        "description": "test",
        "animal_type": "test",
        "pet_age": "test",
        "sex": "test",
        "color": "test",
        "image_url": "test",
        "created_at": '2020-01-28T12:29:59.567Z',
        "updated_at": '2020-01-28T12:29:59.567Z',
      })
    });

    test('return status 404 and json error', async () => {
      expect.assertions(2)
  
      const res = await request(server.app).patch('/api/animals/ThisAnimalIdDoesNotExist');
  
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ error: `The record ThisAnimalIdDoesNotExist couldn't be found.` })
  
    });
  
})

describe('The API on /api/animals/:id Endpoint at DELETE method should...', () => {
  
  test('return no content status 204 and an empty object', async () => {
    expect.assertions(2);

    const res = await request(server.app).delete('/api/animals/ANI1580214599567RD121');

    expect(res.statusCode).toBe(204);
    expect(res.body).toEqual({})

  });

  test('return status 404 and json error', async () => {
    expect.assertions(2)

    const res = await request(server.app).delete('/api/animals/ThisAnimalIdDoesNotExist');

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: `The record ThisAnimalIdDoesNotExist couldn't be found.` })

  });

})