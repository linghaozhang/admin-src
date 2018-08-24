import React from 'react';
import {HashRouter as Router,Route,Link} from 'react-router-dom'; // 路由

import LayoutLeft from './layout-left'; // 左侧菜单栏
import LayoutRight from './layout-right'; // 右侧内容栏

export default class LayoutRoot extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            menuSelectedKeys:['sub1'], //导航菜单当前选中项
        };
      }

    render(){
        console.log(111,this.state.menuSelectedKeys);
        return (
            <div style={{display:'flex',flex:1}}>
                {/*<LayoutLeft menuSelectedKeys={this.state.menuSelectedKeys}/>*/}
                {/*<LayoutRight />*/}

                <Route component={LayoutLeft} /> {/*菜单*/}
                <Route component={LayoutRight} /> {/*主体*/}
            </div>
        )
    }
}