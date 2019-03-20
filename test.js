/*
 //test mongoDB connection
 let video=require('./models/Schema/video_Schema')
 video.find({}).limit(20).exec((err, res)=> {
 if(err)console.log(err)
 if(res)console.log(res)
 process.exit(1)
 })*/
const crawler=require('./models/cralwer/bilibili-crawler')

try {
 crawler.$crawl('https://www.bilibili.com/video/av4')
}catch (e) {
 console.log(e)
}

