import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'; // 路由

// ant-design用到的模块
import { Menu, Icon, Switch } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import logo from './../../static/images/logo.jpg'
import './layout-left.less';  //样式



function handleClick(e) {
    console.log('click', e);
}

export default class LayoutLeft extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            switchIsChecked:false,  //菜单风格切换按钮状态
            menuTheme:'dark',  // 菜单主题部分风格，dark为黑色，light为白色
            checkedColor:'#3e3e3e', // 风格切换主要颜色，#3e3e3e和#fff
            checkedColorecond:'#fff', // 风格切换第二主色，#494949和#fff
            checkedBtnBorder:'1px solid #efefef', // 风格切换按钮的边框，浅色时为'1px solid #aaa'，深色时无边框
            selectedKeys:['sub1'], //当前选中的选项
        };

      }




    /*
    * 改变菜单风格按钮状态
     *  */
    changeTheme(){
        let switchIsChecked = !(this.state.switchIsChecked);  // 切换开关状态
        let menuTheme = switchIsChecked ? 'light' : 'dark';  // 切换菜单主题部分风格
        let checkedColor = switchIsChecked ? '#fff' : '#3e3e3e'; // 切换风格主色
        let checkedColorecond = switchIsChecked ? '#fff' : '#494949'; // 切换风格第二主色
        let checkedBtnBorder = switchIsChecked ? '1px solid #efefef' : ''; // 切换风格按钮容器边框

        this.setState({
            switchIsChecked:switchIsChecked,
            menuTheme:menuTheme,
            checkedColor:checkedColor,
            checkedColorecond:checkedColorecond,
            checkedBtnBorder:checkedBtnBorder,
        })
    }
    
    /*
    * 切换菜单选中项
    *   获取点击项的key，通过state改变当前选中项UI
    * */
    handleClick(item, key, keyPath){
        let clickKey = item.key; //点击项的key
        this.setState({selectedKeys:[clickKey]})
    }

    render() {
        return (
            <div className="layoutLeft" style={{background:this.state.checkedColor}}>

                {/*LOGO和网站名称部分*/}
                <div className="logobox">
                    <img src={logo} alt=""/>
                </div>

                {/*菜单部分*/}
                <Menu
                    theme={this.state.menuTheme}
                    onClick={this.handleClick.bind(this)}
                    style={{ width: 230 }}
                    mode="inline"
                    className="listBox"
                    selectedKeys={this.state.selectedKeys}
                    defaultOpenKeys={['sub3']}
                >
                    <Menu.Item key="sub1">
                        <Icon type="user-add" />用户管理
                        <Link to="/admin/user" ></Link>
                    </Menu.Item>

                    <Menu.Item key="sub2">
                        <Icon type="edit" />发布管理
                        <Link to="/admin/fabu/fabu"></Link>
                    </Menu.Item>

                    <SubMenu key="sub3" title={<span><Icon type="book" /><span>推荐管理</span></span>}>
                        <Menu.Item key="1">
                            <Link to="/admin/tuijian/zijinfangIndex" style={{display:'inline-block',width:'100%',height:'100%'}}>首页资金方大咖</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/admin/tuijian/fabu" style={{display:'inline-block',width:'100%',height:'100%'}}>投融宝发布内容推荐</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/admin/tuijian/zijinfang" style={{display:'inline-block',width:'100%',height:'100%'}}>投融宝资金方推荐</Link>
                        </Menu.Item>
                        {/*<Menu.Item key="4">*/}
                            {/*<Link to="/admin/tuijian/banner" style={{display:'inline-block',width:'100%',height:'100%'}}>banner管理</Link>*/}
                        {/*</Menu.Item>*/}

                    </SubMenu>


                    <Menu.Item key="sub4">
                        <Icon type="tags" />标签管理
                        <Link to="/admin/biaoqian/biaoqian"></Link>
                    </Menu.Item>

                    <Menu.Item key="sub5">
                        <Icon type="smile" />关于我们
                        <Link to="/admin/about/about"></Link>
                    </Menu.Item>

                    <Menu.Item key="sub6">
                        <Icon type="customer-service" />建议意见
                        <Link to="/admin/jianyi/jianyi"></Link>
                    </Menu.Item>
                    <Menu.Item key="sub7">
                        <Icon type="coffee" />举报信息
                        <Link to="/admin/jubao/jubao"></Link>
                    </Menu.Item>

                    <Menu.Item key="sub8">
                        <Icon type="notification" />系统通知
                        <Link to="/admin/tz/tz"></Link>
                    </Menu.Item>

                    {/*<Menu.Item key="sub7">*/}
                        {/*<Icon type="contacts" />好友邀请管理*/}
                        {/*<Link to="/admin/yaoqing/yaoqing"></Link>*/}
                    {/*</Menu.Item>*/}



                </Menu>

                {/*切换导航风格部分*/}
                <div className="styleBtnBox" style={{background:this.state.checkedColorecond,borderTop:this.state.checkedBtnBorder}}>
                    <p className="styleTxtBox">
                        <Icon type="bulb" />
                        <span>切换导航风格</span>

                    </p>
                    <Switch
                        checked={this.state.switchIsChecked}
                        onChange={this.changeTheme.bind(this)}
                        checkedChildren="light"
                        unCheckedChildren="dark"
                        className="switchBtn"
                    />
                </div>

            </div>
        );
    }

}