const express = require('express');
//buscando as rotas
const product = require('./src/route/product.route');
const suppliers = require('./src/route/supplier.route');
const client = require('./src/route/client.route');
const order = require('./src/route/order.route');
//
const cors = require('cors');
const mongoose = require( "mongoose");

mongoose.connect("mongodb+srv://joaoGabriel:gabriel123@cluster0.yn6srrv.mongodb.net/test");
let db = mongoose.connection;

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
  console.log('conexão com o banco feita com sucesso')
})

const app = express();

app.use(
  cors({
    origin: "*",
  })
)
  
const errorResponse = (err, req, res, next) => {
  logger.error(err.message);
  res.status(500).send(err.message);
};

app.use(errorResponse);
const port = process.env.PORT || 3001;

app.route('/').get((req, res) =>{
  res.status(200).send({titulo: "Prova junior"})
})

app.use(
    express.json(),
    product,
    suppliers,
    client,
    order
)

 app.listen(port, () => {
   console.log(`Servidor escutando em http://localhost:${port}`)
})