import React from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import ShenheUserList from './shenhe-user-list';
import AllAllUserList from './all-user-list';
import UserShenFenRenZheng from './user-shenfenrenzheng';
import './user.less';
export default class User extends React.Component{

    callback(key) {
        console.log(key);
    }

    render(){
        return (
            <div className='user'>
                <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                    <TabPane tab="未审核用户" key="1">
                        <ShenheUserList/>
                    </TabPane>
                    <TabPane tab="全部用户" key="2">
                        <AllAllUserList/>
                    </TabPane>
                    <TabPane tab="身份认证" key="3">
                        <UserShenFenRenZheng/>
                    </TabPane>
                    {/*<TabPane tab="待审核" key="2">*/}
                    {/**/}
                    {/*</TabPane>*/}
                </Tabs>
            </div>
        )
    }
}