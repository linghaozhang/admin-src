import React from 'react';
import { Table, Icon } from 'antd';
import Api from '@api/tourongApi';
import PropTypes from 'prop-types';


export default class AllUserList extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data:[{

            }],
        };
      }

    //路由参数
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

  //表格头部
    columns = [{
        title: 'ID',
        dataIndex: 'userId',
        key: 'userId',
    },{
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '机构名称',
        dataIndex: 'orgName',
        key: 'orgName',
    }, {
        title: '部门',
        dataIndex: 'department',
        key: 'department',
    },{
        title: '职位',
        dataIndex: 'position',
        key: 'position',
    }, {
        title: '操作',
        key: 'action',
        render: (text, record) => {

            return (
                <span>
                    <a href="javascript:;" onClick={this.gotoView.bind(this,text.userId)}>查看信息</a>
                </span>
            )
        },
    }];


    componentWillMount() {

        // 获取所有用户，筛选出还未审核的用户
        Api.getAllUser({
            
        }).then((data)=>{
            console.log(111222,data);

            let d = data.data;
            let newData = [];

            for (let i=0;i<d.length;i++){
                let obj = d[i];

                if (obj.review == 0){
                    let o = {
                        key:i,
                        name:obj.name,
                        orgName:obj.orgName, //机构名称
                        department:obj.department, //部门
                        position:obj.position, //职位
                        userId:obj.id,
                    };

                    newData.push(o);

                }
            }

            this.setState({data:newData});
            console.log(998,newData);


        })
    }

    // 进入详情页
    gotoView(userId){
        this.context.router.history.push('/admin/user/audit/'+userId); // 带参数跳转路由
    }
    
    render(){
        return (
            <div>
                <Table columns={this.columns} dataSource={this.state.data} />
            </div>
        )
    }
}