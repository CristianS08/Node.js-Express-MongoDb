const {handleHttpEror} = require('../utils/handleError');

const checkRole = (roles) => (req, res, next) => {
    try {
        const {user} = req;
        const rolesByUser = user.role;
        console.log(user);

        const checkValueRole = roles.some((roleSingle) => rolesByUser.includes(roleSingle)); 

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