const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
require('../models');

let token;
let cartId;


beforeAll(async () => {
    const credentials = {
        email: "test@gmail.com",
        password: "test123"
    }
    const res = await request(app).post('/api/v1/users/login').send(credentials);
    token = res.body.token;
})

test("POST /cart should create one cart", async () => {
    const product = await Product.create({
        title: "lapto",
        description: " MacBook Air",
        price: "800"
    })
    const cart = {
        quantity: 3,
        productId: product.id

    }
    const res = await request(app)
        .post('/api/v1/cart')
        .send(cart)
        .set('Authorization', `Bearer ${token}`);
    cartId = res.body.id
    await product.destroy();
    expect(res.statusCode).toBe(201);
    expect(res.body.quantity).toBe(cart.quantity)
})

test("GET /cart should return all cart", async () => {
    const res = await request(app).get('/api/v1/cart').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

//PUT
test('Update/api/v1/cart/:id should return 200', async () => {
    const body = {
        quantity: 1
    }
    const res = await request(app)
        .put(`/api/v1/cart/${cartId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(body);
    expect(res.status).toBe(200)
    expect(res.body.quantity).toBe(body.quantity)
})


test('Delete /api/v1/cart:id should return 204', async () => {
    const res = await request(app)
    .delete(`/api/v1/cart/${cartId}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  })