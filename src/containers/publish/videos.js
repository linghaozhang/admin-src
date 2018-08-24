import React from 'react';
import './videos.less';
import { Input, Radio, Icon, Select, Button } from 'antd';
const { TextArea } = Input;
import {messageSuccess,messageError,messageWarning} from '@fun/message'; // 全局提示

import LayoutApi from '@api/layout';
import PublishApi from '@api/publish';

import ColumnsSelect from '@components/form/columns-select'; // 分类选择
import VideoUpload from '@components/form/video-upload/video-upload'; //视频上传
import ReactPlayer from 'react-player';

import PhoneView from '@components/phone-view/phone-view';

export default class Videos extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            videoUrl:'', //视频地址
            columnKey:'', //选中的栏目分类key
            title:'', //标题内容
            Introduction:'', //简介
            coverImage:'', //封面图

            submitBtnLoading:false, //提交按钮是否loading
        };
      }

      // 改变当前选中的栏目分类
    columnsSelectChange(key){
        this.setState({columnKey:key});
    }

    // 标题改变
    titleChange(e){
        this.setState({title:e.target.value});
    }

    //简介改变
    introductionChange(e){
        this.setState({Introduction:e.target.value});
    }

    // 判断是否满足提交条件
    submitCheck(){
        // 标题是否过短
        if (this.state.title.length < 5){
            messageWarning('请将标题长度控制在5-50个字以内，当前标题长度过短！');
            return false;
            // 标题是否过长
        }else if(this.state.title.length > 50){
            messageWarning('请将标题长度控制在5-50个字以内，当前标题长度过长！');
            return false;
        }else{
            return true;
        }
    }

    /*
     * 提交
     *   参数status 1表示提交到未审核  5表示到草稿箱
     * */
    submitBtn(status){

        // 判断是否满足提交条件
        if (!this.submitCheck()) return false;

        this.setState({submitBtnLoading:true});

        PublishApi.submitManuscript({
            title:this.state.title,
            column_id:this.state.columnKey,
            type:'guanli_video',
            content:'',
            thumb:'',
            video:this.state.videoUrl,
            tags:'keyword',
            status:status,
        }).then((data)=>{
            let result = data.data.result; //上传状态

            if (result==200){

                let that = this;

                setTimeout(function () {
                    messageSuccess('发布成功，请等待审核！');
                    // 将提交按钮取消loading状态
                    that.setState({submitBtnLoading:false},()=>{
                        setTimeout(function () {
                            that.props.routeGoToIndex(); //路由跳转至首页
                        },500)
                    });
                },1000);


            }else{
                let txt = '发布失败，错误码：' + isSuccess + '，请稍后再试！';
                messageError(txt);
                // 将提交按钮取消loading状态
                this.setState({submitBtnLoading:false});
            }
        })
    }

    // 视频服务器保存路径的回调
    videoServerUrl(url){
        console.log(77777,url);
        this.setState({videoUrl:url})
    }

    // 组件渲染前
    componentWillMount() {

    }

    render(){


        return (
           <div className="publishVideos">
               <div className="leftEdit">
                   {/*选择分类*/}
                   <div className="coverBox">
                       <p className="coverTitle">分类：</p>
                       <ColumnsSelect
                           size="small"
                           options={this.props.columnsArray} // 选项
                           default={this.props.columnsDefaultKey}  // 默认选项
                           onChange={this.columnsSelectChange.bind(this)}  //选中项改变触发
                       />
                   </div>

                   {/*标题输入框*/}
                   <div className="titleBox">
                       <p className="titleTitle">标题：</p>
                       <div className="title">
                           <Input size="large" placeholder="标题(5-50字)" className="titleInput" onChange={this.titleChange.bind(this)}/>
                       </div>
                   </div>

                   {/*视频上传*/}
                   <div className="videoUploadBox">
                       <ReactPlayer
                           url={this.state.videoUrl}// 视频播放地址
                           // url='https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'// 视频播放地址
                           playing={true} // 视频是否播放，true/false，默认false
                           loop={false}  // 视频是否能够循环播放，true/false，默认false
                           controls={true} // 是否显示控制菜单，true/false，默认false
                           volume={0.9} // Sets the volume of the appropriate player 默认0.8
                           playbackRate={1} // 播放速度，数字，默认1
                           width={'100%'} // 播放器宽度，默认640
                           height={'auto'}  // 播放器高度，默认360
                           style={{zIndex:999}} // Add inline styles to the root element
                           // className={styles.videoBox}
                           id="videoBox"
                       />
                       <VideoUpload
                           actionUrl={LayoutApi.uploadVideoUrl} //上传地址
                           nowVideoUrl={this.videoServerUrl.bind(this)}  // 服务器返回地址的回调
                           data={{"phone_system":'pc'}}
                       />
                   </div>



                   {/*/!*视频简介*!/*/}
                   {/*<div className="introductionBox">*/}
                       {/*<p className="titleTitle">视频简介：</p>*/}
                       {/*<div className="title">*/}
                           {/*<TextArea autosize={{ minRows: 6, maxRows: 10 }} style={{resize:'none'}} onChange={this.introductionChange.bind(this)} />*/}
                       {/*</div>*/}
                   {/*</div>*/}

                   {/*按钮操作组*/}
                   <div className="btns">
                       <Button onClick={this.submitBtn.bind(this,5)}>存草稿</Button>
                       {/*<Button type="dashed" style={{margin:'0px 25px'}}>预览</Button>*/}
                       <Button type="primary" icon="rocket" style={{margin:'0px 20px'}} onClick={this.submitBtn.bind(this,1)} loading={this.state.submitBtnLoading}>文章发布</Button>
                       {/*<Button >预览</Button>*/}
                   </div>
               </div>

               {/*手机效果预览*/}
               <div className="rightPreview">
                   <PhoneView
                       title={this.state.title}
                       videoUrl={this.state.videoUrl}
                       content={this.state.Introduction}
                       width={'262px'}
                       height={'467px'}
                       type={"videos"}
                   />
               </div>

           </div>
        )
    }
}