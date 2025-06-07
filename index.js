//Requisição express
const express = require('express');
//Constante que recebe a função express
const app = express();
//Requisição handlebars
const hbs = require('express-handlebars');
//Porta
const PORT = process.env.PORT || 3000;

//Configuração do HANDLEBARS
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaltLayout: 'main',
}));
app.set('view engine', 'hbs');

//Middleware para usar arquivos estaticos(css,js)
app.use(express.static('public'));

//Rotas
app.get('/', (req, res)=> {
    res.render('index', {navActiveCadastrar: true});
});
app.get('/users', (req, res)=> {
    res.render('users', {navActiveUsers: true});
});
app.get('/editar', (req, res)=> {
    res.render('editar');
});

app.listen(PORT, ()=> {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
})