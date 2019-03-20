const req = require('superagent-retry')(require('superagent'))
const cheerio = require('cheerio')
const async = require('async')
const video = require('./../Schema/video_Schema')
const userAgents=require('./user-agents')

class bilibiliCrawler {
    get base_url() {
        return this._base_url
    }
    get api_url() {
        return this._api_url
    }
    constructor() {
        this._base_url = 'http://www.bilibili.com'
        this._api_url = 'http://api.bilibili.com/'
    }
    async crawl(url) {
        const userAgent = userAgents[parseInt(Math.random() * userAgents.length)]
        const res=await req.get(url).set({ 'User-Agent': userAgent })
        return res.text
    }
    //抓取两次,一次是抓取api端口,一次是抓取视频页面获取更多信息
    async get_video(av_number) {
        const _video={} //视频数据
        //https://api.bilibili.com/x/web-interface/view?aid=2
        const res1=await this.crawl(`${this.api_url}archive_stat/stat?aid=${av_number}`)
        const json=JSON.parse(res1)
        if(json.code!==0) {
            throw new Error('该视频不存在')
        }
        _video.data={
            view: json.data.view,//观看数
            coin: json.data.coin,//硬币数
            favorite: json.data.favorite,//收藏数
            share: json.data.share//分享数
        }

        const res2=await this.crawl(`${this.base_url}/video/av${av_number}`)
        /*const reg=/视频去哪了呢/g
        //视频不存在
        if(reg.test(res2)) {
            throw new Error('该视频不存在')
        }*/
        //从视频页获取信息
        const $1 = cheerio.load(res2)
        _video.title = $1('#viewbox_report>h1').text() //标题
        _video.av_number = av_number
        _video.tag_1 = $1('#viewbox_report>.video-data>.a-crumbs>a:nth-child(1)').text()
        _video.tag_2 = $1('#viewbox_report>.video-data>.a-crumbs>a:nth-child(3)').text()
        //有些视频tag缺省
        if(_video.tag_1==='') {
            _video.upload_time=new Date($1('.video-data').first().children().first().text())
        }else{
            _video.upload_time = new Date($1('.video-data').first().children().first().next().text()) //视频发布时间
        }
        _video.record_time=new Date()
        _video.uploader=$1('.u-info>.name>.username').text()
        _video.url=`${this.base_url}/video/av${av_number}`
        _video.msg=$1('#v_desc').text()
        _video.existed = true
        return _video
    }
}
const a=new bilibiliCrawler()
const b=a.get_video(88)
b.then((res)=>{

    console.log(res)

}).catch((e)=>{
    console.log(e.message)
})

module.exports=new bilibiliCrawler()