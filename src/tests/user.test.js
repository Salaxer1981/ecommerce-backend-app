const request = require('supertest');
const app = require('../app')
require('../models');

let userId;
let token;

test("POST /users should create a user", async () => {
    const newUser = {
        firstName: "Jose",
        lastName: "Geronimo",
        email: "jose@gmail.com",
        password: "jose123",
        phone: "123456789"
    }
    const res = await request(app).post('/api/v1/users').send(newUser);
    userId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.email).toBe(newUser.email);
})

test("POST /users/login should do login", async() => {
    const user = {
        email: "jose@gmail.com",
        password: "jose123"
    }
    const res = await request(app)
        .post('/api/v1/users/login')
        .send(user);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(user.email);
    expect(res.body.token).toBeDefined();
})

test("POST /users/login with invalid credentials should return 401", async() => {
    const user = {
        email: "jose@gmail.com",
        password: "wrongpassword"
    }
    const res = await request(app)
        .post('/api/v1/users/login')
        .send(user)
    expect(res.status).toBe(401)
})

test("GET /users should return all users", async() => {
    const res = await request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2); 
})

//GET ONE
test("GET /api/v1/users/:id return 200 code", async () => {
    const res = await request(app)
      .get(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe("Jose")
  })

test("PUT /users/:id should update one user", async() => {
    const body = {
        firstName: "Jose update"
    }
    const res = await request(app)
        .put(`/api/v1/users/${userId}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
})

test("DELETE /users/:id should delete one user", async() => {
    const res = await request(app)
        .delete(`/api/v1/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
    
})

