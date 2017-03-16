# bilibili-Crawler
一个爬取bilibili视频信息的爬虫

使用superagent抓取数据，cheerio分析html

抓取的数据保存在mongodb内

抓取的信息如下Schema
```
let video_Schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'video.name is required']
    },
    data: {
        view: {
            type: Number,
            index: true
        },
        coin: {
            type: Number
        },
        favorite: {
            type: Number
        },
        share: {
            type: Number
        }
    },
    av_number: {
        type: Number,
        index:true,
        required:true
    },
    upload_time: {
        type: Date
    },
    record_time: {
        type: Date
    },
    uploader: {
        type: String,
        required: [true, 'video.uploader is required']
    },
    url: {
        type: String
    },
    msg: {
        type: String
    },
    tag_1: {
        type: String,
        index: true
    },
    tag_2:{
        type: String,
        index: true
    },
    existed: {
        type: Boolean
    }
}, {collection: 'video'})
```