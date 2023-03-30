const request = require('supertest');
const app = require('../app');
const Cart = require('../models/Cart')
require('../models')


let token;
let purcharseId;



beforeAll(async () => {
    const credentials = {
        email: "test@gmail.com",
        password: "test123"
    }
    const res = await request(app).post('/api/v1/users/login').send(credentials);
    token = res.body.token;
})

//POST
test("Post / purchase should create one purchase", async () => {

  const cart = await Cart.create({
    quantity: 1,
  })

  const purchase = {
    quantity: cart.quantity,
  }

  const res = await request(app)
    .post("/api/v1/purchases")
    .send(purchase)
    .set('Authorization', `Bearer ${token}`)
  purcharseId = res.body.id
  await cart.destroy()
  expect(res.status).toBe(200)
})

//GET
test("GET / purchase should return all purchase", async () => {
  const res = await request(app)
    .get('/api/v1/purchases')
    .set('Authorization', `Bearer ${token}`)
    console.log(res.body);
  expect(res.status).toBe(200)
})