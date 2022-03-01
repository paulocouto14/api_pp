const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const users = require('../database/usuario')


 
module.exports = function(passport){
    


    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    
 
    passport.deserializeUser((id, done) => {
        try {
            const user = users.findOne({where:{id:id}});
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });

    passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'senha'
    },
    (username, password, done) => {
        users.findOne({where:{mail:username}}).then((usuario) => {
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