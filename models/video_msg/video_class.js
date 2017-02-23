var req = require('superagent-charset')(require('superagent'))
var cheerio = require('cheerio')
var async = require('async')
var video = require('./video_Schema')

class base {
    constructor() {
        this.base_url = 'http://www.bilibili.com/'
    }
    get_video(cb) {
        async.waterfall([
            (cb)=> {
                video.findLast((err, res)=> {
                    if (err) console.log(err)
                    cb(err, res)
                })
            },
            (number, cb)=> {
                console.log('---抓取开始---')
                let count = number
                let id = setInterval(()=> {
                    this.crawl_video(count,(err,res)=>{
                        if(err&&err.msg==='av号超出范围') {
                            clearInterval(id)
                            cb(err,null)
                        }
                    })
                    count++
                }, 100)
            }
        ], (err, res)=> {
            console.log('---抓取结束---')

            cb(err, res)
        })
    }
    crawl_video(av_number, cb) {
        async.waterfall([
            (cb)=>{
                req.get(this.base_url+'/video/av'+av_number).end((err,res)=>{
                    let existed=true
                    if(res.text.includes('z-msg')){
                        cb(new Error('该视频不存在'),null)
                    }
                    else if(res.text.includes('对不起，你输入的参数有误！')){
                        cb(new Error('av号超出范围'),null)
                    }
                    else cb(err,av_number)
                })
            },
            (number)=>{
                console.log('av'+number)
                cb(null,number)
            }
        ],(err,res)=>{
            cb(err,res)
        })
    }

    save_video(video, cb) {

    }
}
var n = new base()
n.get_video((err, res)=> {

})

