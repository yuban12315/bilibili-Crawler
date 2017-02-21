/**
 * Created by miku on 2017/2/21.
 */
var req=require('superagent-charset')(require('superagent'))
var async=require('async')
var cheerio=require('cheerio')
class base {
    constructor() {
        this.base_url = 'http://www.bilibili.com/video/av1'
    }

    get_page(cb) {
        req.get(this.base_url).end((err,res)=>{
            cb(err,res)
        })
    }

}
let n=new base()
n.get_page((err,res)=>{
    console.log(res.text.includes('z-msg'))
})

