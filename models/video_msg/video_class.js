let req = require('superagent-retry')(require('superagent'))
let cheerio = require('cheerio')
let async = require('async')
let video = require('./video_Schema')

class video_crawler {
    //爬虫类，爬取bilibili的视频的信息，信息结构定义在video_Schema内
    //调用get_video即可开始爬取数据
    constructor() {
        // set url
        this.base_url = 'http://www.bilibili.com/'
        this.api_url = 'http://api.bilibili.com/'
    }

    get_video(cb) {
        //使用async异步处理
        async.waterfall([
            (cb) => {
                //从数据库中获取最新一条数据
                video.findLast((err, res) => {
                    if (err) console.log(err)
                    cb(err, res.av_number)
                })
            },
            (number, cb) => {
                //console.log('---抓取开始---')
                //count置为数据库中最新一条记录的av号
                let count = number
                //用setInterval连续抓取
                let id = setInterval(() => {
                    this.crawl_video(count, (err, res) => {
                        if (err && err.msg === 'av号超出范围') {
                            clearInterval(id)
                            cb(err, null)
                        }
                        if (err) {
                            console.log('crawl av' + res + '     failed')
                        }
                        else {
                            console.log('crawl av' + res + '     success')
                        }
                    })
                    count++
                }, 40)//
            }
        ], (err, res) => {
            console.log('---抓取结束---')
            cb(err, res)
        })
    }

    crawl_video(av_number, cb) {
        async.waterfall([
            (cb) => {
                req.get(`${this.base_url}/video/av${av_number}`).retry(5).end((err, res) => {
                    let existed = true
                    //判断服务器返回的数据
                    if (res === undefined || res.text===undefined) {
                        cb(new Error("服务器无响应"), av_number)
                    } else if (res.text.includes('z-msg')) {
                        cb(new Error('该视频不存在'), av_number)
                    }
                    else if (res.text.includes('对不起，你输入的参数有误！')) {
                        cb(new Error('av号超出范围'), av_number)
                    }
                    else if (res.text.includes('errmsg')) {
                        cb(new Error('服务器出错'), av_number)
                    }
                    else {
                        //当前视频存在，开始分析HTML
                        var $ = cheerio.load(res.text)
                        var _video = {}
                        _video.title = $("div.v-title>h1").text()
                        _video.av_number = av_number
                        _video.upload_time = $("time>i").text()
                        var date = new Date()
                        _video.record_time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
                        _video.uploader = $("a.name").attr('title')
                        _video.url = `${this.base_url}/video/av${av_number}`
                        _video.msg = $('#v_desc').text()
                        _video.tag_1 = $('div.tminfo>span:nth-child(2)>a').text()
                        _video.tag_2 = $('div.tminfo>span:nth-child(3)>a').text()
                        _video.existed = true
                        cb(null, _video)
                    }
                })
            },
            (_video, cb) => {
                req.get(`${this.api_url}archive_stat/stat?aid=${_video.av_number}`).retry(5).end((err, res) => {
                    if (err) {
                        console.log(err)
                        cb(err, null)
                    }
                    let data = JSON.parse(res.text)
                    if (data === null||data===undefined) {
                        cb(new Error('code is null'), _video.av_number)
                    }
                    else if (data.code == 0) {
                        data = data.data
                        data = {
                            view: data.view,
                            coin: data.coin,
                            favorite: data.favorite,
                            share: data.share
                        }
                        _video.data = data
                        cb(null, _video)
                    }
                    else {
                        cb(new Error('wrong'), _video.av_number)
                    }
                })
            },
            (data, cb) => {
                let new_video = new video(data)
                //储存已抓取的数据
                new_video.save((err) => {
                    cb(err, data.av_number)
                })
            }
        ], (err, res) => {
            cb(err, res)
        })
    }
}
module.exports = new video_crawler()

