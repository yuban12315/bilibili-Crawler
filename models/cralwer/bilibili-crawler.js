const req = require('superagent-retry')(require('superagent'))
const cheerio = require('cheerio')
const async = require('async')
const video = require('./../Schema/video_Schema')
const userAgents=require('./user-agents')
const pLimit = require('p-limit')

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
    async $crawl(url) {
        const userAgent = userAgents[parseInt(Math.random() * userAgents.length)]
        const res=await req.get(url).set({ 'User-Agent': userAgent })
        return res.text
    }

    /**抓取完整视频数据
     * @param av_number
     * @return {video}
     * */
    async get_video(av_number) {
        const _video={} //视频数据
        //https://api.bilibili.com/x/web-interface/view?aid=2
        const res1=await this.$crawl(`${this.api_url}archive_stat/stat?aid=${av_number}`)
        const json=JSON.parse(res1)
        if(json.code!==0) {
            //throw new Error(`${av_number} : 该视频不存在`)
            return{
                code:404,
                video:_video
            }
        }
        _video.data={
            view: json.data.view,//观看数
            coin: json.data.coin,//硬币数
            favorite: json.data.favorite,//收藏数
            share: json.data.share//分享数
        }

        const res2=await this.$crawl(`${this.base_url}/video/av${av_number}`)
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
        return {
            code:200,
            video:_video
        }
    }

    /**获取b站最新的视频的av号
    * */
    async get_new() {
        const res=await this.$crawl(`${this.base_url}/newlist.html`)
        const $=cheerio.load(res)
        const av_number=Number.parseInt($('.vd_list>.l1>.preview').attr('href').split('/')[2].slice(2))
        return av_number
    }

    /**
     *type=-1   av号从最大开始向小获取
     * type=1 av号从最小开始向大获取
     * 按数量获取视频数据
     * 默认从新到后获取
     * @param args
     * 
     */
    async get(...args) {
        const number=args[0]
        const type=args[1]||1
        let av_number
        let count=0
        if(type===-1) {
            av_number=await this.get_new()
        }else if(type===1) {
            av_number=1
        }else {
            return
        }
        /**/

        const num=2 //并发数
        const limit=pLimit(num)
        const tasks=[]
        //while
        /*while (number>count) {
            count++
            const res=await this.get_video(av_number)
            av_number+=type
            console.log(res)
        }*/
        //setInterval
        const id =setInterval(async ()=>{
            if(number>count) {
                count++
                const res=await this.get_video(av_number)
                av_number+=type
                console.log(`${av_number}  ${res.code}`)
            }else {
                clearInterval(id)
                process.exit(1)
            }

        },200)
        return 1

    }
}
const a=new bilibiliCrawler()
const b=a.get(10,-1)
b.then((res)=>{

    console.log(res)

}).catch((e)=>{
    console.log(e.message)
})

module.exports=new bilibiliCrawler()