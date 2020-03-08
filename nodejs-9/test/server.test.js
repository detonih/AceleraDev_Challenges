/*
  Que tal implementar os seus próprios testes de integração?
  Não é obrigatório e não terá impacto na nota final do desafio,
  mas fazê-los pode te dar mais certeza na hora de submeter! 
*/

const request = require('supertest')
const { app } = require('../src/server.js')
const { populateTable, cleanTable, connection } = require('./utils')

// Deixamos esses útils aqui pra vcs usarem nos hooks da api do jest

const { NODE_ENV } = process.env

// Lembrando que vc pode usar esses hooks dentro do escopo das describes tbm!
/* Quel tal limpar o banco de teste? */
beforeAll(() => cleanTable(`students_${NODE_ENV}`) )

/* O que vc pode fazer ANTES de cada suite de testes ser executada? */
beforeEach(() => { 
  populateTable(`students_${NODE_ENV}`, {
    'name': 'Henrique',
    'surname': 'Detoni',
    'email': 'detonihenrique@gmail.com',
    'age': 30,
    'gender': 'Masculino',
    'class': 'Node.js',
    'is_employed': false,
    'city': 'Piracicaba'
  });
 })

/* O que vc pode fazer DEPOIS de cada suite de testes ser executada? */
afterEach(() => cleanTable(`students_${NODE_ENV}`))

/* O que vc pode fazer DEPOIS que todas as suites foram executadas? */ 
afterAll(() => connection.end())

describe('GET /v1/students should', () => {
  test('...', async () => {
    try {
      const res = await request(app).get('/v1/students')
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([{
      "id": 1,
      "is_employed": 0,
      'name': 'Henrique',
      'surname': 'Detoni',
      'email': 'detonihenrique@gmail.com',
      'age': 30,
      'gender': 'Masculino',
      'class': 'Node.js',
      'is_employed': 0,
      'city': 'Piracicaba'
    }])
    } catch (err) {
      console.log(err)
    }
    
  })
})

describe('GET /v1/students/:id should', () => {
  test('...', async () => {
    try {
      const res = await request(app).get('/v1/students/1')
      expect(res.body).toEqual([
        {"age": 30,
          "city": "Piracicaba",
          "class": "Node.js",
          "email": "detonihenrique@gmail.com",
          "gender": "Masculino", "id": 1,
          "is_employed": 0,
          "name": "Henrique",
          "surname": "Detoni"
        }])

    } catch (err) {
      console.log(err)
    }

  })
})

describe('POST /v1/students should', () => {
  test('...', async () => {
    try {
      const res = await request(app).post('/v1/students').send({
        "name": "john",
        "surname": "loko",
        "email": "loko@gmail",
        "age": 30,
        "gender": 1,
        "class": "???",
        "is_employed": 0,
        "city": "Piracicaba"
      })
      
      expect(res.statusCode).toBe(201)
      expect(res.body).toEqual({
        "success": "A new record has been created.",
      })
    } catch (err) {
      console.log(err)
    }
  })
})

describe('PATCH /v1/students/:id should', () => {
  test('...', async () => {
    const res = await request(app).patch('/v1/students/1').send({
      "class": "Node.js",
      "is_employed": 1
    })

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({})
  })
})

describe('DELETE /v1/students/:id should', () => {
  test('...', async () => {
    const res = await request(app).delete('/v1/students/1')
    
    expect(res.body).toBe({})
  })
})
