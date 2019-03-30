const request = require('superagent')
const userAgent='Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12'
request.get('http://122.10.92.246').set({ 'User-Agent': userAgent }).end((err,res)=>{
    if(err) {
        console.log(err)
    }else {
        console.log(res)
    }
})
console.log(   '<html>\r\n<head>\r\n<meta http-equiv="Content-Language" content="zh-CN">\r\n<meta HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=gb2312">\r\n<meta http-equiv="refresh" content="0.1;url=/act/pc/a20170515hlhd/index.php?act=1">\r\n<title></title>\r\n</head>\r\n<body>\r\n</body>\r\n</html>',)