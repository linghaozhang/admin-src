import React from 'react';
import {Table, Icon, Input, Button} from 'antd';
import Api from '@api/tourongApi';
import PropTypes from 'prop-types';

const InputSearch = Input.Search;
import './all-user-list.less'

export default class AllAllUserList extends React.Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data: [{}],
            disabled: true,
            loading:false
        };
    }

    //路由参数
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    //表格头部
    columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: '用户类型',
        dataIndex: 'type',
        key: 'type',
        render: (text) => {
            if (text === 1) {
                return '资金方'
            } else if (text === 2) {
                return '资产方'
            }
        }
    }, {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '机构名称',
        dataIndex: 'orgName',
        key: 'orgName',
    },
    //     {
    //     title: '部门',
    //     dataIndex: 'department',
    //     key: 'department',
    // },
        {
        title: '职位',
        dataIndex: 'position',
        key: 'position',
    },
    {
        title: '审核状态',
        dataIndex: 'review',
        key: 'review',
        render:(text)=>{
            console.log(text);
            if(text===0){
                return '待审核'
            }else if(text===1){
                return '已通过'
            }else{
                return '未通过'
            }
        }
    },
        {
            title: '会员状态',
            dataIndex: 'payOk',
            key: 'payOk',
            render:(text)=>{
                if(text===0){
                    return '非会员'
                }else if(text===1){
                    return '会员'
                }
            }
        },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => {

            return (
                <span>
                <a href="javascript:;" onClick={this.gotoView.bind(this, record.id)}>查看信息</a>
            </span>
            )
        },
    }];


    componentWillMount() {
        this.setState({loading:true})
        // 获取所有用户，筛选出还未审核的用户
        Api.getAllUser({}).then((data) => {
            console.log(111222, data);
            let d = data.data;
            let newData = [];
            for (let i = 0; i < d.length; i++) {
                let obj = d[i];
                let o = {
                    key: i,
                    name: obj.name,
                    orgName: obj.orgName, //机构名称
                    department: obj.department, //部门
                    position: obj.position, //职位
                    id: obj.id,
                    type: obj.type,
                    review:obj.review,
                    payOk:obj.payOk

                };
                newData.push(o);

            }
            this.setState({data: newData,loading:false});
            console.log(998, newData);
        })
    }

    // 进入详情页
    gotoView(userId) {
        this.context.router.history.push('/admin/user/audit/' + userId); // 带参数跳转路由
    }

    onSearch = (val) => {
        this.setState({loading:true})
        Api.getInfoFormName({name: val}).then(res => {
            if (res.status === 0) {
                this.setState({
                    disabled: false,
                    data: res.data,
                    loading:false
                })
            }
        })
    };
    getAllUsers = () => {
        this.setState({loading:true})
        Api.getInfoFormName({}).then(res => {
            if (res.status === 0) {
                this.setState({
                    disabled: true,
                    data: res.data,
                    loading:false
                })
            }
        })
    };

    render() {
        let {disabled} = this.state;
        return (
            <div className='all-user-list'>
                <div style={{marginBottom: '10px'}}>
                    <Button className="getAllUsers" type='primary' disabled={disabled}
                            onClick={this.getAllUsers}>查看全部用户</Button>
                    <InputSearch
                        placeholder="请输入姓名或公司名称搜索"
                        style={{width: 200}}
                        onSearch={this.onSearch}
                    />

                </div>

                <Table columns={this.columns} dataSource={this.state.data} loading={this.state.loading}/>
            </div>
        )
    }
}