import React from 'react';
import { Popconfirm, message } from 'antd';
import {getData} from '@fun/xdfun'; // 公共函数
import {messageSuccess,messageError,messageWarning} from '@fun/message'; // 全局提示
import './newsListItem.less';
import publishApi from '@api/publish';
import EditNews from '@containers/manage/edit-news';
import PropTypes from 'prop-types';

/*
* 此组件为新闻列表项
*
* */
export default class NewsListItem extends React.Component{

    // 删除新闻
    newsDelete(content_id){

        publishApi.newsDelete({
            content_id:content_id,
            type:'gaojian',
            status:1,
        }).then((data)=>{
            if (data.data.status==200){
                messageSuccess('文章已删除成功');
                this.props.newsDelete();
            }else{
                messageWarning('文章删除失败，请稍后再试');
            }
        })

    }

    // 撤回发布
    withdraw(content_id){
        publishApi.newsDelete({
            content_id:content_id,
            type:'gaojian',
            status:2,
        }).then((data)=>{
            if (data.data.status==200){
                messageSuccess('文章已撤回成功');
                this.props.newsDelete();
            }else{
                messageWarning('文章撤回失败，请稍后再试');
            }
        })
    }

    // 手机预览
    checkOnPhone(id,type){
        this.props.phoneView(id,type);
    }

    // 进入图文新闻编辑页面
    goToEditGraphicNews(content_id,newsType){

        // 图文类型
        if(newsType==1){
            this.context.router.history.push("/admin/manage/content/edit/"+content_id); // 带参数跳转路由
        }

    }

    // router
    static contextTypes = {
        router: PropTypes.object.isRequired
    };


    render(){

        // 处理发布时间
        let time = getData(this.props.time,1);
        let gxContent;// 稿件信息区分
        let gxBtns;// 稿件按钮区分

        // 处理新闻类型
        let newsType;
        if(this.props.newstype==1) newsType = '图文类型';
        if(this.props.newstype==2) newsType = '视频类型';
        if(this.props.newstype==7) newsType = '组图类型';

        // 处理新闻审核状态文字
        let statusNumString;
        if (this.props.statusNum==1) statusNumString = '审核中';
        if (this.props.statusNum==2) statusNumString = '已撤回';
        if (this.props.statusNum==4) statusNumString = '已发布';
        if (this.props.statusNum==5) statusNumString = '草稿';

        // statusNum 稿件状态 1审核中 2回收站 4已发布 5草稿
        let statusNum = this.props.statusNum;
        if (statusNum==1){
            // 【1审核中】
            // 信息栏
            gxContent = (
                <div className="txtBox">
                    <div>
                        <p>发布时间：{time}</p>

                    </div>
                    <div>
                        <p>审核状态：{statusNumString}</p>

                    </div>
                    <div>
                        <p></p>

                    </div>
                </div>
            )

            // 操作按钮
            gxBtns = (
                <div className="btnsBox">
                    <Popconfirm
                        title="撤回后内容将无法被其他用户看到，确定撤回吗？"
                        onCancel={this.withdraw.bind(this,this.props.content_id)}
                        okText="取消"
                        cancelText="确定撤回"
                    >
                        <span>撤回发布</span>
                    </Popconfirm>

                </div>
            )
        }else if (statusNum==2){
            // 【2回收站】
            // 信息栏
            gxContent = (
                <div className="txtBox">
                    <div>
                        <p>发布时间：{time}</p>
                        <p>评论量：等待后端返回数据</p>

                    </div>
                    <div>
                        <p>审核状态：{statusNumString}</p>
                        <p>收藏量：等待后端返回数据</p>

                    </div>
                    <div>
                        <p>阅读量：{this.props.play_num}</p>
                    </div>
                </div>
            );

            // 操作按钮
            gxBtns = (
                <div className="btnsBox">
                    <span onClick={this.goToEditGraphicNews.bind(this,this.props.content_id,this.props.newstype)}>再次编辑</span>
                    <Popconfirm
                        title="撤回后内容将无法被其他用户看到，确定撤回吗？"
                        onCancel={this.withdraw.bind(this,this.props.content_id)}
                        okText="取消"
                        cancelText="确定撤回"
                    >
                        <span>撤回发布</span>
                    </Popconfirm>
                </div>
            )
        }else if (statusNum==4){
            // 【4已发布】
            // 信息栏
            gxContent = (
                <div className="txtBox">
                    <div>
                        <p>发布时间：{time}</p>
                        <p>评论量：等待后端返回数据</p>

                    </div>
                    <div>
                        <p>审核状态：{statusNumString}</p>
                        <p>收藏量：等待后端返回数据</p>
                    </div>
                    <div>
                        <p>阅读量：{this.props.play_num}</p>
                    </div>
                </div>
            );

            // 操作按钮
            gxBtns = (
                <div className="btnsBox">
                    <Popconfirm
                        title="撤回后内容将无法被其他用户看到，确定撤回吗？"
                        onCancel={this.withdraw.bind(this,this.props.content_id)}
                        okText="取消"
                        cancelText="确定撤回"
                    >
                        <span>撤回发布</span>
                    </Popconfirm>

                    <Popconfirm
                        title="删除后内容将无法恢复，确定删除吗？"
                        onCancel={this.newsDelete.bind(this,this.props.content_id)}
                        okText="取消"
                        cancelText="确定删除"
                    >
                        <span>删除内容</span>
                    </Popconfirm>
                </div>
            )
        }else if(statusNum==5){
            //【5草稿】
            // 信息栏
            gxContent = (
                <div className="txtBox">
                    <div>
                        <p>发布时间：{time}</p>

                    </div>
                    <div>
                        <p>审核状态：{statusNumString}</p>

                    </div>
                    <div>
                        <p>阅读量：{this.props.play_num}</p>
                    </div>
                </div>
            );

            // 操作按钮
            gxBtns = (
                <div className="btnsBox">
                    <span onClick={this.goToEditGraphicNews.bind(this,this.props.content_id,this.props.newstype)}>再次编辑</span>
                    <Popconfirm
                        title="删除后内容将无法恢复，确定删除吗？"
                        onCancel={this.newsDelete.bind(this,this.props.content_id)}
                        okText="取消"
                        cancelText="确定删除"
                    >
                        <span>删除内容</span>
                    </Popconfirm>
                </div>
            )
        }



        return(

            <div className="newsListItem">
                <div className="content">
                    <p className="title">
                        <span className="tab">{newsType}</span>
                        <span className="newsName" onClick={this.checkOnPhone.bind(this,this.props.content_id,this.props.newstype)}>{this.props.title}</span>
                    </p>
                    {gxContent}
                    {gxBtns}
                </div>
                <div className="imageBox">
                    <img src={this.props.thumb} alt="" onClick={this.checkOnPhone.bind(this,this.props.content_id,this.props.newstype)}/>
                </div>

            </div>
        )
    }
}