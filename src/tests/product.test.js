const request = require('supertest');
const app = require('../app');
const ProductImg = require('../models/ProductImg');
require('../models');

let productId;
let token;

beforeAll(async () => {
    const credentials = {
        email: "test@gmail.com",
        password: "test123"
    }
    const res = await request(app).post('/api/v1/users/login').send(credentials);
    token = res.body.token;
})

test("POST /product should create one product", async () => {
    const product = {
        title: "Computer",
        description: "Apple MacBook Air",
        price: "700"
    }
    const res = await request(app)
        .post('/api/v1/products')
        .send(product)
        .set('Authorization', `Bearer ${ token }`)
    productId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(product.title);
})

test("POST /product/:id/images should set the product images", async() => {
    const image = await ProductImg.create({url: "pruebaaaa", publicId: "segundaprueba"});
    const res = await request(app)
        .post(`/api/v1/products/${productId}/images`)
        .send([image.id])
        .set('Authorization', `Bearer ${token}`);
    await image.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);

})  

test("GET /product should return all product", async() => {
    const res = await request(app).get('/api/v1/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

//GET ONE
test("GET /api/v1/products/:id return 200 code", async () => {
    const res = await request(app)
      .get(`/api/v1/products/${productId}`)
    expect(res.status).toBe(200)
    expect(res.body.title).toBe("Computer")
  })

test("PUT /product/:id should update one product", async() => {
    const body = {
        title: "computer update"
    }
    const res = await request(app)
        .put(`/api/v1/products/${productId}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
})

test("DELETE /product/:id should delete one product", async() => {
    const res = await request(app)
        .delete(`/api/v1/products/${productId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
    
})
