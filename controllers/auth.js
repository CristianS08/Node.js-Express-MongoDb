const { matchedData } = require('express-validator');
const {usersModel} = require('../models');
const {encrypt, compare} = require('../utils/handlePassword');
const { tokenSign } = require('../utils/handleJwt');
const {handleHttpEror} = require('../utils/handleError');

const registerCtrl = async (req, res) =>{
    try {
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = {...req, password};
        const dataUser = await usersModel.create(body);
        dataUser.set('password', undefined, {strict: false}); // esto es para que no devuelva la contraseña en el response

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
        req = matchedData(req);
        const user = await usersModel.findOne({email: req.email}); 
        
        if(!user){
            handleHttpError(res, 'USER_NOT_EXIST', 404);
            return;
        };

        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword);

        if(!check){
            handleHttpError(res, 'PASSWORD_INVALID', 401);
            return;
        };

        user.set('password', undefined, {strict: false});

        const data = {
            token: await tokenSign(user),
            user
        };

        res.send({data});
    
    } catch (err) {
        handleHttpError(res, 'ERROR_LOGIN_USER', 404);
    }
}

module.exports = {registerCtrl, loginCtrl};