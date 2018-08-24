import React from 'react';
import PropTypes from 'prop-types';
import publishApi from '@api/publish';

import {messageSuccess,messageError,messageWarning} from '@fun/message'; // 全局提示
import GraphicNewsEdit from '@components/news-edit/graphic-news-edit'; // 编辑图文新闻UI组件

/*
* 内容管理-编辑新闻容器组件
*
* */
export default class EditNews extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            content_id:'', //新闻id
            title:'', //标题内容
            content:'', //富文本内容
            coverSelectsImageArray:['aaa.jpg','bbb.jpg'], // 封面图片待选列表
            coverSelectedImages:[], //当前选中的图片
            columnsArray:[], //分类栏目的待选
            columnsSelected:'', //分类栏目的当前选中项key
        };
      }

      //路由参数
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    componentWillMount() {

        // 取出参数 - ID
        let content_id = this.context.router.route.match.params.id;

        // 请求图文详情接口，获取图文新的的标题、内容、缩略图数据
        publishApi.getNewsContent({
            news_id:content_id,
            content_type:1,
        }).then((data)=>{
            let d = data.data.list;// 主要数据

            this.setState({
                content_id:content_id,
                title:d.title,
                content:d.content,
                coverSelectedImages:[d.thumb],
                columnsSelected:d.categoryid,
                
            });

        });
        
        // 获取栏目列表数据
        publishApi.getColumn({
            type:1,
        }).then((data)=>{
            let d = data.data.columns;
            console.log(666,d);
            this.setState({columnsArray:d});
        })


        
    }
    
    //标题变动的回调
    titleChange(txt){
          console.log(222);
       this.setState({title:txt});
    }

    // 富文本变动回调
    changeContent(txt){
        this.setState({content:txt})
    }

    // 更新封面选中图片数组的回调
    changeCoverImagesSelected(selectedArray){
        this.setState({coverSelectedImages:selectedArray})
    }

    //改变分类栏目相选中项的回调
    columnsSelectChange(key){
        this.setState({columnsSelected:key});
    }

    // 发布文章
    newSubmit(){
        publishApi.newsUpdate({
            content_id:this.state.content_id,
            title:this.state.title,
            column_id:this.state.columnsSelected,
            type:'wenzhang',
            content:this.state.content,
            thumb:this.state.coverSelectedImages[0],
            tags:'keyword',
            status:'1', // 这里表示是提交到待审核状态中
        }).then((data)=>{
            if (data.data.result == 200){
                let that= this;
                messageSuccess('文章发布成功，请等待管理员审核！');
                setTimeout(function () {
                    that.context.router.history.push('/admin/manage/content');
                },1500)
            }else{
                messageError(data.msg);
            }
        })
    }

    //保存到草稿箱
    newDraft(){
        publishApi.newsUpdate({
            content_id:this.state.content_id,
            title:this.state.title,
            column_id:this.state.columnsSelected,
            type:'wenzhang',
            content:this.state.content,
            thumb:this.state.coverSelectedImages[0],
            tags:'keyword',
            status:'2', // 这里表示是提交到草稿箱状态中
        }).then((data)=>{
            if (data.data.result == 200){
                let that= this;
                messageSuccess('已保存到草稿箱中！');
                setTimeout(function () {
                    that.context.router.history.push('/admin/manage/content');
                },1500)
            }else{
                messageError(data.msg);
            }
        })
    }


    render(){

        return (
            <div>
                <GraphicNewsEdit
                    title={this.state.title}  // 标题内容
                    titleChange={this.titleChange.bind(this)} //标题变动的回调
                    content={this.state.content} //富文本内容
                    changeContent={this.changeContent.bind(this)} //富文本变动
                    coverSelectsImageArray={this.state.coverSelectsImageArray} //封面图片待选列表
                    coverSelectedImagesArray={this.state.coverSelectedImages} // 当前选中的封面图片数组
                    changeCoverImagesSelectedArr={this.changeCoverImagesSelected.bind(this)} // 更新封面选中图片数组的回调
                    columnsArray={this.state.columnsArray} //分类栏目待选
                    columnsSelected={this.state.columnsSelected} //分类栏目的当前选中项
                    columnsSelectChange={this.columnsSelectChange.bind(this)} // 改变分类栏目相选中项的回调
                    newSubmit={this.newSubmit.bind(this)} // 发布按钮回调
                    newDraft={this.newDraft.bind(this)} // 保存到草稿箱按钮回调

                />
            </div>
        )
    }
}