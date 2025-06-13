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
//Requisição da TABELA do BANCO DE DADOS
const Usuario = require('./models/Usuario');

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
    if(req.session.errors){
        let arrayErros = req.session.errors;
        req.session.errors = '';
        res.render('index', {navActiveCadastrar: true, msgError: arrayErros} );
    };
    if(req.session.sucess){
        req.session.sucess = false;
        res.render('index', {navActiveCadastrar: true, msgSucess: true} );
    };
    res.render('index', {navActiveCadastrar: true});
});
app.get('/users', (req, res)=> {
    //ENCONTRANDO todos os VALORES do BANCO DE DADOS
    Usuario.findAll().then((valores)=> {
        //Se EXISTIR algum valor no banco de dados...
        if(valores.length > 0) {
            return res.render('users', {navActiveUsers: true, table: true, usuarios: valores.map(valores => valores.toJSON())});
        }
        else {
            res.render('users', {navActiveUsers: true, table: false});
        };
    }).catch((err)=> {
        console.log(`Houve algum problema: ${err}`)
    });

});
app.get('/editar', (req, res)=> {
    res.render('editar');
});

app.post('/editar', (req, res)=> {
    let id = req.body.id;
    //CONSULTA da tabela correspondente ao ID
    Usuario.findByPk(id).then((dados)=> {
        return res.render('editar', {error: false, id: dados.id, nome: dados.nome, email: dados.email});

    }).catch((err)=> {
        console.log(err);
        return res.render('editar', {error: true, problema: 'Não é possivel EDITAR este registro!'});
    });
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
        erros.push({mensagem: 'Campo nome não pode ser vazio!'});
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

    //Salvar no BANCO DE DADOS
    Usuario.create({
        nome: nome,
        email: email.toLowerCase()
    }).then(()=> {
        //SUCESSO caso não aja ERROS
        console.log('Cadastrado com sucesso!');
        req.session.sucess = true;
        return res.redirect('/');
    }).catch((err)=> {
        //FRACASSO caso aja ERROS
        console.log('Ops...Houve algum erro: '+ err);
    });
    
});

app.listen(PORT, ()=> {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
})