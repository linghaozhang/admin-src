import React from 'react';
import './phone-view.less';

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import PhoneViewNews from './phone-view-news'; // 图文新闻详情页
import PhoneViewNewslist from './phone-view-news-list'; // 图文新闻列表
import PhoneViewVideos from './phone-view-videos'; // 视频新闻详情页
import PhoneViewVideoList from './phone-view-videos-list'; // 视频新闻列表页
import PhoneViewImages from './phone-view-images'; // 视频新闻详情页
import PhoneViewImagesList from './phone-view-images-list'; // 图片新闻列表页

/*
* 手机预览
*
*   @par type,预览类型，news/videos/images
*
*   @type=news
*       @par title,标题
*       @par content，内容
*       @par images，缩略图
*       @par width，宽度
*       @par height，高度
*
*
* */
export default class PhoneView extends React.Component{
    
    // 组图tab被点击
    imagesTabClick(){
        console.log(2222);
    }

    render(){
        
        

            // 图文类型
            if(this.props.type=='news'){
                return (
                    <div className="phoneView" style={{
                        width:this.props.width,
                        height:this.props.height,
                    }}>
                        <Tabs defaultActiveKey="1" style={{  margin:'0 auto',height:'100%'}}>
                            <TabPane tab="详情" key="1" >
                                <PhoneViewNews {...this.props} />
                            </TabPane>
                            <TabPane tab="信息流" key="2" >
                                <PhoneViewNewslist {...this.props} />
                            </TabPane>
                        </Tabs>
                    </div>
                )

                // 组图类型
            }else if (this.props.type == 'images'){
                return (
                    <div className="phoneView" style={{
                        width:this.props.width,
                        height:this.props.height,
                    }}>
                        <Tabs 
                            defaultActiveKey="2"
                            style={{  margin:'0 auto',height:'100%'}}
                            onTabClick={this.imagesTabClick.bind(this)}
                        >
                            <TabPane tab="详情" key="1" disabled >
                                <PhoneViewImages {...this.props} />
                            </TabPane>
                            <TabPane tab="信息流" key="2" >
                                <PhoneViewImagesList {...this.props} />
                            </TabPane>
                        </Tabs>
                    </div>
                )

                // 视频类型
            }else if (this.props.type == 'videos'){
                return (
                    <div className="phoneView" style={{
                        width:this.props.width,
                        height:this.props.height,
                    }}>
                        <Tabs defaultActiveKey="1" style={{  margin:'0 auto',height:'100%'}}>
                            <TabPane tab="详情" key="1" >
                                <PhoneViewVideos {...this.props} />
                            </TabPane>
                            <TabPane tab="信息流" key="2" >
                                <PhoneViewVideoList {...this.props} />
                            </TabPane>
                        </Tabs>
                    </div>
                )
            }else{
                return (
                    <div></div>
                )
            }
        


    }
}

PhoneView.defaultProps = {
    type:'news',  // 类型，news/iamges/videos/
    width:'262px', // 手机模拟的宽度值
    height:'467px', // 手机模拟的高度值
};