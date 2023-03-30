const app = require('../app');
const request = require('supertest');

let categoryId;
let token;


beforeAll(async () => {
    const credentials = {
        email: "test@gmail.com",
        password: "test123"
    }
    const res = await request(app).post('/api/v1/users/login').send(credentials);
    token = res.body.token;
})

test("POST /categories should create one category", async () => {
    const newCategory = { name: "technology" }
    const res = await request(app)
        .post('/api/v1/categories')
        .send(newCategory)
        .set('Authorization', `Bearer ${token}`)
    categoryId = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newCategory.name);
})

test("GET /categories should return all categories", async() => {
    const res = await request(app).get('/api/v1/categories');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test("DELETE /categories/:id should delete one categories", async() => {
    const res = await request(app)
        .delete(`/api/v1/categories/${categoryId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
    
})