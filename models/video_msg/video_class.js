/**
 * Created by miku on 2017/2/22.
 */
var req=require('superagent-charset')(require('superagent'))
var cheerio=require('cheerio')
var video=require('./video_Schema')
class base {
    constructor() {
        this.base_url = 'http://www.bilibili.com/'
    }
    *get_av(){
         //var av_number=yield video.findLast()
        console.log(av_number)
    }
}
var n=new base()
n.get_av().next()

