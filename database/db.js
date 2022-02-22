const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB || 'chama', process.env.USERDB || 'root', process.env.PASSDB || 'root', {
    host: process.env.HOSTDB || 'localhost',
    dialect: process.env.DRIVERDB || 'mysql'
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