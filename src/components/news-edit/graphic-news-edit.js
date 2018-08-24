import React from 'react';
import './graphic-news-edit.less';// 内部样式

import { Input, Radio, Icon, Select, Button, Modal } from 'antd';
import ReactLzEditor from 'react-lz-editor';
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
* 图文类新闻编辑组件
*
*   @props title,【内容标题】，string，默认''
*   @props titleChange(txt),【改变标题】的回调,参数为标题内容，function，默认function(){}
*   @props content,【富文本内容】，string，默认''
*   @props changeContent(txt),【改变富文本】内容的回调,参数为内容html，function,默认function(){}
*   @props coverSelectsImageArray，【封面图片待选】列表，Array,默认[]
*   @props changeCoverImagesSelectedArr(),【更新封面】选中图片的回调,function，默认function(){}
*   @props columnsArray,【栏目分类】的备选数组，Array,默认：[]
*   @props columnsSelected,【栏目分类当前选中】项，string,默认''
*   @props changeColumnsSelect(),【改变栏目】当前选中项回调，function,默认：function(){}
*   @props newSubmit() ,【发布按钮】，function,默认function(){}
*
*
* */

export default class GraphicNewsEdit extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            coverMaxImagesNumber:1, // 封面最大图片数量
            submitBtnLoading:false,  // 提交按钮loading状态
            draftBtnLoading:false,  // 草稿箱按钮loading状态
        };
      }
    
    //标题改变时
    titleChange(e){
          console.log(1111);
        this.props.titleChange(e.target.value);
    }
    
    //富文本改变时
    changeContent(txt){
        this.props.changeContent(txt);
    }

    // 封面张数改变时
    coverRadioChange(e){
        this.setState({coverMaxImagesNumber:e.target.value});
    }

    // 更新选中的图片列表
    changeCoverSelectedArray(selectedArray){
        this.props.changeCoverImagesSelectedArr(selectedArray);
    }
    
    // 栏目分类选中项改变回调
    columnsSelectChange(key){
        this.props.changeColumnsSelect(key);
    }

    // 发布的回调
    newSubmit(){
        this.setState({submitBtnLoading:true});
        this.props.newSubmit();
    }

    // 保存到草稿箱的回调
    newDraft(){
        this.setState({draftBtnLoading:true});
        this.props.newDraft();
    }
    
    // 切换栏目
    columnsSelectChange(key){
        this.props.columnsSelectChange(key);
    }
    
    render(){

        if (this.props.content=='') return false; // 如果本内容为空，则停止本次渲染

        // 处理栏目选择框数据
        let columnList = this.props.columnsArray.map((item,index)=>{
            return <Select.Option value={item.column_id} key={index}>{item.column_name}</Select.Option>
        });

        return (
            <div>
                <div className="publishNews">
                    <div className="leftEdit">
                        {/*标题输入框*/}
                        <Input
                            size="large"
                            placeholder="请输入标题(5-50字)"
                            className="titleInput"
                            value={this.props.title}
                            onChange={this.titleChange.bind(this)}
                        />

                        {/*/!*文章富文本编辑器*!/*/}
                        <ReactLzEditor
                            importContent={this.props.content} // 内容
                            cbReceiver={this.changeContent.bind(this)}  //内容改变后触发，参数为内容
                            color={false} // 颜色选择菜单
                            pasteNoStyle={false} // 文本粘贴功能
                            blockStyle={false} // 段落样式设置功能
                            urls={false}  //添加删除链接功能
                            fullScreen={false}  //全屏
                            image={true}
                            convertFormat={'html'}
                            video={false}
                            audio={false}

                            // uploadProps={{
                            //     // action: this.props.action, //上传地址
                            //     // onChange: this.onChange.bind(this),  // 文件状态改变时
                            //     // onPreview:this.onPreview.bind(this), // 点击文件链接或预览图标时的回调
                            //     // defaultFileList:[],
                            //     listType: 'picture',
                            //     // fileList: this.state.fileList,
                            //     data: this.props.parameter,
                            //     multiple: false,
                            //     beforeUpload: this.beforeUpload,
                            //     showUploadList: true,
                            // }}
                        />

                        {/*/!*封面选取*!/*/}
                        <div className="coverBox">
                            <p className="coverTitle">封面：</p>

                            <RadioGroup
                                defaultValue={1}
                                onChange={this.coverRadioChange.bind(this)}
                            >
                                <RadioButton value={0}>无图</RadioButton>
                                <RadioButton value={1}>单图</RadioButton>
                            </RadioGroup>
                        </div>
                        <div className="SelectImagesBox">
                            <SelectImagesBox
                                selectImagesNumber={this.state.coverMaxImagesNumber}  // 选择图片的最大值
                                selectImagesUrlList={this.props.coverSelectsImageArray}  //图片库图片地址列表
                                nowSelectImagesArray={this.props.coverSelectedImagesArray} // 当前选中的图片地址
                                changeNowSelectedArray={this.changeCoverSelectedArray.bind(this)}  // 更新当前选中图片列表的函数
                            />
                        </div>

                        {/*/!*选择分类*!/*/}
                        <div className="coverBox">
                            <p className="coverTitle">分类：</p>
                            <Select value={this.props.columnsSelected} style={{ width: 120 }} onChange={this.columnsSelectChange.bind(this)}>
                                {columnList}
                            </Select>
                        </div>

                        {/*/!*按钮操作组*!/*/}
                        <div className="btns">
                            <Button
                                onClick={this.newDraft.bind(this)}
                                loading={this.state.draftBtnLoading}
                            >
                                存草稿
                            </Button>


                            {/*<Button type="dashed" style={{margin:'0px 25px'}}>预览</Button>*/}
                            <Button
                                type="primary"
                                icon="rocket"
                                style={{margin:'0px 20px'}}
                                onClick={this.newSubmit.bind(this)}
                                loading={this.state.submitBtnLoading}
                            >
                                发布
                            </Button>
                            {/*<Button >预览</Button>*/}
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

/*
* 默认props
* */
GraphicNewsEdit.defaultProps = {
    title:'', // 内容标题
    titleChange:function () {console.log('错误：GraphicNewsEdit组件没有接收到titleChange()参数，请检查代码。');}, // 标题改变的回调
    content:'', //富文本内容
    changeContent:function () {console.log('错误：GraphicNewsEdit组件没有接收到changeContent()参数，请检查代码。');}, // 富文本内容改变的回调
    coverSelectsImageArray:[], //封面图片待选列表
    changeCoverImagesSelectedArr:function () {console.log('错误：GraphicNewsEdit组件没有接收到changeCoverImagesSelectedArr()参数，请检查代码。')}, // 更新封面选中图片的回调
    columnsArray:[], // 栏目列表的备选数组
    columnsSelected:'', //栏目分类选中项
    changeColumnsSelect:function () {},  //切换栏目选中项切换回调
    newSubmit:function () {console.log('错误：GraphicNewsEdit组件没有接收到newSubmit()参数，请检查代码。');}
};


