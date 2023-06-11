import request from 'supertest'
import { app } from '../../app'

it('returns 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(201)
})
it('returns 400 with invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({ email: 'test@testcom', password: 'password' })
        .expect(400)
})

it('returns 400 with invalid password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(400)
})
