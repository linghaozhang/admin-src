
import React from 'react';
import { Table, Icon } from 'antd';
import { Modal, Button } from 'antd';
import Api from '@api/tourongApi';
import PropTypes from 'prop-types';
import {messageSuccess,messageError,messageWarning} from '@fun/message'; // 全局提示



export default class UserShenFenRenZheng extends React.Component{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data:[{

            }],
            visibility:false,

            images:[],
            userId:0,

        };
    }

    openModal(imagesArr,userId){
        this.setState({
            visibility:true,
            images:imagesArr,
            userId:userId,
        })
    }

    handleCancel(){
        this.setState({visibility:false});
    }

    handleOk(){
        Api.updateUser({
            id:this.state.userId,
            identityCardReview:2,
        }).then((data)=>{
            console.log(9998,data);
            if (status == 0){
                messageSuccess('通过成功');
                this.setState({visibility:false});
            }else{
                messageError(data.msg);
            }
        })
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
        title: 'Action',
        key: 'action',
        render: (text, record) => {

            return (
                <span>
                    <a href="javascript:;" onClick={this.openModal.bind(this,text.imagesArr,text.userId)}>查看身份信息</a>
                </span>
            )
        },
    }];


    componentWillMount() {

        // 获取所有用户，筛选出还未审核的用户
        Api.getAllUser({

        }).then((data)=>{

            let d = data.data;
            let newData = [];

            for (let i=0;i<d.length;i++){
                let obj = d[i];

                if (obj.identityCardReview == 1){
                    console.log(666,obj);
                    let o = {
                        key:i,
                        name:obj.name,
                        orgName:obj.orgName, //机构名称
                        department:obj.department, //部门
                        position:obj.position, //职位
                        userId:obj.id,
                        imagesArr:eval(obj.identityCard),
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

                <Modal
                    title="身份审核"
                    visible={this.state.visibility}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    {
                        this.state.images.map((item,index)=>{
                            console.log(123,item);
                            let imgUrl = IMG_URL+item;
                            return (
                                <div key={index}>
                                    <img src={imgUrl} alt="" style={{width:'100%'}}/>
                                </div>
                            )
                        })
                    }
                </Modal>

            </div>
        )
    }
}