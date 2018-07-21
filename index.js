const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const path = require('path');
const idade = require('./public/js/controlFunctions');

const app = express();

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

const userMiddleware = (req, res, next) => {
  if (req.query.nome === '' || req.query.dataNascimento === '') res.redirect('/');
  else next();
};

app.get('/', (req, res) => {
  res.render('main');
});

app.post('/check', (req, res) => {
  if (idade.validacoes.validaIdade(req.body.dataNascimento)) res.redirect(`/major?nome=${req.body.nome}`);
  else res.redirect(`/minor?nome=${req.body.nome}`);
});

app.get('/minor', userMiddleware, (req, res) => {
  const { nome } = req.query;
  res.render('minor', { nome });
});

app.get('/major', userMiddleware, (req, res) => {
  const { nome } = req.query;
  res.render('major', { nome });
});

app.listen(3000);
