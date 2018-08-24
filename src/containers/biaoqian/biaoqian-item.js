import React from 'react';
import { Button, Radio, Icon,Popconfirm,Modal,Input } from 'antd';
import Api from '@api/tourongApi';
import {messageSuccess,messageError,messageWarning} from '@fun/message'; // 全局提示


export default class BiaoQianItem extends React.Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {

            modalVisible:false, //增加输入框是否显示
            inputValue:'' , //增加输入框的内容
        };
      }


    //删除
    delete(id,type){
        Api.deleteConfig({
            id:id,
        }).then((data)=>{
            if (data.status == 0 ){
                messageSuccess('删除成功！');
                this.props.deletaCallback();
            }
        })
    }

    // 弹出增加输入框
    showModal(){
        this.setState({modalVisible:true});
    }

    // 关闭增加输入框
    hideModal(){
        this.setState({modalVisible:false});
    }

    //增加配置项
    okModal(){
        Api.addConfig({
          type:this.props.type,
            cat:this.state.inputValue,
        }).then((data)=>{
            if(data.status == 0){
                messageSuccess('增加配置项成功！');
                this.setState({
                    inputValue:'',
                    modalVisible:false,
                })
                this.props.deletaCallback();
            }
        })
    }

    // 修改增加输入框内容
    changeInput(e){
        this.setState({inputValue:e.target.value})
    }


    render(){
    
        if (this.props.allDate == null) return false;

        let tabList = this.props.allDate.map((item,index)=>{
           console.log(item);

           if(item.type == this.props.type){
               return (
                   <Popconfirm title="删除后无法恢复，确认要删除吗?" onConfirm={this.delete.bind(this, item.id,item.type)}okText="删除" cancelText="取消"  key={index}>
                       <Button
                           type="primary"
                           icon="delete"
                           style={{marginRight:'15px',marginBottom:'15px'}}
                       >
                           {item.cat}
                       </Button>
                   </Popconfirm>
               )
           }

        });

        return (
            <div>
                <span style={{fontSize:'14px',fontWeight:900}}>{this.props.cat}：</span>
                {tabList}

                <div style={{display:'inline-block'}}>
                    <Button onClick={this.showModal.bind(this)}>增加</Button>
                    <Modal
                        title="增加配置项"
                        visible={this.state.modalVisible}
                        onOk={this.okModal.bind(this)}
                        onCancel={this.hideModal.bind(this)}
                        okText="确认"
                        cancelText="取消"
                    >
                        <Input placeholder="配置项名称" value={this.state.inputValue} onChange={this.changeInput.bind(this)}/>

                    </Modal>
                </div>

            </div>
        )
    }
}