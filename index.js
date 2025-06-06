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

app.get('/', (req, res)=> {
    res.render('index', {nome: 'Bernardo'});
});

app.listen(PORT, ()=> {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
})