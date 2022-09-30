const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        age: {
            type: Number
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            select: false
        },
        role: {
            type: ['user', 'admin'],
            default: 'user'
        }
    },
    {
        timestamps: true, //para la fecha de creacion y actualizacion
        versionkey: false
    }
);

//le decimos al model que use softdelete
UserSchema.plugin(mongooseDelete, {overrideMethods: 'all'});
module.exports = mongoose.model('users', UserSchema);