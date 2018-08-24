import React from 'react';
import {HashRouter as Router,Route,Link} from 'react-router-dom'; // 路由

import Top from './top'; // 顶栏
import LayoutContent from './layout-content' // 主体内容
import LayoutFooter from './footer'; // 底部

import './layout-right.less'; // 样式

export default class LayoutRight extends React.Component{
    render(){
        return (
            <div className="layoutRightBox">

                {/*<Top />*/}
                {/*<LayoutContent {...this.props}  />*/}
                {/*<LayoutFooter />*/}

                <Route component={Top}/> {/*顶部*/}
                <Route component={LayoutContent}/> {/*主体内容*/}
                <Route component={LayoutFooter}/> {/*底部*/}

            </div>
        )
    }
}