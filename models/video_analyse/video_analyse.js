let video = require('./../Schema/video_Schema')

class video_analyse {
    constructor() {
        this.tags = {
            music: "音乐",
            movie: "电影"
        }
    }

    get_movie(opt, cb) {
        /* usage：传入opt和cb回调函数，
         get_movie(opt,(err,res)=>{
         if(err)console.log(err)
         if(res)console.log(res)
         })
         opt配置文件可缺省，callback函数不能缺省*/
        if (typeof (opt) == 'function') {
            cb = opt
            opt = {
                num: 5,//默认返回的记录数
                sort: {
                    'data.view': -1//默认排序方式，按播放量从高到底排列
                },
                data: {
                    //默认返回的文档资料
                    "title": 1,
                    "msg": 1,
                    "url": 1,
                    'data.view': 1
                }
            }
        }

        if (opt.num === undefined) {
            opt.num = 5
        }
        if (opt.sort === undefined) {
            opt.sort = {
                'data.view': -1
            }
        }
        if (opt.data === undefined) {
            opt.data = {
                "title": 1,
                "msg": 1,
                "url": 1,
                'data.view': 1
            }
        }
        video.find({"tag_1": this.tags.movie}, opt.data).sort(opt.sort).limit(opt.num).exec((err, res) => {
            cb(err, res)
        })
    }
}

module.exports = new video_analyse()