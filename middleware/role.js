const {handleHttpEror} = require('../utils/handleError');

/**
 * se debe pasar un array con los roles permitidos
 * @param {*} role 
 * @returns 
 */
const checkRole = (roles) => (req, res, next) => {
    try {
        const {user} = req;
        const rolesByUser = user.role;

        //devuelve true o false
        const checkValueRole = roles.some((roleSingle) => rolesByUser.includes(roleSingle)); // me verifica si el rol del usuario pertenece a alguno de los roles pasados por parametro

        if(!checkValueRole){
            handleHttpEror(res, 'USER_NOT_PERMISSION', 403);
            return;
        }

        next();
    } catch (err) {
        handleHttpEror(res, 'ERROR_PERMISSION', 403);
    }
};

module.exports = {checkRole};