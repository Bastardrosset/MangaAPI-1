const jwt = require("jsonwebtoken");
require('dotenv').config({ path: '../config/.env'});
const User = require("../models/User.model");

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
    return res.status(403).json({ message: 'Token invalid' });
  }
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(
            token, 
            process.env.SECRET_KEY
        );
        const userId = decodedToken.userId;
        req.auth = {userId: userId};
	    next();
    } catch(error) {
       res.status(401).json({ error });
    }
};

