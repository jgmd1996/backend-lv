const express = require('express');//Gerenciar requisições de diferentes verbos HTTP em diferentes URLs. Integrar "view engines" para inserir dados nos templates
//buscando as rotas
const product = require('./src/routes/ProductRoutes');
const suppliers = require('./src/routes/SuppliersRoutes');
const client = require('./src/routes/ClientRoutes')
const order = require('./src/routes/OrderRoutes')
//
const cors = require('cors');//CORS (Cross-Origin Resource Sharing) é uma especificação do W3C que quando implementado pelo navegador permite que um site acesse recursos de outro site, mesmo estando em domínios diferentes.
const mongoose = require( "mongoose");//O Mongoose é uma biblioteca do Nodejs que proporciona uma solução baseada em esquemas para modelar os dados da sua aplicação.

mongoose.connect("mongodb+srv://joaoGabriel:gabriel123@cluster0.yn6srrv.mongodb.net/test");//conectar ao meu cluter no mongodb
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

const port = process.env.PORT || 3001;// aqui eu escolho qual  a porta eu uso para me conectar

app.route('/').get((req, res) =>{
  res.status(200).send({titulo: "Prova junior"})
})

app.use(// aqui eu uso para me conectar as rotas
    express.json(),
    product,
    suppliers,
    client,
    order
)

 app.listen(port, () => {//aqui é para listar onde esta rodando o servidor
   console.log(`Servidor escutando em http://localhost:${port}`)
})