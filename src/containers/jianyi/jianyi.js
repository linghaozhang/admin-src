import React from 'react';
import Api from '@api/tourongApi';
import { Tabs,Table } from 'antd';
const TabPane = Tabs.TabPane;
import PropTypes from 'prop-types';


export default class JianYi extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data:[], //全部数据
        };
      }
    //路由参数
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    
    //更新数据
    updateData(){
        Api.getAllFeedback({}).then((data)=>{
            console.log(data);
            let list = [];
            data.data.map((item,index)=>{
                list.push({
                    key:index,
                    id:item.id,
                    title:item.title,
                    content:item.content,
                    userId:item.userId,
                    userName:item.userName,
                })
            });

            this.setState({data:list});

        })
    }

    //表格头部
    columns = [{
        title: '提交人',
        key: 'userName',
        width:'60px',
        render: (text, record) => {
            return (
                <span>
                    <a href="javascript:;" onClick={this.goToInfoView.bind(this,text.userId)}>{text.userName}</a>
                </span>
            )
        }
    }, {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
    },{
        title: '内容',
        dataIndex: 'content',
        key: 'content',
    }
    // , {
    //     title: 'Action',
    //     key: 'action',
    //     width:'110px',
    //     render: (text, record) => {
    //
    //         return (
    //             <span>
    //                 {/*<span className="ant-divider" />*/}
    //                 <a href="javascript:;" onClick={this.delete.bind(this,text.id)}>删除</a>
    //                 <span className="ant-divider" />
    //                 <a href="javascript:;" onClick={this.gotoView.bind(this,text.id)}>查看信息</a>
    //             </span>
    //         )
    //     },
    // }
    ];


    componentWillMount() {
        this.updateData(); //加载数据
    }

    // 进入个人详情页面
    goToInfoView(id){
        this.context.router.history.push('/admin/user/audit/'+id); // 带参数跳转路由
    }


    render(){
        return (
            <div>
                <Table columns={this.columns} dataSource={this.state.data} />
            </div>
        )
    }
}