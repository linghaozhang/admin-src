import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router,Route,Link} from 'react-router-dom'; // 路由

// 项目初始化

import '@fun/common'; // 全局变量与全局函数、、

// 组件
import IsSignIn from '@containers/common/is-signin'; //判断是否已经登录
import LayoutRoot from '@layout/root'; // 整体布局入口
import SignIn from '@containers/login/sign-in'; // 登陆


// 入口组件
export default class Index extends React.Component{

    render() {
        return (
            <Router>

                <div style={styles.box}>
                    <Route component={IsSignIn}/> {/*判断是否已经登录*/}

                    <Route path="/login"  component={SignIn}/> {/*登陆页面*/}
                    <Route path="/admin" component={LayoutRoot}/> {/**/}


                </div>

            </Router>
        );
    }
}


// 样式
const styles = {
    box:{
        width: '100%',
        height: '100%',
        display:'flex',
        overflow:'hidden',
    }
};

// 渲染到入口容器
ReactDOM.render(
    <Index/>,
    document.getElementById('app')
);



