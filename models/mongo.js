var mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1/bilibili_data');
mongoose.Promise = global.Promise
module.exports=mongoose;