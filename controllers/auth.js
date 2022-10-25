const { matchedData } = require('express-validator');
const UserSchema = require('../models/nosql/user');
const {encrypt, compare} = require('../utils/handlePassword');
const { tokenSign } = require('../utils/handleJwt');
const {handleHttpEror} = require('../utils/handleError');

const registerCtrl = async (req, res) =>{
    try {

        const password = await encrypt(req.body.password);
        const body = {...req.body, password};
        const dataUser = await UserSchema.create(body);
        dataUser.set('password', undefined, {strict: false});

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        };

        res.send({data});
    } catch (error) {
        console.log(error);
        handleHttpEror(res, 'ERROR_REGISTER_USER');
    }
};

const loginCtrl = async (req, res) => {
    try {
        const user = await UserSchema.findOne({email: req.body.email}); 
        
        if(!user){
            handleHttpEror(res, 'USER_NOT_EXIST', 404);
            return;
        };

        const hashPassword = user.password;
        const check = await compare(req.body.password, hashPassword);

        if(!check){
            handleHttpEror(res, 'PASSWORD_INVALID', 401);
            return;
        };

        user.set('password', undefined, {strict: false});

        const data = {
            token: await tokenSign(user),
            user
        };

        res.send({data});
    
    } catch (err) {
        console.log(err);
        handleHttpEror(res, 'ERROR_LOGIN_USER', 404);
    }
}

module.exports = {registerCtrl, loginCtrl};