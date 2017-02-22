var req = require('superagent-charset')(require('superagent'))
var cheerio = require('cheerio')
var async = require('async')
var video = require('./video_Schema')

class base {
    constructor() {
        this.base_url = 'http://www.bilibili.com/'
    }

    get_last_video(cb) {
        async.waterfall([
            (cb)=> {
                video.findLast((err, res)=> {
                    if(err) console.log(err)
                 cb(null,res)
                })
            },
            (number,cb)=>{
                cb(null,number)
            }
        ], (err, res)=> {
            cb(err,res)
        })
    }
}
var n = new base()
n.get_last_video((err,res)=>{

})

