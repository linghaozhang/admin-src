
// fetch请求header
var fetchHeader = {
    "Content-Type":"application/json",
    "Authorization":"Bearer "+sessionStorage.getItem('TRQtoken'),
};


/*
 * 封装fetch
 * */
var fetchService = function (url , options) {

    return fetch(url,options).then(function(response) {

        if( response.status == 200 ){
            return response.json();
        }else{
            console.log('请求出错，错误信息：',response);
            return response;
        }

    }).then(function(data) {

        return data;

    }).catch(function(e) {

        console.log("fetch, error",e);

    });

};




const Api = {

    /*
     * 管理员登陆
     *
     * @parameter  username -> 用户名
     * @parameter  password -> 用户密码
     *
     * */
    loginIn : function (parameter) {
        return fetchService( GLOBAL_API_URL + '/index.php/admin/login',{
            method: "POST",
            headers: fetchHeader,
            body:JSON.stringify(parameter)
        });
    },

    /*
     * 获取所有用户
     *
     * */
    getAllUser : function () {
        return fetchService( GLOBAL_API_URL + '/index.php/user/all',{
            method: "GET",
            headers: fetchHeader,
        });
    },

    /*
     * 获取单个用户信息
     *
     * @parameter userId 用户ID
     *
     * */
    getUser : function (userId) {
        return fetchService( GLOBAL_API_URL + '/index.php/user?userId='+userId,{
            method: "GET",
            headers: fetchHeader,
        });
    },

    /*
     * 更新用户信息
     *
     * @parameter id 用户ID
     * @parameter any 任何字段
     *
     * */
    updateUser : function (parameter) {
        return fetchService( GLOBAL_API_URL + '/index.php/user/update',{
            method: "POST",
            headers: fetchHeader,
            body:JSON.stringify(parameter)
        });
    },

    /*
     * 获取所有对接信息
     *
     * */
    getAllDocking : function () {
        return fetchService( GLOBAL_API_URL + '/index.php/buttJoin',{
            method: "GET",
            headers: fetchHeader,
        });
    },

    /*
     * 获取所有反馈建议
     *
     * */
    getAllFeedback : function () {
        return fetchService( GLOBAL_API_URL + '/index.php/feedback/all',{
            method: "GET",
            headers: fetchHeader,
        });
    },
    /*
     * 获取所有配置信息
     *
     * */
    getAllConfig : function () {
        return fetchService( GLOBAL_API_URL + '/index.php/config',{
            method: "GET",
            headers: fetchHeader,
        });
    },

    /*
     * 更新配置信息
     *
     * @parameter id 配置ID
     * @parameter type 配置类别
     * @parameter cat 配置名称
     *
     * */
    updateConfig : function (parameter) {
        return fetchService( GLOBAL_API_URL + '/index.php/config/update',{
            method: "POST",
            headers: fetchHeader,
            body:JSON.stringify(parameter)
        });
    },

    /*
     * 删除配置信息
     *
     * @parameter id 配置ID
     *
     * */
    deleteConfig : function (parameter) {
        return fetchService( GLOBAL_API_URL + '/index.php/config/delete',{
            method: "POST",
            headers: fetchHeader,
            body:JSON.stringify(parameter)
        });
    },

    /*
     * 增加配置信息
     *
     * @parameter type 配置类型
     * @parameter cat 描述
     *
     * */
    addConfig : function (parameter) {
        return fetchService( GLOBAL_API_URL + '/index.php/config/create',{
            method: "POST",
            headers: fetchHeader,
            body:JSON.stringify(parameter)
        });
    },

    /*
     * 删除对接接口
     *
     * @parameter id 对接
     *
     * */
    deleteButtJoin : function (parameter) {
        return fetchService( GLOBAL_API_URL + '/index.php/buttJoin/delete',{
            method: "POST",
            headers: fetchHeader,
            body:JSON.stringify(parameter)
        });
    },

    /*
     * 根据ID获取对接信息
     *
     * @parameter id 对接ID
     *
     * */
    getButtJoinById : function (id) {
        return fetchService( GLOBAL_API_URL + '/index.php/buttJoin/get?id='+id,{
            method: "GET",
            headers: fetchHeader,
        });
    },

    /*
     * 查询推荐用户
     *
     * @parameter position 推荐位置
     *
     * */
    getecommend : function (position,type) {
        return fetchService( GLOBAL_API_URL + '/index.php/recommend/get?position='+position+'&type='+type,{
            method: "GET",
            headers: fetchHeader,
        });
    },

    /*
     * 更新推荐用户
     *
     * @parameter position 推荐位置
     * @parameter type 推荐类型
     * @parameter recommendIds 推荐ID  json.arr
     *
     * */
    updateButtJoin : function (parameter) {
        return fetchService( GLOBAL_API_URL + '/index.php/recommend/update',{
            method: "POST",
            headers: fetchHeader,
            body:JSON.stringify(parameter)
        });
    },

    /*
     * 根据ID获取用户类别
     *
     * @parameter id 配置的ID
     *
     * */
    getConfigById : function (id) {
        return fetchService( GLOBAL_API_URL + '/index.php/config/get?id='+id,{
            method: "GET",
            headers: fetchHeader,
        });
    },


    /*
     * 获取举报列表
     *
     * */
    getTipOffAll : function () {
        return fetchService( GLOBAL_API_URL + '/index.php/tipOff/all',{
            method: "GET",
            headers: fetchHeader,
        });
    },


    /*
     * 发送系统通知
     *
     * */
    notice : function (parameter) {
        return fetchService( GLOBAL_API_URL + '/index.php/sys/notice',{
            method: "POST",
            headers: fetchHeader,
            body:JSON.stringify(parameter)
        });
    },

    /*
     * 根据ID获取邀请记录
     *
     * */
    inviteGet : function (inviteId) {
        return fetchService( GLOBAL_API_URL + '/index.php/invite/get?inviteId='+inviteId,{
            method: "GET",
            headers: fetchHeader,
        });
    },

    /*
     * 上传图片地址
     *
     * */
    uploadFileUrl:GLOBAL_API_URL + '/index.php/file/upload',
    /*
     * 全部用户中根据姓名搜索
     *
     * */
    getInfoFormName:(name)=>{
        return fetchService( GLOBAL_API_URL + '/index.php/user/userinfo',{
            method: "POST",
            headers: fetchHeader,
            body:JSON.stringify(name)
        });
    }
};

export default Api;
/**
 * Created by Xin on 2017/8/29.
 */
