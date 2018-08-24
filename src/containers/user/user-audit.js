import React from 'react';
import PropTypes from 'prop-types';
import './user-audit.less';
import { Radio,Button } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import { Popconfirm, message } from 'antd';
import { InputNumber } from 'antd';
import Api from '@api/tourongApi';
import {messageSuccess,messageError,messageWarning} from '@fun/message'; // 全局提示
import {getData} from '@fun/xdfun';
var md5 = require('md5');
import $ from 'jquery';

export default class UserAudit extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            userId:'', //当前用户的id
            dockingType:'1', //对接模式
            beDockingType:'1', //被对接模式

            type:'', //用户类型
            name:'', //用户昵称
            phone:'', //手机号
            birthday:'', //生日
            region:'', //所在地区
            orgType:'', //机构类别
            orgName:'', //机构名称
            department:'', //部门名称
            position:'', //职位名称
            email:'', //联系邮箱
            wechat:'', //微信
            card:'', //名片
            orgStr:'',//机构选择
            review:'', // 用户审核状态
            payOk: null,  //用户是否已经付费
            yqList:[], // 邀请记录
            wallet: '', // 余额
            walletInput:100,

            orgTypeStr:'', //机构类别的中文
            identityCardReview: '', // 身份认证状态
            identityCard: '', // 身份证照片 数组
        };
      }

    //路由参数
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    componentWillMount() {
        let userId = this.context.router.route.match.params.id;
    
        this.setState({
            userId:userId,
        },()=>{
            // 获取数据
            Api.getUser(this.state.userId).then((data)=>{

                console.log(999,data);
                let d = data.data; //主要数据
                this.setState({
                    type:d.type.toString(),
                    name:d.name,
                    phone:d.phone,
                    birthday:d.birthday,
                    region:d.region,
                    orgType:d.orgType,
                    orgName:d.orgName,
                    department:d.department,
                    position:d.position,
                    email:d.email,
                    wechat:d.wechat,
                    card:d.card,
                    orgStr:d.orgStr,
                    review:d.review,
                    payOk:d.payOk,
                    wallet: d.wallet,
                    orgTypeStr: d.orgTypeStr,
                    identityCardReview: d.identityCardReview,
                    identityCard: d.identityCard,
                    dockingType: d.dockingType.toString(),
                    beDockingType: d.beDockingType.toString(),
                });
                console.log(787878787878,d.beDockingType);

            })

            // 获取邀请记录数据
            Api.inviteGet(this.state.userId).then((data)=>{
                this.setState({
                    yqList:data.data,
                })
            })



        });
    }

    //改变被对接选项
    beiduijieChange(e){
        this.setState({beDockingType:e.target.value})
    }

    //改变对接选项
    duijieChange(e){
        this.setState({dockingType:e.target.value})
    }

    //用户类型改变
    yonghuleixingChange(e){
        console.log(1112233333,e);
        this.setState({type:e.target.value}, function () {
            console.log(998877,this.state.userId,this.state.type);
            Api.updateUser({
                id:this.state.userId,
                type:this.state.type,
                basicOK:0,
            }).then((data)=>{
                console.log(77777,data);
                if (data.status == 0){
                    messageSuccess('用户类型已成功修改并重置');
                }else{
                    messageWarning('失败请重试');
                }
            })
        });




    }

    confirm(){

        if (this.state.payOk != 1){
            messageWarning('成为会员后才能够进行提现');
            return false;
        }

        if (this.state.identityCardReview != 1) {
            messageWarning('通过身份认证后才能够进行提现');
            return false;
        }

        if(this.state.walletInput > this.state.wallet){
            messageWarning('提现金额不能大于用户余额！');
        }else {
            Api.updateUser({
                id:this.state.userId,
                wallet: (this.state.wallet - this.state.walletInput)
            }).then((data)=>{
                if (data.status == 0){
                    messageSuccess('核销成功！');
                    setTimeout(function () {
                        location.reload();
                    },2000);
                }else{
                    messageError('核销失败，请稍后重试');
                    setTimeout(function () {
                        location.reload();
                    },2000);
                }
                console.log(data);
            })

        }
    }

    walletOnChange(e){
        this.setState({walletInput:e});
    }

    // 通过审核
    submitBtn(){
        Api.updateUser({
            id:this.state.userId,
            review:1,
            dockingType:this.state.dockingType,
            beDockingType:this.state.beDockingType,
            orgType:this.state.orgType,
        }).then((data)=>{
            if (data.status==0){
                
                messageSuccess('通过审核成功');

                /*判断是审核还是修改权限 如果是修改则无需发送短信给用户*/
                if (this.state.review == 1) {
                    console.log('无需发送短信');
                    return false;
                }

                /*发送短信通知*/
                // 发送短信
                // 准备短信接口相关数据
                let date= new Date();
                let nowtime = date.getFullYear().toString()+((date.getMonth()+1).toString().length==1?0+(date.getMonth()+1).toString():(date.getMonth()+1).toString())+(date.getDate().toString().length==1?0+date.getDate().toString():date.getDate().toString())+(date.getHours().toString().length==1?0+date.getHours().toString():date.getHours().toString())+(date.getMinutes().toString().length ==1?0+date.getMinutes().toString():date.getMinutes().toString())+(date.getSeconds().toString().length==1?0+date.getSeconds().toString():date.getSeconds().toString());

                let AuthorizationStr = 'N00000014371:'+nowtime;
                let Authorization = window.btoa(AuthorizationStr);

                let sigStr = "N0000001437153e67950-6774-11e7-a03d-25548cb1958d" + nowtime;
                let sig = md5(sigStr).toUpperCase();

                // var yzmStr = (parseInt(Math.random()*(100000-999999+1)+999999)).toString();
                // yzm = calcMD5(yzmStr); // 随机验证码

                var jsonData = '{"password":"YLHdmFoX7C","num":"'+this.state.phone+'","templateNum":"3"}';

                console.log(123,Authorization);
                console.log(456,sig);
                console.log(789,jsonData);

                $.ajax({
                    headers:{
                        "Accept":'application/json',
                        "Authorization":Authorization,
                        "Content-Type":'application/json;charset=utf-8'
                    },
                    url: 'http://apis.7moor.com/v20160818/sms/sendInterfaceTemplateSms/N00000014371?sig='+sig,
                    type: 'POST',
                    dataType:'json',
                    data: jsonData,
                    success:function(data){
                        console.log(data);
                    }
                })


                this.props.history.push('/admin/user');
            }else{
                messageError(data.msg);
            }
            console.log(123,data);
        })
    }

    //拒绝审核
    openPhonemodal(){
        Api.updateUser({
            id:this.state.userId,
            review:2,
        }).then((data)=>{
            if (data.status==0){
                messageSuccess('操作成功');
                this.props.history.push('/admin/user');
            }else{
                messageError(data.msg);
            }
            console.log(123,data);
        })
    }

    render(){

        //处理用户类型
        let type = this.state.type == 1 ? '资金方' : '资产方';

        // 所在地区
        let regionStr = '';
        if (this.state.region != ""){
            let region =  eval(this.state.region);
            let regionArr = region.map((item,index)=>{
                regionStr += ' '+item;
            });
        }

        // 机构类别
        // Api.getConfigById(this.state.orgType).then((data)=>{
        //     this.setState({orgTypeStr:data.data.cat});
        // });
        //
        //  邀请列表
        let list = this.state.yqList.map((item,index)=>{
            console.log(11112222,item);
            return (
                <p key={index} style={{marginBottom:'6px'}}>
                    被邀请人：{item.userInfo.name} &nbsp;&nbsp;&nbsp;&nbsp; 被邀请人ID：{item.userId} &nbsp;&nbsp;&nbsp;&nbsp;被邀请人是否已付费成为会员：{item.userInfo.payOk == 0 ? '未付费' : '已付费'}&nbsp;&nbsp;&nbsp;&nbsp;邀请好友时间：{item.userInfo.landingTime||''}
                    </p>
            )
        });

        // 身份认证状态
        let shenfenrenzheng;
        if (this.state.identityCardReview == 0){
            shenfenrenzheng = '未认证';
        }else if (this.state.identityCardReview == 1) {
            shenfenrenzheng = '已提交认证申请，请到用户管理-身份认证中进行查看';
        }else {
            shenfenrenzheng = '已认证';
        }

        // 身份认证照片
        let identityCardArr = eval(this.state.identityCard);
        let identityCardArrOne = '';
        let identityCardArrTwo = '';
        console.log(112233,identityCardArr);
        if (this.state.identityCardReview == 2){
            identityCardArrOne = GLOBAL_IMG_URL + identityCardArr[0];
            identityCardArrTwo = GLOBAL_IMG_URL + identityCardArr[1];
        }


        return (
            <div className="UserAudit">
                <p style={{fontWeight:'900',fontSize:'16px'}}>基本信息</p>
                <p className="row" style={{marginTop:'10px'}}>
                    <span>用户类型：{type}</span>
                    <span>手机号码：{this.state.phone}</span>
                    <span>姓名：{this.state.name}</span>
                    <span>地区：{regionStr}</span>
                    {/*<span>出生年月：{this.state.birthday}</span>*/}
                </p>
                <p className="row">
                    <span>机构类别：{this.state.orgTypeStr}</span>
                    <span>机构选择：{this.state.orgStr}</span>
                    <span>机构名称：{this.state.orgName}</span>
                    <span>部门名称：{this.state.department}</span>
                </p>
                <p className="row">
                    <span>职位名称：{this.state.position}</span>
                    <span>微信号码：{this.state.wechat}</span>
                    <span>联系邮箱：{this.state.email}</span>
                    <span></span>
                </p>
                <div style={{margin:'20px 0px'}}>
                    <div style={{width:'360px',height:'200px'}}>
                        <span>名片：</span>
                        <img src={GLOBAL_IMG_URL+this.state.card} alt="" style={{width:'100%',height:'100%'}}/>
                    </div>
                </div>

                <div className="quanxianBox">
                    <p style={{fontWeight:'900',fontSize:'16px'}}>权限设置</p>
                    <div className="inputBopx">
                        <p className="tit">选择对接模式：</p>
                        <div className="content">
                            <RadioGroup onChange={this.duijieChange.bind(this)} value={this.state.dockingType}>
                                <RadioButton value="1">普通模式</RadioButton>
                                <RadioButton value="2">邀请模式</RadioButton>
                                <RadioButton value="3">付费模式</RadioButton>
                                <RadioButton value="4">二选一模式</RadioButton>
                            </RadioGroup>
                        </div>

                    </div>

                    <div className="inputBopx">
                        <p className="tit">被对接模式：</p>
                        <div className="content">
                            <RadioGroup onChange={this.beiduijieChange.bind(this)} value={this.state.beDockingType}>
                                <RadioButton value="1">普通模式</RadioButton>
                                <RadioButton value="2">限制模式</RadioButton>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="inputBopx">
                        <p className="tit" style={{width:'330px'}}>修改用户类型(请勿乱点，切换即会重置用户，请谨慎操作)：</p>
                        <div className="content">
                            <RadioGroup onChange={this.yonghuleixingChange.bind(this)} value={this.state.type}>
                                <RadioButton value="1">资金方</RadioButton>
                                <RadioButton value="2">资产方</RadioButton>
                            </RadioGroup>
                        </div>
                    </div>
                </div>

                <div style={{marginTop:'10px',fontSize:'14px',fontWeight:900,}}>
                    <span>
                        该用户当前余额：{this.state.wallet} 元
                    </span>
                    <InputNumber
                        defaultValue={100}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        onChange={this.walletOnChange.bind(this)}
                        style={{marginLeft:'20px',marginRight:'10px'}}
                    />
                    <Popconfirm placement="top" title="核销涉及资金变动，无法恢复，确定进行核销吗？"  okText="确定" cancelText="取消" onConfirm={this.confirm.bind(this)}>
                        <Button type="primary">核销</Button>
                    </Popconfirm>
                </div>

                <p style={{fontWeight:'900',fontSize:'16px',marginTop:'50px',marginBottom:'10px'}}>会员状态</p>
                <p className="row">
                    <span>目前是否已成为会员：{this.state.payOk == 0 ? '未成为会员' : '已成为会员'}</span>
                </p>

                <p style={{fontWeight:'900',fontSize:'16px',marginTop:'50px',marginBottom:'10px'}}>身份认证状态</p>
                <p className="row">
                    <span>目前是否已通过身份认证：{shenfenrenzheng}</span>
                </p>
                <p>
                    <span>
                        <img src={identityCardArrOne} alt="" style={{width:'180px',height:'100px',marginRight:'30px'}}/>
                    </span>
                    <span>
                        <img src={identityCardArrTwo} alt="" style={{width:'180px',height:'100px'}}/>
                    </span>
                </p>



                <p style={{fontWeight:'900',fontSize:'16px',marginTop:'50px',marginBottom:'10px'}}>邀请记录</p>
                {list}



                {/*按钮操作组*/}
                <div className="btns">
                    <Button onClick={this.openPhonemodal.bind(this)}>拒绝审核/禁用</Button>
                    <Button type="primary" icon="rocket" style={{margin:'0px 20px'}} onClick={this.submitBtn.bind(this)} >通过审核/修改</Button>
                </div>
            </div>
        )
    }
}