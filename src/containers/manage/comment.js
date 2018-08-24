import React from 'react';
import { Table, Icon, Switch } from 'antd';
import publishApi from '@api/publish';
import {getData} from '@fun/xdfun';
import {messageSuccess,messageError,messageWarning} from '@fun/message'; // 全局提示

/*
*  表单头部
* */


/*
* 评论管理首页组件
* */
export default class CommentManage extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data:[
                // {
                    // key: '1',
                    // title: 'John Brown',
                    // newCommentTime: '2017-02-29',
                    // commentNumber: 32,
                // },
            ]
        };
      }

    columns = [{
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: text => <a href="#">{text}</a>,
    }, {
        title: '最新评论时间',
        dataIndex: 'newCommentTime',
        key: 'newCommentTime',
    }, {
        title: '总评论数',
        dataIndex: 'commentNumber',
        key: 'commentNumber',
    }, {
        title: '操作',
        key: 'action',
        render: (text, record) => {

            let isComment = record.ispinglun == 1 ? true : false;

            return (
                <span>
                  <a href="#">查看</a>
                  <span className="ant-divider" />
                  <Switch defaultChecked={isComment} size="small" onChange={this.changeCommentSwitch.bind(this,record)} />
                </span>
            )
        },
    }];


    componentWillMount() {

        /*
        * 请求已发布的新闻列表数据，更新state->data,渲染视图
        * */
        publishApi.getNews({
            status:4,
            page:0,
            count:50,
        }).then((data)=>{
            let d = data.data;
            let newData = [];

            d.map((item,index)=>{
                console.log(777,item);
                // 处理时间
                let time;
                if(item.comment_latesttime == '') {
                    time = '-';
                }else{
                    time = getData(item.comment_latesttime,1)
                }

                let line = {
                    key:index,
                    title: item.title,
                    newCommentTime:time,
                    commentNumber: item.comment_num,
                    content_id:item.content_id,
                    ispinglun:item.ispinglun,

                };
                newData.push(line);

            });

            this.setState({data:newData});
        })
    }

    // 切换评论开关按钮
    changeCommentSwitch(record,isOpen){
        
        // 如果开启评论
       if (isOpen){
           publishApi.controlComment({
               content_id:record.content_id,
               allow_comment:1,
           }).then((data)=>{
               if (data.code == 0){
                   messageSuccess('评论已开启');
               }
           })
       }else{
           publishApi.controlComment({
               content_id:record.content_id,
               allow_comment:2,
           }).then((data)=>{
               if (data.code == 0){
                   messageSuccess('评论已关闭');
               }
           })
       }
       
    }

    render(){
        return (
            <div>
                <Table columns={this.columns} dataSource={this.state.data} />
            </div>
        )
    }
}