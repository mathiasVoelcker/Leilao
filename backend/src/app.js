const express = require('express');
const bodyparser = require('body-parser');

var Produto = require('./models/Produto')
var Lancamento = require('./models/Lancamento')
var mockProdutos = require('./mocks/mockProdutos');
var mockLances = require('./mocks/mockLances');

const app = express();

let listProdutos = [];
listProdutos.push(mockProdutos.list);

let listLances = [];
listLances.push(mockLances.list);

app.use(bodyparser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

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

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/listProdutos', (req, res) => res.json(listProdutos));
app.post('/addProduto', (req, res) => {
	var body = req.body;
	var novoProduto = new Produto(body);
	listProdutos.push(novoProduto);
	res.json({status:'ok'});
});
app.get('/listLances', (req, res) => res.json(listLances));
app.post('/addLance', (req, res) => {
	var body = req.body;
	var novoLance = new Lancamento(body);
	listLances.push(novoLance);
	res.json({status:'ok'});
});

app.listen(3000, () => console.log('Leilões rodando na porta 3000!'));