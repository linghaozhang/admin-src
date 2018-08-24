
import {fetchService, fetchHeader} from '../server-common';

/*
* API统一封装函数
*
* */
export const ApiPackaging = function (method,url,options) {

        /*
        * 获取、拼接系统参数、并将系统参数加入到传参中
        *   versions -> 客户端版本号
        *   phone_system -> 设备类型，传pc
        *   uid -> 用户id
        *   phone_os -> 手机系统，暂时传空字符串
        *   phone_brand -> 手机型号，暂时传空字符串
        *
        * */
        let uid = store.getState().userId; //从store中获取当前用户ID
        let system_data = '{"versions":"","phone_system":"pc","uid":'+ uid +',"phone_os":"","phone_brand":""}'; // 拼接完整的系统参数
        options.system_data = system_data; // 将系统参数加入到传参中

        // 使用fetch进行HTTP请求
        return fetchService( url,{
            method: method,
            headers: fetchHeader,
            body:JSON.stringify(options)
        });

}