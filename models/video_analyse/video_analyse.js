let video = require('./../Schema/video_Schema')

class video_analyse {
    constructor() {
        this.tags = {
            music: "音乐",
            movie: "电影",
            anime: "番剧",
            game: "游戏",
            dance:"舞蹈",
            kichiku:"鬼畜",
            technology:"科技"
        }
    }

    get(opt, cb) {
        /* usage：传入opt和cb回调函数，
         get_movie(opt,(err,res)=>{
         if(err)console.log(err)
         if(res)console.log(res)
         })*/
        if (typeof (opt) === 'function') {
            console.log('opt is require')
            process.exit(1)
        }
        /*opt配置文件不能缺省，可以为{}，callback函数不能缺省
         eg:
         opt = {
         tag: this.tags.movie,
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
         };
         */

        if (opt.tag === undefined) {
            opt.tag = this.tags.movie
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
        video.find({"tag_1": opt.tag}, opt.data).sort(opt.sort).limit(opt.num).exec((err, res) => {
            cb(err, res)
        })
    }

    div_movie(opt, cb) {
        if (typeof (opt) === 'function') {
            console.log('opt is require')
            process.exit(1)
        }
        opt.tag = this.tags.movie
        this.get(opt, (err, res) => {
            cb(err, res)
        })
    }

    div_anime(opt, cb) {
        if (typeof (opt) === 'function') {
            console.log('opt is require')
            process.exit(1)
        }
        opt.tag = this.tags.anime
        this.get(opt, (err, res) => {
            cb(err, res)
        })
    }

    div_music(opt, cb) {
        if (typeof (opt) === 'function') {
            console.log('opt is require')
            process.exit(1)
        }
        opt.tag = this.tags.music
        this.get(opt, (err, res) => {
            cb(err, res)
        })
    }

    div_game(opt, cb) {
        if (typeof (opt) === 'function') {
            console.log('opt is require')
            process.exit(1)
        }
        opt.tag = this.tags.game
        this.get(opt, (err, res) => {
            cb(err, res)
        })
    }

    div_dance(opt, cb) {
        if (typeof (opt) === 'function') {
            console.log('opt is require')
            process.exit(1)
        }
        opt.tag = this.tags.dance
        this.get(opt, (err, res) => {
            cb(err, res)
        })
    }

    div_kichiku(opt, cb) {
        if (typeof (opt) === 'function') {
            console.log('opt is require')
            process.exit(1)
        }
        opt.tag = this.tags.kichiku
        this.get(opt, (err, res) => {
            cb(err, res)
        })
    }

    div_technology(opt, cb) {
        if (typeof (opt) === 'function') {
            console.log('opt is require')
            process.exit(1)
        }
        opt.tag = this.tags.technology
        this.get(opt, (err, res) => {
            cb(err, res)
        })
    }
}

module.exports = new video_analyse()