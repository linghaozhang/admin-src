import React from 'react';
import './news-list.less';
import { Button,Tag,Modal } from 'antd';
import {messageSuccess,messageError,messageWarning} from '@fun/message'; // 全局提示

import NewsListItem from '@components/news-list/newsListItem';
import publishApi from '@api/publish';
import PhoneViewModal from '@components/phone-view/phone-view';
import EditNews from '@containers/manage/edit-news';


export default class NewsList extends React.Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataContent:[], // 数据列表
            phoneViewVisible:false, // 手机预览框可见状态

            phoneViewTitle:'', //手机预览标题
            phoneViewContent:'', //手机预览内容
            phoneViewImages:'', //手机预览缩略图
            phoneViewVideoUrl:'', //视频链接
            phoneViewNewsTypem:'', // 类型

        };
      }

    componentWillMount() {

       this.getData();

    }

    // 打开手机预览框
    phoneView(id,type) {

        // type 1是图文 2是视频 7是组图
        // 图文
        if (type == 1){

            publishApi.getNewsContent({
                news_id:id,
                content_type:1,
            }).then((data)=>{

                // 图文类需要的参数 内容类型news  title content thumb
                let d = data.data.list; // 主要数据

                this.setState({
                    phoneViewTitle:d.title,
                    phoneViewImages: [d.thumb],
                    phoneViewContent:d.content,
                    phoneViewNewsTypem:'news',
                },()=>{
                    this.setState({
                        phoneViewVisible:true,
                    })
                });

            });

        }else if (type == 2){
            // 视频

            publishApi.getVideoNewsContent({
                news_id:id,
                content_type:1,
                c_type:2,
            }).then((data)=>{
                
                console.log(777,data);
                // 图文类需要的参数 内容类型news  title content thumb
                let d = data.data; // 主要数据

                this.setState({
                    phoneViewTitle:d.title,
                    phoneViewImages: [d.thumb],
                    phoneViewContent:d.content,
                    phoneViewVideoUrl:d.video_url,
                    phoneViewNewsTypem:'videos',

                },()=>{
                    this.setState({
                        phoneViewVisible:true,
                    })
                });

            });

        }else if (type == 7){
            // 组图

            publishApi.getImageNewsContent({
                news_id:id,
                content_type:1,
            }).then((data)=>{

                // 图文类需要的参数 内容类型news  title content thumb
                let d = data.data; // 主要数据

                this.setState({
                    phoneViewTitle:d.title,
                    phoneViewImages: d.thumb,
                    phoneViewContent:[d.content],
                    phoneViewNewsTypem:'videos',
                },()=>{
                    this.setState({
                        phoneViewVisible:true,
                    })
                });

            });
        }


    }

    // 手机预览确定按钮
    phoneViewHandleOk(){
        this.setState({phoneViewVisible:false});
    }

    // 手机预览关闭按钮
    phoneViewHandleCancel(){
        this.setState({phoneViewVisible:false});
    }

    // 获取最新数据
    getData(){
        // 请求数据
        publishApi.getNews({
            status:this.props.status,
            page:0,
            count:100
        }).then((data)=>{
            this.setState({dataContent:data.data});
        })
    }

    render(){

          // 新闻类型 1->news 2->images 3->videos
        let newsType;

        let list = this.state.dataContent.map((item,index)=>{

        if (item.type==1) newsType='news';
        if (item.type==2) newsType='videos';
        if (item.type==3) newsType='images';
            

      return <NewsListItem
                  key={index}
                  content_id={item.content_id} // 新闻ID
                  statusNum={item.status} // 稿件状态编号
                  title={item.title} // 标题
                  time={item.time} // 时间
                  thumb={item.thumb} // 缩略图
                  news_id={item.news_id}
                  newstype={item.type} // 内容类型 //1 新闻 2 视频 3公告 4直播5、专题、6轮播 7、组图
                  newsDelete={this.getData.bind(this)}
                  phoneView={this.phoneView.bind(this)}
                  play_num={item.play_num}
                  newsType={newsType}
              />

      });


        return (
            <div className="manageNewsList">
                {list}
                <div>
                    <Modal
                        title="移动端效果预览"
                        visible={this.state.phoneViewVisible}
                        onOk={this.phoneViewHandleOk.bind(this)}
                        onCancel={this.phoneViewHandleCancel.bind(this)}
                        style={{top:'20px'}}
                        width="320px"
                    >
                        <PhoneViewModal
                            type={this.state.phoneViewNewsTypem}
                            images={this.state.phoneViewImages}
                            title={this.state.phoneViewTitle}
                            content={this.state.phoneViewContent}
                            videoUrl={this.state.phoneViewVideoUrl}
                        />
                    </Modal>
                </div>
            </div>
        )
    }
}