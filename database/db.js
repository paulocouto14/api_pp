const Sequelize = require('sequelize');
const sequelize = new Sequelize('chama', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('DB ON!')
}).catch((erro) => {
    console.log('DB OFF' + erro)
})



module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}



// Postagem.sync({ force: true })