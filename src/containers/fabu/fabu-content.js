import React from 'react';
import PropTypes from 'prop-types';
import Api from '@api/tourongApi';
import { Button, Radio, Icon } from 'antd';
import './fabu-content.less';

/*
* 发布信息详情页
* */
export default class FabuContent extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            propertyRole:null, //资产对接角色
            propertyRoleStr:null,
            propertyTrade:null, // 资产行业
            propertyTradeStr:null,
            propertyType:null, // 资产类别
            propertyTypeStr:null,
            propertyTypeLabel:null, // 资产类别标签
            propertyTypeLabelStr:null,
            type:null, // 类型
            userId:null, // 发帖人ID
            txt:null,
        };
      }

    //获取数据
    updateDate(){

        let id = this.context.router.route.match.params.id;

        Api.getButtJoinById(id).then((data)=>{
            let d = data.data;

            this.setState({
                propertyRole:d.propertyRole,
                propertyRoleStr:d.propertyRoleStr,
                propertyTrade:d.propertyTrade,
                propertyTradeStr:d.propertyTradeStr,
                propertyType:d.propertyType,
                propertyTypeStr:d.propertyTypeStr,
                propertyTypeLabel:d.propertyTypeLabel,
                propertyTypeLabelStr:d.propertyTypeLabelStr,
                type:d.type,
                userId:d.userId,
                txt:d.txt,
            });

            console.log(111,data);
        })
    }

    //解析数组成为字符串
    getStr(arr){

    }

    //跳转到列表页面
    goToList(){
        this.context.router.history.push('/admin/fabu/fabu'); //跳转到列表页面
    }

    //路由参数
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    componentWillMount() {
        this.updateDate();
    }


    render(){
        return (
            <div className="FabuContent">
                <p style={{fontWeight:'900',fontSize:'16px'}}>基本信息</p>
                <p className="row" style={{marginTop:'10px'}}>
                    <span>资产对接角色：{this.state.propertyRoleStr}</span>
                </p>
                <p className="row">
                    <span>资产行业：{this.state.propertyTradeStr}</span>
                </p>
                <p className="row">
                    <span>资产类别：{this.state.propertyTypeStr}</span>
                </p>
                <p className="row">
                    <span>资产类别标签：{this.state.propertyTypeLabelStr}</span>
                </p>
                <p className="row">
                    <span>描述：{this.state.txt}</span>
                </p>
                <div style={{marginTop:'50px',textAlign:'center'}}>
                    <Button type="primary" icon="check" onClick={this.goToList.bind(this)}>确定</Button>
                </div>

            </div>
        )
    }
}