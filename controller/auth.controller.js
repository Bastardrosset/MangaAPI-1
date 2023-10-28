const crypto = require("crypto");
const passport = require("passport");
const LocalStragtegy = require("passport-local");
const User = require("../models/User.model");

passport.use(new LocalStragtegy(async function verify(pseudo, email, password, done){
    try{
        const user = await User.findOne({ where: {email: email} });
        if(!user){
            return done(null, false, { message: "Incorrect email or password" });   
        }
        crypto.pbkdf2(password, user.salt, 310000, 32, "sha256", async function(error, hashedPassword) {
            if(error){
                console.log("Error controller verify" + error);
                return done(error);
            }
            if(!crypto.timingSafeEqual(user.password, hashedPassword)){
                return done(null, false, { message: "Incorrect email or password !"});
            }
        })
    } catch(error){
        return done(error);
    }
}));

passport.serializeUser(function(user, done){
    done(null, user.id)
});
passport.deserializeUser(function(id, done){
    User.findByPk(id).then(function(user) { done(null, user) });
})

// Register function
module.exports.signup = async (req, res) => {
    try{
        const salt = crypto.randomBytes(10);
        //fonction pbkdf2 delivre une clé a partir du mot de passe et du salt, 310000 nombre d'itérations de hachage appliquer, sha256 spécifie la fonction de hachage à utiliser.
        const hashedPassword = await new Promise((resolve, reject) => {
            crypto.pbkdf2(req.body.password, salt, 310000, 32, "sha256", (error, hashedPassword) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(hashedPassword);
                }
            });
        });

        const newUser = await User.create({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hashedPassword,
            salt: salt
        });

        res.status(200).json({ message: "User registered successfully" });
    } catch(error){
        console.error("signup error"+ error)
        res.status(500).json(error);
    }
};

module.exports.signin = async(req, res) => {
    try{

        // res.status(200).json("Authentification réussi !");
    } catch(error){
        res.status(501).json(error);
    }
};

module.exports.logout = (req, res) => {
    
};