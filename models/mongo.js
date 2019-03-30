const mongoose=require('mongoose')
const config=require('./config')
const opt={
    user: config.user,
    pass: config.pass,
    auth: {
        authdb: config.db
    }
}
mongoose.connect(config.url,{ useMongoClient: true })

mongoose.Promise = global.Promise
module.exports=mongoose
