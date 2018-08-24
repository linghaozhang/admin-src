import React from 'react';
import './images.less';
import {messageSuccess,messageError,messageWarning} from '@fun/message'; // 全局提示

import LayoutApi from '@api/layout';
import PublishApi from '@api/publish';

import { Input, Radio, Icon, Select, Button } from 'antd';
import ColumnsSelect from '@components/form/columns-select'; // 分类选择
import ImagesItem from '@components/form/images-item/images-item'; //组图上传单图项
import PhoneView from '@components/phone-view/phone-view';


export default class Images extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            title:'', //标题
            columnKey:'', // 选中的分类Key
            content:[
                {"rid":1, "image":"", "txt":"",},
                {"rid":2, "image":"", "txt":"",},
                {"rid":3, "image":"", "txt":"",},
            ], // 图片集主体内容
            contentId:4, // 图集内容项的唯一ID

            submitBtnLoading:false, //按钮加载状态
        };
      }

    // 标题改变
    titleChange(e){
        this.setState({title:e.target.value});
    }

    // 改变当前选中的栏目分类
    columnsSelectChange(key){
        this.setState({columnKey:key});
    }
    
    //图集中图片内容发生变化
    imagesUpdata(rid,url){
        let data = this.state.content;
        data.map((item,index)=>{
            if(item.rid == rid){
                data[index].image = url;
            };
        });
        this.setState({content:data});
    }

    //图集中文字内容发生变化
    txtUpdata(rid,txt){
        let data = this.state.content;
        data.map((item,index)=>{
            if(item.rid == rid){
                data[index].txt = txt;
            };
        });
        this.setState({content:data});
    }

    //删除图集项目
    imagesDeleteItem(rid){
        let data = this.state.content;
        data.map((item,index)=>{
            if(item.rid == rid){
                data.splice(index,1);
            };
        });
        this.setState({content:data});
    }

    // 点击增加图集按钮
    addContent(){
        let old = this.state.content;
        let con = {"rid":this.state.contentId, "image":"", "txt":"",};
        old.push(con);
        this.setState({ content:old,contentId:(this.state.contentId + 1) });
    };

    submitCheck(){
        // 组数是否大于6组
        if(this.state.content.length < 6 ){
            messageWarning('图集新闻至少需要添加6组图文,您目前的组数过少！');
            return false;
            // 组数是否小于16组
        }else if(this.state.content.length > 16){
            messageWarning('图集新闻最多16组图文,您目前的组数过多！');
            return false;
            // 标题是否过短
        }else if (this.state.title.length < 5){
            messageWarning('请将标题长度控制在5-50个字以内，当前标题长度过短！');
            return false;
            // 标题是否过长
        }else if(this.state.title.length > 50){
            messageWarning('请将标题长度控制在5-50个字以内，当前标题长度过长！');
            return false;
        }else{
            return true;
        }
    }

    /*
    * 提交
    *   参数status 1表示提交到未审核  5表示到草稿箱
    * */
    submitBtn(status){

        // 判断是否符合提交条件
        if(!this.submitCheck()) return false;

        this.setState({submitBtnLoading:true});

        // 图集简介json
        let zutudesArray = [];
        this.state.content.map((item,index)=>{
            zutudesArray.push(item.txt);
        });
        let zutudesObj = {"zutudes":zutudesArray};
        let zutudesStr = JSON.stringify(zutudesObj);

        // 图集图片json
        let zutupicArray = [];
        this.state.content.map((item,index)=>{
            zutupicArray.push(item.image);
        });
        let zutupicObj = {"zutupic":zutudesArray};
        let zutupicStr = JSON.stringify(zutupicObj);


        PublishApi.submitManuscript({
            title:this.state.title,
            column_id:this.state.columnKey,
            type:'zutu',
            content:this.state.content,
            thumb:'',
            zutudes:zutudesStr,
            zutupic:zutupicStr,
            tags:'keyword',
            status:status,
        }).then((data)=>{
            let result = data.data.result; //上传状态

            if (result==200){

                let that = this;

                setTimeout(function () {
                    messageSuccess('发布成功，请等待审核！');
                    // 将提交按钮取消loading状态
                    that.setState({submitBtnLoading:false},()=>{
                        setTimeout(function () {
                            that.props.routeGoToIndex(); //路由跳转至首页
                        },500)
                    });
                },1000);


            }else{
                let txt = '发布失败，错误码：' + isSuccess + '，请稍后再试！';
                messageError(txt);
                // 将提交按钮取消loading状态
                this.setState({submitBtnLoading:false});
            }
        })
    }

    render(){

        let images = this.state.content.map((item,index)=>{
            return <div className="imagesItem" key={index}>
                <ImagesItem
                    key={index}
                    rid={item.rid}
                    imagesUrl={item.image}
                    txt={item.txt}
                    actionUrl={LayoutApi.uploadImageUrl}
                    uploadData={{type:'Manuscript'}}
                    updateImage={this.imagesUpdata.bind(this)}
                    updateTxt={this.txtUpdata.bind(this)}
                    delete={this.imagesDeleteItem.bind(this)}
                />
            </div>
        });

        return (
            <div className="publishImages">
                {/*左侧编辑框*/}
                <div className="leftEdit">
                    {/*标题输入框*/}
                    <div className="titleBox">
                        <p className="titleTitle">标题：</p>
                        <div className="title">
                            <Input size="large" placeholder="标题(5-50字)" className="titleInput" onChange={this.titleChange.bind(this)}/>
                        </div>
                    </div>

                    {/*选择分类*/}
                    <div className="coverBox">
                        <p className="coverTitle">分类：</p>
                        <ColumnsSelect
                            options={this.props.columnsArray} // 选项
                            default={this.props.columnsDefaultKey}  // 默认选项
                            onChange={this.columnsSelectChange.bind(this)}  //选中项改变触发
                        />
                    </div>

                    {/*图集主要内容*/}
                    <div className="addBtnBox">
                        <Button type="primary" size="small" icon="plus" style={{marginTop:'20px'}} onClick={this.addContent.bind(this)}>增加图集项</Button>
                    </div>
                    <div className="imagesContent">
                        {images}
                    </div>

                    {/*按钮操作组*/}
                    <div className="btns">
                        <Button onClick={this.submitBtn.bind(this,5)}>存草稿</Button>
                        {/*<Button type="dashed" style={{margin:'0px 25px'}}>预览</Button>*/}
                        <Button type="primary" icon="rocket" style={{margin:'0px 20px'}} onClick={this.submitBtn.bind(this,1)} loading={this.state.submitBtnLoading}>文章发布</Button>
                        {/*<Button  >预览</Button>*/}
                    </div>
                </div>
                {/*手机效果预览*/}
                <div className="rightPreview">
                    <PhoneView
                        title={this.state.title}
                        content={this.state.content}
                        type={"images"}
                    />
                </div>

            </div>
        )
    }
}