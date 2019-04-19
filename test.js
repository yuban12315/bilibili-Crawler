const request = require('superagent')
const userAgent='Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12'
request.get('https://s.yam.com/bqjnG').set({ 'User-Agent': userAgent }).end((err,res)=>{
    if(err) {
        console.log(err)
    }else {
        console.log(res)
    }
})
