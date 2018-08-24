import React from 'react';
import './images-item.less';
import { Input, Button, Upload, Icon } from 'antd';
const { TextArea } = Input;

/*
* 图片文章描述组件
*
* @props
*
* 参数：rid 说明：唯一表示 类型：Number 默认值：无
* 参数：imagesUrl 说明：图片地址 类型：String 默认值：''
* 参数：txt 说明：文字描述 类型：String 默认值：''
* 参数：actionUrl 说明：服务器上传图片的请求地址 类型：String 默认值：无
* 参数：uploadData 说明：服务器上传参数 类型：Object 默认值：{}
* 参数：updateImages(rid,url) 说明：回调新图片信息方法 类型：Function 默认值：无
* 参数：updateTxt(rid,txt) 说明：回调新文字信息方法 类型：Function 默认值：无
* 参数：delete(rid) 说明：删除回调方法 类型：Function 默认值：无
*
*
* */

export default class ImagesItem extends React.Component{

    // 构造
      constructor(props) {
          super(props);
          // 初始状态
          this.state = {
              fileList: [], // 已上传列表
          }
      }

// 上传状态改变
    onChange(data){
        let fileList = data.fileList; // 文件列表
        let file = data.file; // 当前文件

        if(file.status == 'done'){
            let videoServerUrl = file.response.data.url[0].address;  //服务器存储路径
            this.props.updateImage(this.props.rid,videoServerUrl);
        }

        fileList = fileList.slice(-1); // 只保留一个视频
        this.setState({ fileList:fileList });

    };

      // 文字内容改变时
    textChange(e){
        this.props.updateTxt(this.props.rid,e.target.value);
    }

    // 删除当前项
    delete(){
        this.props.delete(this.props.rid);
    }

    render(){
        
        // 处理图片地址
        let imageUrl = this.props.imagesUrl == '' ? <p style={{textAlign:'center',border:'1px dotted #ddd'}}><Icon type="picture" style={{fontSize:'96px',color:'#eee'}} /></p> : <img src={this.props.imagesUrl} alt=""/>;

        return (
            <div className="imagesItemComponent">
                <div className="imageBox">
                    {imageUrl}
                </div>
                <div className="inputBox">
                        <TextArea
                        rows={5}
                        style={{resize:'none'}}
                        placeholder="请输入描述文字..."
                        value={this.props.txt}
                        onChange={this.textChange.bind(this)}
                    />
                </div>
                <div className="btnsBox">
                    <Upload
                        onChange={this.onChange.bind(this)}
                        action={this.props.actionUrl} // 上传地址
                        fileList={this.state.fileList} // 已上传列表
                        data={this.props.uploadData}
                        showUploadList={false}
                    >
                        <Button type="primary" size="small" icon="upload" style={{marginTop:'20px'}}>上传图片</Button>
                    </Upload>
                    <Button type="danger" icon="delete" size="small" style={{margin:'10px 0 0'}}
                        onClick={this.delete.bind(this)}
                    >删除</Button>
                </div>
            </div>
        )
    }
}

// 默认props
ImagesItem.defaultProps = {
    imagesUrl:'',
    txt:'',
    uploadData:{},
};