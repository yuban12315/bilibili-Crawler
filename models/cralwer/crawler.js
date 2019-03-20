const req = require('superagent-retry')(require('superagent'))
const cheerio = require('cheerio')
const async = require('async')
const video = require('./../Schema/video_Schema')
const userAgents=require('./user-agents')

//爬虫类，爬取bilibili的视频的信息，信息结构定义在video_Schema内
//调用get_video(),即可开始爬取数据
class Crawler {
    constructor(url) {
        this.url=url
    }
    async crawl() {
        
    }
}
// class Crawler {
//
//     constructor() {
//         // set url
//         this.base_url = 'http://www.bilibili.com'
//         this.api_url = 'http://api.bilibili.com/'
//     }
//
//     async crawl_video(av_number) {
//         if(Object.prototype.toString.call(av_number) !== '[object Number]') {
//             throw new TypeError('av_number should be a number')
//         }
//         console.log(`${this.base_url}/video/av${av_number}`)
//         const res=await req.get(`${this.base_url}/video/av${av_number}`)
//         console.log(res)
//
//     }
//
//     async get_video() {
//         await this.crawl_video(1)
//     }
//
// }

/*(async function () {
    try {
        const a=new Crawler()
        await a.crawl_video(46547475)
        return
    }catch (e) {
        if(e) {
            console.log(e.message)
        }
    }
})()*/
