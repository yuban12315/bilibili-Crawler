
const yourFunction = function(func, threshold) {
    // 请实现
    let temp=null
    return function (...args) {
        const _this=this
        if(!temp){
            temp=setTimeout(()=>{
                func.apply(_this,args)
                temp=null
            },threshold)
        }
    }
}

const triggerSearch = yourFunction((val) => {
    console.log(val)
}, 500)
setInterval(()=>{
    triggerSearch(1)
},20)

