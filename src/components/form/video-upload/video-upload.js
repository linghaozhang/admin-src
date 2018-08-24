import React from 'react';
import { Button, Icon, Upload } from 'antd';



/*
* 视频上传组件
*
* @props
*
*   参数：actionUrl 说明：上传地址 类型：String
*   参数：nowVideoUrl(url) 说明：回调服务器保存地址的方法 类型：Function
*
*
* */

export default class VideoUpload extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            fileList:[],
            nowVideoUrl:'', //当前视频服务端返回的保存地址
        };
      }

    // 上传状态改变
    onChange(data){
        let fileList = data.fileList; // 文件列表
        let file = data.file; // 当前文件

        if(file.status == 'done'){
            console.log(9999,file);
            let videoServerUrl = file.response.data.url[0].address;  //服务器存储路径
            console.log(8888,videoServerUrl);
            this.setState({nowVideoUrl:videoServerUrl});
            this.props.nowVideoUrl(videoServerUrl);
        }

        fileList = fileList.slice(-1); // 只保留一个视频
        this.setState({ fileList:fileList });

    }

    render(){
        
        let data = this.props.data;
        console.log(66,data);
        return (
            <div style={{padding:'30px 0',border:'1px dashed #bbb',borderRadius:'5px'}}>
                <div style={{textAlign:'center'}}>
                    <Upload
                        action={this.props.actionUrl} // 上传地址
                        onChange={this.onChange.bind(this)}
                        fileList={this.state.fileList} // 已上传列表
                        data={data}
                    >
                        <Button type="" >
                            <Icon type="upload" /> 上传视频
                        </Button>
                    </Upload>
                    <p style={{marginTop:'15px',color:'#aaa'}}>支持主流视频格式，最大2G，较大视频请压缩之后上传</p>
                </div>
            </div>
        )
    }

}


