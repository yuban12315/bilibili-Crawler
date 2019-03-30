const pLimit = require('p-limit')
const Crawler=require('./crawler')

const crawler1=new Crawler('https://job.bytedance.com/user/profile/')
const crawler2=new Crawler('https://job.bytedance.com/user/profile/')
const crawler3=new Crawler('https://job.bytedance.com/user/profile/')

const limit = pLimit(3)

const input = [
    limit(() => crawler1.crawl()),
    limit(() => crawler2.crawl()),
    limit(() => crawler3.crawl())
];

(async () => {
    // Only one promise is run at once
    const result = await Promise.all(input);
    console.log(result);
})();