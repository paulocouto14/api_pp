const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const users = require('../database/usuario')


 
module.exports = function(passport){
    
    function findUserById(id){
        return users.findOne({where:{id:id}})
        
    }

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
 
    passport.deserializeUser((id, done) => {
        try {
            const user = findUserById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });

    passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
    },
    (username, password, done) => {
        users.findOne({where:{user:username}}).then((usuario) => {
            console.log('carregando ...')
            if(!usuario) {
                console.log('usuario errado')
                return done(null, false)
            }
            let compare = bcrypt.compareSync(password, usuario.pass)
            if(!compare) {
                console.log("senha errada")
                return done(null, false)
            }
            console.log('tudo ok!')
            return done(null, usuario)
        }).catch((erro) => console.log(erro))
    }
));
}