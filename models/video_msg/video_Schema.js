var mongoose = require('../mongo')
var video_Schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'video.name is required']
    },
    data: {
        view: {
            type: Number,
            index: true
        },
        coin: {
            type: Number
        },
        favorite: {
            type: Number
        },
        share: {
            type: Number
        }
    },
    av_number: {
        type: Number,
        required:true
    },
    upload_time: {
        type: Date
    },
    record_time: {
        type: Date
    },
    uploader: {
        type: String,
        required: [true, 'video.uploader is required']
    },
    url: {
        type: String
    },
    msg: {
        type: String
    },
    tag: {
        type: String,
        index: true
    },
    existed: {
        type: Boolean
    }
}, {collection: 'video'})


video_Schema.static('findLast', function (cb) {
    this.findOne().sort({'record_time': -1}).exec((err, res)=> {
        if (res===null){
            cb(err,0)
        }
        else cb(err,res)
    })
})

module.exports = mongoose.model('video', video_Schema)