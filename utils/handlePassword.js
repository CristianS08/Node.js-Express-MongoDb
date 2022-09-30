const bcryptjs = require('bcryptjs');

// debe recibir el pass sin encriptar
const encrypt = async (passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain, 10);
    return hash;
};

const compare = async (paswordPlain, hashPassword) => {
    return await bcryptjs.compare(paswordPlain, hashPassword);
};

module.exports = {encrypt, compare};