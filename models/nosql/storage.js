const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const StorageSchema = new mongoose.Schema(
    {
        url: {
            type: String
        },
        filename: {
            type: String
        }
    },
    {
        timestamps: true, //para la fecha de creacion y actualizacion
        versionkey: false
    }
);

//le decimos al model que use softdelete
StorageSchema.plugin(mongooseDelete, {overrideMethods: 'all'});
module.exports = mongoose.model('storages', StorageSchema);