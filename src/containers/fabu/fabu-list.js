import React from 'react';
import PropTypes from 'prop-types';
import Api from '@api/tourongApi';
import { Tabs,Table } from 'antd';
import {messageSuccess,messageError,messageWarning} from '@fun/message'; // 全局提示
const TabPane = Tabs.TabPane;

export default class FaBuList extends React.Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            allData:[{

            }],
        };
    }

    //路由参数
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width:'60px',
    },{
        title: '发布人',
        key: 'userName',
        width:'60px',
        render:(text, record) => {
            return (
                <span>
                    <a href="javascript:;" onClick={this.goToInfoView.bind(this,text.userName)}>{text.userName}</a>
                </span>
            )
        }
    }, {
        title: '主要内容',
        dataIndex: 'txt',
        key: 'txt',
    }, {
        title: 'Action',
        key: 'action',
        width:'110px',
        render: (text, record) => {

            return (
                <span>
                    {/*<span className="ant-divider" />*/}
                    <a href="javascript:;" onClick={this.delete.bind(this,text.id)}>删除</a>
                    <span className="ant-divider" />
                    <a href="javascript:;" onClick={this.gotoView.bind(this,text.id)}>查看信息</a>
                </span>
            )
        },
    }];


    componentWillMount() {
        this.updateData();
    }

    //获取更新数据
    updateData(){
        // 获取所有对接信息
        Api.getAllDocking({

        }).then((data)=>{

            let d = data.data;

            console.log(123,d);

            let list = [];

            d.map((item,index)=>{
                list.unshift({
                    userName:item.userId,
                    txt:item.txt,
                    key:index,
                    id:item.id,
                })
            });

            this.setState({allData:list});


        })
    }

    // 进入详情页
    gotoView(id){
        this.context.router.history.push('/admin/fabu/fabu-content/'+id); // 带参数跳转路由
    }

    // 进入个人详情页面
    goToInfoView(id){
        this.context.router.history.push('/admin/user/audit/'+id); // 带参数跳转路由
    }

    //删除
    delete(id){
        Api.deleteButtJoin({
            id:id,
        }).then((data)=>{
            if(data.status == 0){
                messageSuccess('删除成功');
                this.updateData();//更新数据
            }else{
                messageError(data.msg);
            }
        })
    }

    render(){

        // 解析数据成

        return (
            <div>
                <Table columns={this.columns} dataSource={this.state.allData} />
            </div>
        )
    }
}
