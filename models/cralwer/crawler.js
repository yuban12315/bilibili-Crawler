const req = require('superagent-retry')(require('superagent'))
const cheerio = require('cheerio')
const async = require('async')
const video = require('./../Schema/video_Schema')
const userAgents=require('./user-agents')


//调用get_video(),即可开始爬取数据
class Crawler {
    constructor(url) {
        this.url=url
    }
    async crawl() {
        const userAgent = userAgents[parseInt(Math.random() * userAgents.length)]
        const res=await req.get(this.url).set({ 'User-Agent': userAgent })
        return res.text
    }
}

module.exports=Crawler


