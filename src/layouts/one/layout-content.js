import React from 'react';
import {HashRouter as Router,Route,Link} from 'react-router-dom'; // 路由
import './layout-content.less';


import User from '@containers/user/user'; //用户管理入口
import UserAudit from '@containers/user/user-audit'; //用户管理入口


import FaBu from '@containers/fabu/fabu'; //发布
import FaBuContent from '@containers/fabu/fabu-content'; //发布

import TuijianZijinfangIndex from '@containers/tuijian/zijinfang-index';  //首页资金方推荐
import TuijianZijinfang from '@containers/tuijian/zijinfang';  //资金方推荐
import TuijianBanner from '@containers/tuijian/banner';  //Banner
import TuijianFabu from '@containers/tuijian/fabu';  //发布内容推荐


import BiaoQian from '@containers/biaoqian/biaoqian';  //标签管理
import JianYi from '@containers/jianyi/jianyi';  //建议
import AboutMe from '@containers/about/about';  //AboutMe
import YaoQing from '@containers/yaoqing/yaoqing';  //邀请
import Jubao from '@containers/jubao/jubao';  //举报
import TongZhi from '@containers/tz/tz';  //通知


export default class LayoutContent extends React.Component{


    render(){


        return (
            <div className="layoutContentBox" >
                <div className="layoutContent" style={{padding:'20px 30px'}}>
                    <Route exact path="/admin/user" component={User} /> {/*用户列表*/}
                        <Route path="/admin/user/audit/:id" component={UserAudit} /> {/*用户审核页*/}

                        <Route path="/admin/fabu/fabu" component={FaBu} /> {/*发布管理*/}
                        <Route path="/admin/fabu/fabu-content/:id" component={FaBuContent} /> {/*发布详情页*/}

                    <Route path="/admin/tuijian/zijinfangIndex" component={TuijianZijinfangIndex} /> {/*首页资金方推荐*/}
                    <Route path="/admin/tuijian/zijinfang" component={TuijianZijinfang} /> {/*资金方推荐*/}
                    <Route path="/admin/tuijian/banner" component={TuijianBanner} /> {/*Banner*/}
                    <Route path="/admin/tuijian/fabu" component={TuijianFabu} /> {/*发布内容推荐*/}


                    <Route path="/admin/biaoqian/biaoqian" component={BiaoQian} /> {/*w标签*/}
                    <Route path="/admin/jianyi/jianyi" component={JianYi} /> {/*建议*/}

                    <Route path="/admin/about/about" component={AboutMe} /> {/*AboutMe*/}
                    <Route path="/admin/yaoqing/yaoqing" component={YaoQing} /> {/*AboutMe*/}


                    <Route path="/admin/jubao/jubao" component={Jubao} /> {/*举报*/}
                    <Route path="/admin/tz/tz" component={TongZhi} /> {/*系统通知*/}



                    {/*<Route path="/admin/publish" component={NewsPublish}/> /!*发表*!/*/}
                    {/*<Route exact path="/admin/manage/content" component={ContentManage}/> /!*管理-内容管理*!/*/}
                        {/*<Route path="/admin/manage/content/edit/:id" component={EditNews}/> /!*管理-内容管理-编辑*!/*/}
                    {/*<Route path="/admin/manage/comment" component={CommentManage}/> /!*管理-评论管理*!/*/}

                </div>
            </div>
        )
    }


}