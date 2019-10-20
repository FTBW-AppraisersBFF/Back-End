const request = require('supertest');
const server = require('../api/server')
const prepTestDB = require('../helpers/prepTestDB')

beforeEach(prepTestDB)

describe('authRouter.js', () => {

    describe('POST /auth/register', () => {
        it('creates a new user', async () => {
            const res = await request(server)
                .post('/auth/register')
                .send({ username: 'realtor', password: 'real_thor'})
            
            expect(res.status).toBe(201)
            expect(res.body.username).toBe('realtor')
            expect(res.body).toHaveProperty('password')
        })
    })

    describe('POST /login', () => {
        it('returns a token', async () => {            
            const res = await request(server)
                .post('/auth/login')
                .send({ username: 'admin', password: 'password1234' })

            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('token')
        })
    })
})