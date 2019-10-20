const request = require('supertest')
const server = require('../../../api/server')
const prepTestDB = require('../../../helpers/prepTestDB')
const authMiddleware = require('../../../auth/authMiddleware')
jest.mock('../../../auth/authMiddleware')

beforeEach(prepTestDB)
beforeEach(() => authMiddleware.mockClear())

describe('/fav endpoints', () => {
  it('POST /fav returns an array', async () => {
    const res = await request(server)
      .post('/fav/user')
      .send({ username: 'admin' })

    expect(authMiddleware).toBeCalled()
    expect(res.status).toBe(200)
    expect(res.body[1]).toEqual({
      id: 4,
      name: "Public transportation accessible",
      interestLevel: 91,
      houseID: 4,
      zipCode: 29083,
      yearBuilt: 1987,
      squareFootage: 2800,
      bedrooms: 2,
      bathrooms: 2,
      price: 345678
    })
  })

  it('POST /fav returns an object', async () => {
    const res = await request(server)
      .post('/fav')
      .send({
        userID: 2,
        houseID: 6,
        name: "by the beach",
        interestLevel: 97
      })

    expect(authMiddleware).toBeCalled()
    expect(res.status).toBe(201)
    expect(res.body).toEqual({
      id: 7,
      userID: 2,
      houseID: 6,
      name: "by the beach",
      interestLevel: 97
    })
  })

  it('PUT /fav/:id returns the updated object', async () => {
    const res = await request(server)
      .put('/fav/5')
      .send({
        userID: 3,
        houseID: 5,
        name: "Great value!",
        interestLevel: 92
      })
    
    expect(authMiddleware).toBeCalled()
    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      id: 5,
      userID: 3,
      houseID: 5,
      name: "Great value!",
      interestLevel: 92
    })
  })

  it('DELETE /fav/:id returns the deleted object', async () => {
    const res = await request(server)
      .delete('/fav/4')
    
    expect(authMiddleware).toBeCalled()
    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      id: 4,
      userID: 1,
      houseID: 4,
      name: "Public transportation accessible",
      interestLevel: 91
    })
  })
})