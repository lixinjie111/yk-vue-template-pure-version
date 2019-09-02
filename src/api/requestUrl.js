// 引入全局配置文件
import '../../static/config/config.js';

let HTTPURL = '';

if(process.env.NODE_ENV == 'development') { // 开发环境
    HTTPURL = window.config.url;
}else {
    HTTPURL = window.config.url;
}
export {
	HTTPURL
}
