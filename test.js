/*
 //test mongoDB connection
 let video=require('./models/Schema/video_Schema')
 video.find({}).limit(20).exec((err, res)=> {
 if(err)console.log(err)
 if(res)console.log(res)
 process.exit(1)
 })*/
const crawler=require('./models/cralwer/bilibili-crawler')

const pLimit = require('p-limit')

const limit = pLimit(1)

const input = [
    limit(setTimeout(()=>{
        console.log(1)
    },100)),
    limit(setTimeout(()=>{
        console.log(1)
    },100)),
    limit(setTimeout(()=>{
        console.log(1)
    },100))
];

(async () => {
    // Only one promise is run at once
    const result = await Promise.all(input)
    console.log(result)
})()