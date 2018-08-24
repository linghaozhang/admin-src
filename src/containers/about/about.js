import React from 'react';
import { Input } from 'antd';
const { TextArea } = Input;
import { Button, Radio, Icon } from 'antd';
import Api from '@api/tourongApi';
import {messageSuccess,messageError,messageWarning} from '@fun/message'; // 全局提示




export default class AboutMe extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            content:null,  //about content
        };
      }

      //改变内容
    onChange(e){
        this.setState({content:e.target.value})
    }

    //保存
    save(){
        Api.updateConfig({
            id:999,
            type:99,
            cat:this.state.content, 
        }).then((data)=>{
            if(data.status == 0 ){
                messageSuccess('保存成功');
            }else{
                messageSuccess(data.msg);
            }
            console.log(89,data);

        })
    }


    componentWillMount() {
        Api.getAllConfig({}).then((data)=>{
            let d = data.data;
            d.map((item,index)=>{
               if(item.id == 999){
                   console.log(9999,item.cat);
                   this.setState({content:item.cat})
               }
            });
            console.log(111,data);
        })
    }

    render(){
        return (
            <div>
                <TextArea rows={8} value={this.state.content} onChange={this.onChange.bind(this)} />
                <div style={{marginTop:'50px',textAlign:'center'}}>
                    {/*<Button style={{marginRight:'25px'}}>取消</Button>*/}
                    <Button type="primary" icon="upload" onClick={this.save.bind(this)}>保存</Button>
                </div>
            </div>
        )
    }
}