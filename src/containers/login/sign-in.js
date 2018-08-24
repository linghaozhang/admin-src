import React from 'react';
import { Form, Input, DatePicker, Col, Button, message } from 'antd';
const FormItem = Form.Item;

import md5 from 'md5';  // MD5加密
import './sign-in.less';  // 样式
import Api from '@api/tourongApi';  // API
import {messageSuccess,messageError,messageWarning} from '@fun/message'; // 全局提示

export default class SignIn extends React.Component{


    componentWillMount() {
        // console.log(this.props.params.id);
    }

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            userNameValue:null, //当前输入的用户名
            userNameValidateStatus:'', // 用户名的验证状态
            userNameHelp:'', // 用户名的帮助文字
            userNameIsOk:false, // 输入的用户名是否符合所有前端规则

            passwordValue:null, //当前输入的密码
            passwordValidateStatus:'', // 密码的验证状态
            passwordHelp:'', // 密码的帮助文字
            passwordIsOk:false, //输入的密码是否已经符合所有前端规则

            submitButtonIsLoading:false, // 登陆按钮是否处于loading状态
        };
      }

      /*
      * 用户名称改变时
      *     判断信息是否为空，若为空则提示用户输入
      *     若符合要求，则显示success
      * */
    changeUserNameInput(e){
        let inputVal = e.target.value; // 用户名输入框当前内容

        if (inputVal==''){
            this.setState({
                userNameValue:inputVal,
                userNameValidateStatus:'error',
                userNameHelp:'请输入用户名',
                userNameIsOk:false,
            })
        }else{
            this.setState({
                userNameValue:inputVal,
                userNameValidateStatus:'success',
                userNameHelp:'',
                userNameIsOk:true,
            })
        }
    };

    /*
     * 密码内容改变时
     *     判断信息是否为空，若为空则提示用户输入密码
     *     若符合要求，则显示success
     * */
    changePasswordInput(e){
        let inputVal = e.target.value; // 密码输入框当前内容

        if (inputVal==''){
            this.setState({
                passwordValue:inputVal,
                passwordValidateStatus:'error',
                passwordHelp:'请输入密码',
                passwordIsOk:false,
            })
        }else{
            this.setState({
                passwordValue:inputVal,
                passwordValidateStatus:'success',
                passwordHelp:'',
                passwordIsOk:true,
            })
        }
    };

    /*
    * 点击登录按钮
    *   根据state中的userNameIsOk和passwordIsOk，判断当前输入的用户名和密码是否已经符合前端规则
    *   如果存在不符合要求的项目，则不作任何处理，保持当前的错误提示
    *   若已经全部符合，则通过接口进行登录验证
    * */
    clickSubmitButton(){

        if (this.state.userNameIsOk && this.state.passwordIsOk){
            this.setState({submitButtonIsLoading:true},()=>{  //将登录按钮调整为loading状态
                this.signIn(); //调用登录函数
            });
        }
    }


    /*
    * 登录函数
    *   获取当前用户输入的用户名、密码
    *   通过接口提交信息
    * */
    signIn(){
        let  userNameValue = this.state.userNameValue; //当前用户名
        let  passwordValue = this.state.passwordValue; //当前密码

        Api.loginIn({
            username:userNameValue,
            password:passwordValue,
        }).then((data)=>{
            if (data.status == 0 ){
                this.signInSuccess(data);
            }else{
                messageError('账号密码错误');
                this.setState({submitButtonIsLoading:false});//取消登陆按钮loading状态
            }
        })

    };

    /*
    * 登陆成功函数
    *   将用户登录状态、用户ID、用户昵称、用户头像地址保存进store
    *
    * */
    signInSuccess(data){
        console.log(11);
        console.log(1111,data);

        let d = data.data; // 主要信息
        let token = d.token; // token

        sessionStorage.setItem('TRQtoken',token);

        this.props.history.push('/admin/user'); // 跳转到主页

    }



    render(){
        return (
            <div className="signIn">
                <div className="signBox">
                    <div className="logoBox" style={{fontSize:'14px',fontWeight:900}}>
                        {/*<img src={require( '../../static/images/logo.png')} alt=""/>*/}
                        投融宝后台管理系统
                    </div>


                    {/*表单部分*/}
                    <Form className="signInForm">

                        <FormItem
                            validateStatus={this.state.userNameValidateStatus}
                            help={this.state.userNameHelp}
                            hasFeedback
                            className='FormItem'
                        >
                            <Input placeholder="请输入用户名" id="userid" onChange={this.changeUserNameInput.bind(this)} type="text" />
                        </FormItem>
                        <FormItem
                            validateStatus={this.state.passwordValidateStatus}
                            help={this.state.passwordHelp}
                            hasFeedback
                            className='FormItem'
                        >
                            <Input placeholder="请输入密码" id="password" onChange={this.changePasswordInput.bind(this)}  type="password"/>
                        </FormItem>
                        <Button type="primary"  loading={this.state.submitButtonIsLoading} className="submitBtn" onClick={this.clickSubmitButton.bind(this)}>
                            登 录
                        </Button>
                        {/*<p className="otherBtns">*/}
                            {/*<span>注册账号</span>*/}
                            {/*<span>找回密码</span>*/}
                        {/*</p>*/}
                    </Form>
                </div>
            </div>
        )
    }
}