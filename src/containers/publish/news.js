import React from 'react';
import './news.less';

import { Input, Radio, Icon, Select, Button, Modal } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import {messageSuccess,messageError,messageWarning} from '@fun/message'; // 全局提示

import TextEditor from '@components/form/text-editor'; // 富文本编辑器
import SelectImagesBox from '@components/select-images-box/select-images-box';  //图片选择器
import ColumnsSelect from '@components/form/columns-select'; // 分类选择
import PhoneView from '@components/phone-view/phone-view';

import PublishApi from '@api/publish';
import LayoutApi from '@api/layout';

/*
* @props
*
*   参数：columnsArray 说明：选项列表 类型：Array
*   参数：columnsDefaultKey 说明：默认选中项 类型：String
*
* */

export default class News extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            // 标题相关
            title:'', // 当前输入的标题内容
            
            // 选择封面相关
            coverNowSelected:0,  // 封面类型当前选中的值
            selectImagesNumber:0, // 封面最大选择图片数量
            selectImagesUrlList: [],  // 图片库图片地址列表
            nowSelectImagesArray:[], // 当前选中的图片地址

            //新闻内容相关
            content:'', // 当前内容

            // 栏目相关(分类)
            classificationSelectedKey:null, // 当前选中的栏目key
            classificationSelected:'', // 当前选中的栏目文字

            // 按钮组相关
            submitBtnLoading:false, //提交按钮loading状态

        };
      }

    // 封面-切换图片数量时
    radioChange(e){
        let nowSelected = e.target.value; // 当前选中的
        this.setState({
            coverNowSelected:nowSelected,
            selectImagesNumber:nowSelected,
            nowSelectImagesArray:[],
        })
    }

    // 封面-更新当前选中图片的函数
    changeNowSelectedArray(selectedArray){
        this.setState({nowSelectImagesArray:selectedArray})
    }

    // 分类-选中项变化时
    columnsSelectChange(key,name){
        console.log(key, name);
        this.setState({
            classificationSelectedKey:key,
            classificationSelected:name,
        });
    }

    // 内容-内容(富文本)改变时
    changesContent(content){
        
        // 接受新的内容content，将其保存至state
        this.setState({content:content});

        /*
        * 匹配到内容中的所有图片，把图片保存到state的封面待选数组中
        * */
        //匹配图片（g表示匹配所有结果i表示区分大小写）
        var imgReg = /<img.*?(?:>|\/>)/gi;
        //匹配src属性
        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        var imgList = content.match(imgReg);
        let imgUrlArray = [];

        if (imgList==null) return false;

        for(var i = 0; i < imgList.length; i++) {
            var src = imgList[i].match(srcReg);
            //获取图片地址
            if(src[1]) {
                imgUrlArray.push(src[1]);
            }
        }

        this.setState({selectImagesUrlList:imgUrlArray});



    }

    /*
    * 文章发布 提交
    *   参数 status 为1时是提交至未审核状态，为5时是提交到草稿箱
    * */
    submitBtn(status){

        // 判断是否符合提交条件
        if(!this.submitCheck()) return false;

        // 将提交按钮设置为loading状态
        this.setState({submitBtnLoading:true});

        //由于现在后台接收缩略图只能接收一张，字符串类型，因此这里将数组中的第一个取出来传参
        let thumb = this.state.nowSelectImagesArray[0];

        PublishApi.submitManuscript({
            title:this.state.title,
            column_id:this.state.classificationSelectedKey,
            type:'wenzhang',
            content:this.state.content,
            thumb:thumb,
            tags:'keyword',
            status:status,
        }).then((data)=>{
            let isSuccess = data.data.result;//获取发布状态

            if (isSuccess==200){

                let that = this;
                let txt = status == 1 ? '文章发布成功，请等待审核！' : '已存入草稿箱' ; // 根据提交位置显示提示文字

                setTimeout(function () {
                    messageSuccess(txt);
                    // 将提交按钮取消loading状态
                    that.setState({submitBtnLoading:false},()=>{
                        setTimeout(function () {
                            that.props.routeGoToIndex(); //路由跳转至首页
                        },500)
                    });
                },1000);


            }else{
                let txt = '文章发布失败，错误码：' + isSuccess + '，请稍后再试！';
                messageError(txt);
                // 将提交按钮取消loading状态
                this.setState({submitBtnLoading:false});
            }

        })
    }

    // 标题-改变时
    titleChange(e){
        let title = e.target.value;
        this.setState({title:title});
    }


    // 打开手机预览
    openPhonemodal(){
        this.setState({modulevisible:true})
    }

    // 判断当前是否符合提交要求，符合返回true，不符合返回false
    submitCheck(){
        // 标题是否过短
        if (this.state.title.length < 5){
            messageWarning('请将标题长度控制在5-50个字以内，当前标题长度过短！');
            return false;
            // 标题是否过长
        }else if(this.state.title.length > 50){
            messageWarning('请将标题长度控制在5-50个字以内，当前标题长度过长！');
            return false;
            // 判断内容是否为空
        }else if (this.state.content == ''){
            messageWarning('正文内容不能为空，请编辑后重新提交！');
            return false;
        }else{
            return true;
        }
    }

    render(){

        return (
            <div className="publishNews">
                <div className="leftEdit">
                    {/*标题输入框*/}
                    <Input size="large" placeholder="请输入标题(5-50字)" className="titleInput" onChange={this.titleChange.bind(this)}/>
                    {/*文章富文本编辑器*/}
                    <TextEditor
                        changesContent={this.changesContent.bind(this)}  // 改变内容富文本触发
                        parameter={{type:'Manuscript',}} // 请求所带参数
                        action={LayoutApi.uploadImageUrl} // 请求地址

                    />
                    {/*封面选取*/}
                    <div className="coverBox">
                        <p className="coverTitle">封面：</p>

                        <RadioGroup
                            defaultValue="a"
                            onChange={this.radioChange.bind(this)}
                            value={this.state.coverNowSelected}
                        >
                            <RadioButton value={0}>无图</RadioButton>
                            <RadioButton value={1}>单图</RadioButton>
                            {/*<RadioButton value={3} disabled={true}>三图</RadioButton>*/}
                        </RadioGroup>
                    </div>
                    <div className="SelectImagesBox">
                        <SelectImagesBox
                            selectImagesNumber={this.state.selectImagesNumber}  // 选择图片的最大值
                            selectImagesUrlList={this.state.selectImagesUrlList}  //图片库图片地址列表
                            nowSelectImagesArray={this.state.nowSelectImagesArray} // 当前选中的图片地址
                            changeNowSelectedArray={this.changeNowSelectedArray.bind(this)}  // 更新当前选中图片列表的函数
                        />
                    </div>
                    {/*选择分类*/}
                    <div className="coverBox">
                        <p className="coverTitle">分类：</p>
                        <ColumnsSelect
                            options={this.props.columnsArray} // 选项
                            default={this.props.columnsDefaultKey}  // 默认选项
                            onChange={this.columnsSelectChange.bind(this)}  //选中项改变触发
                        />
                    </div>
                    {/*按钮操作组*/}
                    <div className="btns">
                        <Button onClick={this.submitBtn.bind(this,5)}>存草稿</Button>
                        {/*<Button type="dashed" style={{margin:'0px 25px'}}>预览</Button>*/}
                        <Button type="primary" icon="rocket" style={{margin:'0px 20px'}} onClick={this.submitBtn.bind(this,1)} loading={this.state.submitBtnLoading}>文章发布</Button>
                        <Button onClick={this.openPhonemodal.bind(this)}>预览</Button>
                    </div>
                </div>

                {/*手机效果预览*/}
                <div className="rightPreview">
                    <PhoneView
                        title={this.state.title}
                        content={this.state.content}
                        images={this.state.nowSelectImagesArray}
                        width={'262px'}
                        height={'467px'}
                        type={"news"}
                    />
                </div>

            </div>
        )
    }
}

