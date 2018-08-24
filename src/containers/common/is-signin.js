import React from 'react';


/*
 * 登陆状态验证
 *   判断全局变量中的isLogIn,若为true为已登录，若为false为未登录
 *   若已登录则不做任何处理
 *   若未登录，则控制路由跳转至登录页面
 * */

export default class IsSignIn extends React.Component{

    componentWillMount() {

        if (G_token == ''||G_token == null || G_token == undefined){
            this.props.history.push('/login');
        }
    }

    render(){
        return (
            <div></div>
        )
    }
}