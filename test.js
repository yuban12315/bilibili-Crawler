let video=require('./models/video_msg/video_Schema')


video.find({}).limit(20 ).exec((err, res)=> {
    if(err)console.log(err)
    if(res)console.log(res)
})