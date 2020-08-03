const express = require('express')
const uuid = require('uuid');

const app = express()
const db = require('./dumbDb')

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/products', (req, res) => {
  res.send(db.get("products"));
});

app.get('/products/:id', (req, res) => {
  let order = db.get("products").find(order => order.id == req.params.id);
  if(order){
    res.send(order);
  }
  res.send({error: "Product with id: " + req.params.id + " not found"});
});

app.post('/products/new', (req, res) => {
  // Content-Type: application/json; charset=utf-8
  // console.log(req.body);
  let order = {
    "id": uuid.v4(),
    "name": req.body.name,
    "category": req.body.category,
    "type": req.body.type,
    "img": req.body.img,
    "price": req.body.price,
    "description": req.body.description
  }
  db.set('products', order);
  res.status(200).json(order);
});


app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});