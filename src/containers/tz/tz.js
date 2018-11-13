import React from 'react';
import { Table, Icon,Button,Modal,Input,Upload, } from 'antd';
import Api from '@api/tourongApi';
import PropTypes from 'prop-types';
const { TextArea } = Input;
import {messageSuccess,messageError,messageWarning} from '@fun/message'; // 全局提示


const props2 = {

    listType: 'picture',
    className: 'upload-list-inline',
};
export default class TongZhi extends React.Component{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data:[{

            }],

            selectedArrayNotSave:[], //当前被选中的用户ID数组
            visible:false, //发送框可见性
            title:'',
            txt:'',

            fileList:'',
        };
    }

    // 打开
    open(){
        this.setState({visible:true})
    }

    //关闭
    onCancel(){
        this.setState({visible:false});
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
        title: '用户类型',
        dataIndex: 'type',
        key: 'type',
    },{
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
    }];

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {

            let list = [];
            selectedRows.map((item,index)=>{
                list.push(item.userId)
            })
            this.setState({selectedArrayNotSave:list});

        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',    // Column configuration not to be checked
        }),
    };

    componentWillMount() {

        // 获取所有用户，筛选出还未审核的用户
        Api.getAllUser({

        }).then((data)=>{
            console.log(111222,data);

            let d = data.data;
            let newData = [];

            for (let i=0;i<d.length;i++){
                let obj = d[i];


                let type;
                if (obj.type==1){
                    type = '资金方'
                }else{
                    type = '资产方'
                }

                let o = {
                    key:i,
                    name:obj.name,
                    orgName:obj.orgName, //机构名称
                    department:obj.department, //部门
                    position:obj.position, //职位
                    userId:obj.id,
                    type:type,

                };

                newData.unshift(o);

            }

            this.setState({data:newData});
            console.log(998,newData);


        })
    }

    // 进入详情页
    gotoView(userId){
        this.context.router.history.push('/admin/user/audit/'+userId); // 带参数跳转路由
    }

    /* 上传图片 */
    uploadFile(info){
        let fileList = info.fileList;
        fileList = fileList.slice(-1);

        this.setState({fileList:fileList});
    }
    
    //确定发通知
    handleOk(){
        if (this.state.selectedArrayNotSave.length ==0){
            messageWarning('您未选择用户');
            return false;
        }

        /* 图片地址 */
        let imageUrl = this.state.fileList[0].response.data;
        console.log(666777,imageUrl);

        let ids = JSON.stringify(this.state.selectedArrayNotSave);
        
        console.log(ids);

        Api.notice({
            ids:ids,
            type:1,
            title:this.state.title,
            content:this.state.txt,
            images:imageUrl,
        }).then((data)=>{
            if(data.status==0){
                messageSuccess('发送系统通知成功')
                this.setState({visible:false})
            }else{
                messageError(data.msg)
            }
        })
        console.log(this.state.title,this.state.txt,this.state.selectedArrayNotSave);
    }

    titleChange(e){
        this.setState({title:e.target.value})
    }

    txtChange(e){
        this.setState({txt:e.target.value})
    }


    render(){
        return (
            <div>
                <div style={{marginBottom:'16px'}}>
                    <Button type="primary" onClick={this.open.bind(this)}>发送消息通知</Button>
                </div>
                <Table columns={this.columns} dataSource={this.state.data} rowSelection={this.rowSelection}/>

                <Modal
                    title="发送系统通知"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.onCancel.bind(this)}
                >
                    <Input placeholder="请输入推送标题" value={this.state.title} onChange={this.titleChange.bind(this)}/>
                    <TextArea rows={4} placeholder="请输入推送内容" style={{margin:'10px 0px'}} onChange={this.txtChange.bind(this)}
                              value={this.state.txt}/>
                    <div>
                        <Upload
                            action={Api.uploadFileUrl}
                            className='upload-list-inline'
                            listType="picture"
                            onChange={this.uploadFile.bind(this)}
                            fileList={this.state.fileList}
                        >
                            <Button>
                                <Icon type="upload" /> 上传图片
                            </Button>
                        </Upload>
                    </div>
                </Modal>

            </div>
        )
    }
}