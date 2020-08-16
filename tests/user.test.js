const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: 'sunkanmi',
    email: 'sunkanmi@yahoo.com',
    password: '3456bc!!'
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})


test('Should create a new user', async () => {
    await request(app).post('/users').send({
        name: 'kosemani',
        email: 'kosemani@example.com',
        password: 'MyPass777!'
    }).expect(201)
})

test('Should create account for existing mail', async () => {
    await request(app).post('/users').send({
        name: 'kosemani',
        email: userOne.email,
        password: 'kash3468'
    }).expect(400)
})


test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'haveforgotten'
    }).expect(400)
})

