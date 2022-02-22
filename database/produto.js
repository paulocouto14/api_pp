const db = require('./db')


const produto = db.sequelize.define('produto', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome:{
        type: db.Sequelize.STRING,
        allowNull: false
    },
    preco:{
        type: db.Sequelize.FLOAT,
        allowNull: false
    },
    descricao:{
        type: db.Sequelize.STRING,
        allowNull: false
    }
});

module.exports = produto;


// produto.sync({ force: true })
