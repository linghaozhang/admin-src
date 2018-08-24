
import {sendFetch} from '@fun/request'; // API统一封装函数

const Api = {

    /*
    * 用户手机号登录
    *
    * @parameter  phone -> 手机号
    * @parameter  password -> 用户密码
    * @parameter  token -> 项目表示，全局配置
    * @parameter  type -> 登录方式，0表示手机号，1表示微信，2表示QQ，3表示微博
    *
    * */
    getlanmu : function (parameter) {
        return sendFetch( "POST",GLOBAL_API_URL + '/APP/app2/ReleaseJson/login',parameter);
    },

}

export default Api;
