import React from 'react';
import './content.less';
import { Input, Tabs } from 'antd';
const Search = Input.Search;
const TabPane = Tabs.TabPane;

import NewsList from './news-list';

export default class ContentManage extends React.Component{

    // TAB切换时
    tabChange(){
        // console.log('tab切换');
    }
    
    render(){
        return (
            <div className="contentManage">
                {/*顶部*/}
                <div className="top">
                    <Search
                        placeholder="输入搜索内容..."
                        style={{ width: 200 }}
                        // onSearch={value => console.log(value)}
                    />
                </div>

                {/*tab切换 0全部 1审核中 2回收站 4已发布 5草稿 6审核未通过*/}
                <div style={{padding:'10px 20px'}}>
                    <Tabs defaultActiveKey="1" onChange={this.tabChange.bind(this)}>
                        <TabPane tab="全部" key="1">
                            <NewsList
                                status="0"
                            />
                        </TabPane>
                        <TabPane tab="已发布" key="2">
                            <NewsList
                                status="4"
                            />
                        </TabPane>
                        <TabPane tab="审核中" key="3">
                            <NewsList
                                status="1"
                            />
                        </TabPane>
                        <TabPane tab="未通过" key="4">
                            <NewsList
                                status="6"
                            />
                        </TabPane>
                        <TabPane tab="草稿" key="5">
                            <NewsList
                                status="5"
                            />
                        </TabPane>
                        <TabPane tab="已撤回" key="6">
                            <NewsList
                                status="2"
                            />
                        </TabPane>
                    </Tabs>
                </div>

                <div>

                </div>

            </div>
        )
    }
}