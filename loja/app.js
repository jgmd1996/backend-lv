const express = require('express');
const product = require('./src/routes/ProductRoutes');
const suppliers = require('./src/routes/SuppliersRoutes');
const client = require('./src/routes/ClientRoutes')
const order = require('./src/routes/OrderRoutes')
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

app.use(express.json());

const port = process.env.PORT || 3001;

app.route('/').get((req, res) =>{
  res.status(200).send({titulo: "Curso de node"})
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