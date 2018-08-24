import React from 'react';
import ReactLzEditor from 'react-lz-editor';

/*
* 基于react-lz-editor的富文本编辑器
*
* @props
*
*   changeContent() 当编辑器的内容发生变化时，将回调父组件的此函数  Fun
*   parameter 向后台请求时所带的参数，Object
*   action 后台请求地址，String
*
* */
export default class TextEditor extends React.Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            fileList:[], // 上传文件列表
        };
      }

    //内容变化时
    changeContent(content){
        this.props.changesContent(content); // 调用父组件
    }

    // 当文件状态改变时
    onChange(data){
        let fileList = data.fileList;

        fileList = fileList.map((file,index) => {
            if (file.response) {
                file.url = file.response.data.url[0].address;
            }
            file.key = index;
            return file;
        });

        this.setState({fileList:fileList});

    }

    beforeUpload(){

    }

    // 点击文件链接或预览图标时的回调
    onPreview(){
        console.log(7778898999);
    }

    render(){
        return (
            <ReactLzEditor
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

                uploadProps={{
                    action: this.props.action, //上传地址
                    onChange: this.onChange.bind(this),  // 文件状态改变时
                    onPreview:this.onPreview.bind(this), // 点击文件链接或预览图标时的回调
                    defaultFileList:[],
                    listType: 'picture',
                    fileList: this.state.fileList,
                    data: this.props.parameter,
                    multiple: false,
                    beforeUpload: this.beforeUpload,
                    showUploadList: true,
                }}

            />
        )
    }
}

// 默认参数
TextEditor.defaultProps = {
    changeContent:function () {}, //内容改变时
};