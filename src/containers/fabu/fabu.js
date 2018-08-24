import React from 'react';
import { Tabs,Table } from 'antd';
const TabPane = Tabs.TabPane;

import FaBuList from './fabu-list';

export default class FaBu extends React.Component{

    callback(key) {
        console.log(key);
    }

    render(){
        return (
            <div>
                <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                    <TabPane tab="发布信息列表" key="1">
                        <FaBuList/>
                    </TabPane>
                    {/*<TabPane tab="待审核" key="2">*/}
                    {/**/}
                    {/*</TabPane>*/}
                </Tabs>
            </div>
        )
    }
}