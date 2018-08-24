import React from 'react';
import {HashRouter as Router,Route,Link} from 'react-router-dom'; // 路由

import { Icon } from 'antd';
import './index.less';

export default class HomeIndex extends React.Component {

    componentWillMount() {
        console.log(77777,this.props.test);
    }

    /**
     * 跳转至发表页面
     */
    goToPublished() {
        this.props.history.push('/admin/publish/news');
    }

    render() {
        return (
            <div className="homeIndex">
                {/*发表按钮*/}
                <div className="publishedNewBottonBox" onClick={this.goToPublished.bind(this)}>
                    <p><Icon type="edit"/></p>
                    <p className="editTxt">发表</p>
                </div>
            </div>
        )
    }
}