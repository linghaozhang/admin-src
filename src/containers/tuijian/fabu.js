import React from 'react';
import { Table, Icon,Popconfirm, message ,Button,Modal,Input} from 'antd';
import Api from '@api/tourongApi';
import PropTypes from 'prop-types';
import {messageSuccess,messageError,messageWarning} from '@fun/message'; // 全局提示

import {ArrayRemoveByValue} from '@fun/xdfun';



export default class TuijianFabu extends React.Component{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data:[{

            }],

            modalVisible:false,
            inputValue:'', //输入框内容

            recommendIds: [],  //推荐列表
        };
    }

    //路由参数
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    //表格头部
    columns = [{
        title: '发布人',
        dataIndex: 'name',
        key: 'name',
        width:'120px',
    }, {
        title: '主要内容',
        dataIndex: 'content',
        key: 'content',
    }, {
        title: 'Action',
        key: 'action',
        width:'120px',
        render: (text, record) => {

            return (
                <span>
                    <Popconfirm title="确定删除吗?" onConfirm={this.delete.bind(this,text.userId)}  okText="删除" cancelText="取消">
                        <a href="javascript:;">取消推荐</a>
                    </Popconfirm>
                </span>
            )
        },
    }];

    //取消推荐
    delete(userId){

        let arr = eval(this.state.recommendIds);
        let newRecommendIds = ArrayRemoveByValue(arr,userId);
        let newRecommendIdsJson = JSON.stringify(newRecommendIds);

        Api.updateButtJoin({
            position:2,
            type:2,
            recommendIds:newRecommendIdsJson,
        }).then((data)=>{
            this.updateDate();
        })

    }

    // 刷新推荐数据
    updateDate(){
        // 获取所有用户，筛选出还未审核的用户
        Api.getecommend(2,2).then((data)=>{
            console.log(7777888,data);
            console.log('--------- 33333333',data.data.recommendIds);

            this.setState({
                recommendIds:data.data.recommendIds || []
            });

            let d = data.data.recommendInfo;//详细数据
            let allDate = [];

            d.map((item,index)=>{

                console.log(6666,item);
                
                let obj = item;

                let o = {
                    key:index,
                    name:obj.userInfo.name,
                    orgName:obj.orgName, //机构名称
                    department:obj.department, //部门
                    position:obj.position, //职位
                    userId:obj.id,
                    content:obj.txt,
                };

                allDate.push(o);
            });

            this.setState({data:allDate});
        });
    }

    componentWillMount() {
        this.updateDate();
    }

    // 进入详情页
    gotoView(userId){
        this.context.router.history.push('/admin/user/audit/'+userId); // 带参数跳转路由
    }

    //打开输入框
    showModal(){
        this.setState({modalVisible:true})
    }

    //关闭输入框
    hideModal(){
        this.setState({modalVisible:false});
    }

    //确定增加
    okModal(){
        console.log('-------111------');
        console.log('--------222-----', this.state.recommendIds);
        let arr = eval(this.state.recommendIds);
        arr.push(this.state.inputValue);
        let newRecommendIdsJson = JSON.stringify(arr);

        Api.updateButtJoin({
            position:2,
            type:2,
            recommendIds:newRecommendIdsJson,
        }).then((data)=>{
            this.setState({modalVisible:false});
            this.updateDate();
        })
    }

    //输入框内容改变
    changeInput(e){
        this.setState({inputValue:e.target.value})
    }

    render(){
        return (
            <div>
                <div style={{marginBottom:'16px'}}>
                    <Button onClick={this.showModal.bind(this)} type="primary">增加</Button>
                    <Modal
                        title="增加推荐用户"
                        visible={this.state.modalVisible}
                        onOk={this.okModal.bind(this)}
                        onCancel={this.hideModal.bind(this)}
                        okText="确认"
                        cancelText="取消"
                    >
                        <Input placeholder="输入用户ID，可在用户管理查看" value={this.state.inputValue} onChange={this.changeInput.bind(this)}/>

                    </Modal>
                </div>
                <Table columns={this.columns} dataSource={this.state.data} />
            </div>
        )
    }
}