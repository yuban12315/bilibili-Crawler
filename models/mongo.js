var mongoose=require('mongoose')
var config=require('./config')
var opt={
    user: config.user,
    pass: config.pass,
    auth: {
        authdb: config.db
    }
}
mongoose.connect(config.url,opt);

mongoose.Promise = global.Promise
module.exports=mongoose;