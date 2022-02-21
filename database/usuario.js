const db = require('./db')


const usuario = db.sequelize.define('usuarios_db', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user:{
        type: db.Sequelize.STRING,
        allowNull: false
    },
    mail:{
        type: db.Sequelize.STRING,
        allowNull: false
    },
    pass:{
        type: db.Sequelize.STRING,
        allowNull: false
    }
});

module.exports = usuario;


// usuario.sync({ force: true })
