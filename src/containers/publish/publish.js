import React from 'react';
import {HashRouter as Router,Route,Link} from 'react-router-dom'; // 路由

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import PublishApi from '@api/publish';

import News from './news'; //新闻组件
import Videos from './videos'; //视频
import Images from './images'; //图片集

export default class Publish extends React.Component{

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            current: 'news',  // 当前选中项key
            columnsArray:[], //分类列表数据
            columnsDefaultKey:'', //分类列表默认选中项key
        };
    }

    // 切换选中项
    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    };

    //跳转至首页
    routeGoToIndex(){
        this.props.history.push('/admin/index'); // 跳转到主页
    };

    componentWillMount() {

        // 获取分类数据
        PublishApi.getColumn({
            type:1,
        }).then((data)=>{
            let d = data.data.columns;// 全部数据
            let columnsDefaultKey = d[0].column_id; // 默认选中的ID
            this.setState({
                columnsArray:d,
                columnsDefaultKey:columnsDefaultKey,
            });
        })

    }

    render(){

        //判断数据是否加载完毕，在进行渲染
        if (this.state.columnsDefaultKey == '') return false;


        let content = '';
        let selectedKey = this.state.current; //当前选中key

        // 判断当前选中值，渲染对应组件
        if( selectedKey=='news' ) {

            content = <News
                columnsArray={this.state.columnsArray}  // 选项
                columnsDefaultKey={this.state.columnsDefaultKey} // 默认选中
                routeGoToIndex={this.routeGoToIndex.bind(this)}
            />

        }else if ( selectedKey== 'videos' ) {

            content = <Videos
                columnsArray={this.state.columnsArray}  // 选项
                columnsDefaultKey={this.state.columnsDefaultKey} // 默认选中
                routeGoToIndex={this.routeGoToIndex.bind(this)}
            />

        }else if ( selectedKey== 'images' ) {

            content = <Images
                columnsArray={this.state.columnsArray}  // 选项
                columnsDefaultKey={this.state.columnsDefaultKey} // 默认选中
                routeGoToIndex={this.routeGoToIndex.bind(this)}
            />

        }

        return (
            <div>
                <Menu
                    onClick={this.handleClick.bind(this)}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key="news">
                        发表文章
                    </Menu.Item>
                    <Menu.Item key="videos">
                        发表视频
                    </Menu.Item>
                    <Menu.Item key="images">
                        发表图集
                    </Menu.Item>

                </Menu>

                {content}

            </div>
        )
    }
}