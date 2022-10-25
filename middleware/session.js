const { handleHttpEror } = require('../utils/handleError');
const {verifyToken} = require('../utils/handleJwt');
const UserSchema = require('../models/nosql/user');

const authMiddleware = async (req, res, next) => {
    try {
        if(!req.headers.authorization){
            handleHttpEror(res, 'NOT_TOKEN', 401);
            return;
        }

        const token = req.headers.authorization.split(' ').pop(); 
        const dataToken = await verifyToken(token);

        if(!dataToken._id){
            handleHttpEror(res, 'NOT_PAYLOAD_DATA', 401);
            return;
        };

        const user = await UserSchema.findById(dataToken._id);
        req.user = user; 

        next();    
    } catch (err) {
        console.log(err);
        handleHttpEror(res, 'NOT_SESSION', 401);
    }
};

module.exports = {authMiddleware};