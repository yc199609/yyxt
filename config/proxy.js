module.exports = {
    dev: {
        '/api': {    //将www.exaple.com印射为/apis
            target: 'http://192.168.0.27:3000/mock/13',  // 接口域名
            changeOrigin: true,  //是否跨域
            pathRewrith: {
                '^/api': '/api'
            }
        }
    }
}