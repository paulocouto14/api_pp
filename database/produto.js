const db = require('./db')


const usuario = db.sequelize.define('postagens', {
    user:{
        type: db.Sequelize.STRING,
    },
    mail:{
        type: db.Sequelize.STRING,
    },
    pass:{
        type: db.Sequelize.STRING
    }
});

module.exports = usuario;


