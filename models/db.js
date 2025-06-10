//Requisição do modulo Sequelize
const Sequelize = require('sequelize');

//Instencia para o Sequelize
const sequelize = new Sequelize('node_exemplo', 'root', '', {
    //Configurações de conecção
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    },
    logging: false
});

//Testando a conexão com o banco
/*sequelize.authenticate().then(()=> {
    console.log('Conexão no banco com Sucesso!');
}).catch((err)=> {
    console.log('Falha ao se conectar' +err);
});*/

module.exports = {Sequelize, sequelize};