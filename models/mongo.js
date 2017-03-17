let mongoose=require('mongoose')
let config=require('./config')
let opt={
    user: config.user,
    pass: config.pass,
    auth: {
        authdb: config.db
    }
}
mongoose.connect(config.url);

//mongoose.Promise = global.Promise
module.exports=mongoose;