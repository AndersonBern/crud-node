//Requisição express
const express = require('express');
//Constante que recebe a função express
const app = express();
//Requisição handlebars
const hbs = require('express-handlebars');
//Requisição LER valores do frontend
const bodyParser = require('body-parser');
//Requisição SESSÕES
const session = require('express-session');
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
//Middleware para configurar o LEITOR de valores
app.use(bodyParser.urlencoded({extended:false}));
//Middleware para configurar as SESSÕES
app.use(session({
    secret: 'CriaUmaChaveQualquer',
    resave: false,
    saveUninitialized: true
}));

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
app.get('/editar', (req, res)=> {
    res.render('editar');
});

app.post('/cad', (req, res)=> {
    //Valores vindos do form
    var nome = req.body.nome;
    var email = req.body.email;

    //Array que vai conter os erros
    const erros = [];

    //Remover os espaços em branco
    nome = nome.trim();
    email = email.trim(); 

    //Limpar o nome de caracteres especiais(apenas letras)
    nome = nome.replace(/[^A-zÀ-ú/s]/gi,'');
    console.log(nome)

    //Se está VAZIO ou INDEFINIDO ou NULO
    if(nome == '' || typeof nome == undefined || nome == null) {
        erros.push({mensagem: 'Campo nome não pode ser vazio!'})
    }
    if(email == '' || typeof email == undefined || email == null) {
        erros.push({mensagem: 'Campo email não pode ser vazio!'})
    }

    //Verificar se o campo NOME é valido
    if(!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/.test(nome)) {
        erros.push({mensagem: 'Nome inválido!'});
    };

    //Verificar se o campo EMAIL é valido
    if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        erros.push({mensagem: 'Email inválido!'});
    };

    //GUARDAR erros na SESSÃO
    if(erros.length > 0) {
        console.log(erros);
        req.session.errors = erros;
        req.session.sucess = false;
        return res.redirect('/');
    };

    //SUCESSO caso não aja ERROS
    console.log('Validação realizada com sucesso!');
    req.session.sucess = true;
    return res.redirect('/');

    //Salvar no BANCO DE DADOS

});

app.listen(PORT, ()=> {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
})