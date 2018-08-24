import {sendFetch} from '@fun/request'; // API统一封装函数

/*
* 稿件上传相关接口
* */

const Api = {

    /*
     * 获取栏目分类
     *
     * @parameter  type -> 类型，1为稿件上传栏目
     *
     * */
    getColumn : function (parameter) {
        return sendFetch( "POST",GLOBAL_API_URL + '/APP/app2/APPcontent/phone_category',parameter);
    },

    /*
     * 稿件发布
     *
     * @parameter  title -> 标题
     * @parameter  column_id -> 栏目ID
     * @parameter  type -> 类型，'wenzhang'->图文，'guanli_video'->视频，'hunpai'->混排，'zutu'->组图
     * @parameter  content -> 内容
     * @parameter  thumb -> 缩略图
     * @parameter  video -> 视频地址
     * @parameter  tags -> 关键字,后台暂时没有接,传keyword
     * @parameter  status -> 提交至状态,1为提交至未审核，5为提交至草稿箱
     *
     * */
    submitManuscript : function (parameter) {
        return sendFetch( "POST",GLOBAL_API_URL + '/APP/app2/APPcontent/phone_page',parameter);
    },

    /*
     * 获取个人发布的稿件
     *
     * @parameter
     *
     *    status 状态  0全部 4已发布 1审核中 3待发布 5草稿
     *    page: 页数  从0页开始
     *    count：每页的条数
     *
     * */
    getNews : function (parameter) {
        return sendFetch( "POST",GLOBAL_API_URL + '/APP/app2/ReleaseJson/community_manuscript',parameter);
    },

    /*
     * 撤回稿件、删除稿件
     *
     *   @parameter Name:type,Tip:操作的类型，(xiansuo/gaojian),Type:String
     *   @parameter Name:content_id,Tip:内容ID,Type:Number
     *   @parameter Name:status,Tip:删除方式，1彻底删除/2软删除-撤回，Type:Number
     *
     *
     * */
    newsDelete : function (parameter) {
        return sendFetch( "POST",GLOBAL_API_URL + '/APP/app2/ReleaseJson/delete_msg',parameter);
    },

    /*
     * 更新图文稿件，重新编辑
     *
     *   @parameter  content_id -> 稿件id -> Number
     *   @parameter  title -> 标题
     *   @parameter  column_id -> 栏目ID
     *   @parameter  type -> 类型，'wenzhang'->图文，'guanli_video'->视频，'hunpai'->混排，'zutu'->组图
     *   @parameter  content -> 内容
     *   @parameter  thumb -> 缩略图
     *   @parameter  video -> 视频地址
     *   @parameter  tags -> 关键字,后台暂时没有接,传keyword
     *   @parameter  status -> 提交至状态,1为提交至未审核，5为提交至草稿箱
     *
     * */
    newsUpdate : function (parameter) {
        return sendFetch( "POST",GLOBAL_API_URL + '/APP/app2/APPcontent/manuscript_update',parameter);
    },

    /*
     * 获取图文新闻详情 
     *
     * @parameter  news_id -> 新闻id
     * @parameter  content_type -> 哪个表的数据，1是contnt 2是release_data
     *
     * */
    getNewsContent : function (parameter) {
        return sendFetch( "POST",GLOBAL_API_URL + '/APP/app2/APPcontent/news_details',parameter);
    },

    /*
     * 获取视频新闻详情
     *
     * @parameter  news_id -> 新闻id
     * @parameter  content_type -> 哪个表的数据，1是contnt 2是release_data
     * @parameter  c_type -> 终端类型，0是客户端 2是H5
     *
     * */
    getVideoNewsContent : function (parameter) {
        return sendFetch( "POST",GLOBAL_API_URL + '/APP/app2/APPcontent/share_video',parameter);
    },

    /*
     * 获取视频新闻详情
     *
     * @parameter  news_id -> 新闻id
     * @parameter  content_type -> 哪个表的数据，1是contnt 2是release_data
     *
     * */
    getImageNewsContent : function (parameter) {
        return sendFetch( "POST",GLOBAL_API_URL + '/APP/app2/APPcontent/imageset_detail',parameter);
    },

    /*
     * 开关稿件评论
     *
     * @parameter  content_id -> 稿件id
     * @parameter  allow_comment -> 1开启评论，2关闭评论
     *
     * */
    controlComment: function (parameter) {
        return sendFetch( "POST",GLOBAL_API_URL + '/APP/app2/APPcontent/allow_comment',parameter);
    },



};

export default Api;
