//Requisição do MODULO e INSTANCIA Sequelize
const dataBase = require('./db');

//DEFININDO o modelo da tabela
const Usuario = dataBase.sequelize.define('usuario', {
    id: {
        type: dataBase.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: dataBase.Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: dataBase.Sequelize.STRING,
        allowNull: false
    }
});

//Sincronizando o modelo da tabela
Usuario.sync();

//Exportando o modelo da tabela
module.exports = Usuario;