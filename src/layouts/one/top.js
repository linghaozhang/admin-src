import React from 'react';
import './top.less'; // 样式

import { Menu, Icon, Alert } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import Api from '@api/layout';


export default class Top extends React.Component{




        /*
         * 退出登录
         *   初始化store，跳转至登录页面
         * */
        logOutFunction()
        {
            this.props.history.push('/login');
        }


    render(){
        return (
            <div className="topBox">

                {/*个人信息栏*/}
                <Menu
                    onClick={this.handleClick}
                    mode="horizontal"
                    className="userInformationBox"
                >

                    <SubMenu
                        title={<span className="userInformation"><span className="userName">admin</span></span>}>
                        <Menu.Item key="1"><sapn onClick={this.logOutFunction.bind(this)}>退出登录</sapn></Menu.Item>
                    </SubMenu>

                </Menu>
            </div>
        )
    }

}