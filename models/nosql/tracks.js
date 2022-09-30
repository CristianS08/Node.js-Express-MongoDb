const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const TrackSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        album: {
            type: String
        },
        cover: {
            type: String,
            validate: {
                validator: (req) => {
                    return true;
                },
                message: 'ERROR_URL'
            }
        },
        artist: {
            name: {
                type: String,
            },
            nickname: {
                type: String,
            },
            nationaly: {
                type: String,
            }
        },
        duration: {
            start:{
                type: Number
            },
            end: {
                type:Number
            }
        },
        mediaId: {
            type: mongoose.Types.ObjectId
        }
    },
    {
        timestamps: true, //para la fecha de creacion y actualizacion
        versionkey: false
    }
);

/**
 * Impletar metodo propio con relacion a Storage
 */

TrackSchema.statics.findAllData = function(id) {
    const joinData = this.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: 'storages', 
                localfield: 'mediaId', 
                foreignfield: '_id', 
                as: 'audio' 
            }
        },
        {
            $unwind: '$audio' 
        }
    ])
    return joinData;
};


// este metodo es para cuando hacemos getItem
TrackSchema.statics.findOneData = function() {
    const joinData = this.aggregate([
        {
            $lookup: {
                from: 'storages', //esta es la relacion tracks --> storage
                localfield: 'mediaId', // este es el mediaId de tracks
                foreignfield: '_id', // y se relaciona con storage._id     tracks.mediaId == storage._id
                as: 'audio' //y toda la informacion laa coloca en audio que es un alias
            }
        },
        {
            $unwind: '$audio' //esto me daca los corchetes del array si es que la relacion es a uno
        }
    ])
    return joinData;
};

//le decimos al model que use softdelete
TrackSchema.plugin(mongooseDelete, {overrideMethods: 'all'});
module.exports = mongoose.model('tracks', TrackSchema);