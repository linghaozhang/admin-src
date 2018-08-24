
import {sendFetch} from '@fun/request'; // API统一封装函数

const Api = {

    /*
     * 获取实名认证状态
     * @parameter 无需传参，只需要提交系统参数即可
     *
     * */
    getCertificationState : function (parameter) {
        return sendFetch( "POST",GLOBAL_API_URL + '/APP/app2/AppUserAuth/auth_query',parameter);
    },

    /*
    * 上传图片接口-请求地址变量
    *
    * */
    uploadImageUrl:GLOBAL_API_URL + '/APP/app2/APPcontent/upload',

    /*
     * 上传视频接口-请求地址变量
     *
     * */
    uploadVideoUrl:GLOBAL_API_URL + '/APP/app2/APPcontent/upvideo',






};

export default Api;
