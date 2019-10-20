const request = require('supertest')
const server = require('../../../api/server')
const prepTestDB = require('../../../helpers/prepTestDB')
const authMiddleware = require('../../../auth/authMiddleware')
jest.mock('../../../auth/authMiddleware')

beforeEach(prepTestDB)
beforeEach(() => authMiddleware.mockClear())

describe('/houses endpoints', () => {
  it('GET /houses returns an array', async () => {
    const res = await request(server)
      .get('/houses')

    expect(authMiddleware).toBeCalled()
    expect(res.status).toBe(200)
    expect(res.body[2]).toEqual({
      id: 3,
      zipCode: 60007,
      yearBuilt: 1920,
      squareFootage: 5200,
      bedrooms: 3,
      bathrooms: 2,
      price: 672340
    })
  })

  it('POST /houses returns an object', async () => {
    const res = await request(server)
      .post('/houses')
      .send({
        zipCode: 99999,
        yearBuilt: 1946,
        squareFootage: 1000,
        bedrooms: 1,
        bathrooms: 3,
      })

    expect(authMiddleware).toBeCalled()
    expect(res.status).toBe(201)
    expect(res.body).toEqual({
      id: 7,
      zipCode: 99999,
      yearBuilt: 1946,
      squareFootage: 1000,
      bedrooms: 1,
      bathrooms: 3,
      // might need to fix price
      price: 345999
    })
  })

  it('PUT /houses/:id returns the updated object', async () => {
    const res = await request(server)
      .put('/houses/4')
      .send({
        zipCode: 10000,
        yearBuilt: 1953,
        squareFootage: 9000,
        bedrooms: 2,
        bathrooms: 1,
      })
    
    expect(authMiddleware).toBeCalled()
    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      id: 4,
      zipCode: 10000,
      yearBuilt: 1953,
      squareFootage: 9000,
      bedrooms: 2,
      bathrooms: 1,
      price: 345678
    })
  })

  it('DELETE /houses/:id returns the deleted object', async () => {
    const res = await request(server)
      .delete('/houses/1')
    
    expect(authMiddleware).toBeCalled()
    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      id: 1,
      zipCode: 90210,
      yearBuilt: 1960,
      squareFootage: 1000,
      bedrooms: 8,
      bathrooms: 5.5
    })
  })
})