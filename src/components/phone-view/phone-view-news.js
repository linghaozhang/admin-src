import React from 'react';
import './phone-view-news.less';

export default class PhoneViewNews extends React.Component{
    render(){

        console.log(2,this.props.content);
        
        let nowTime = parseInt(Date.parse(new Date())) * 1000;
        let time = new Date().toLocaleString().replace(/:\d{1,2}$/,' ');
        let title = this.props.title == '' ? '您还没有输入这篇文章的标题，输入后将在此位置进行显示！' : this.props.title;

        // 判断内容是否为空，若为空置换为默认文本
        let content;
        if(this.props.content==''||this.props.content=='<p ><br></p>'){
            content = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您还没有输入这篇文章的内容，当您输入内容后将在此位置进行显示。您还没有输入这篇文章的内容，当您输入内容后将在此位置进行显示。您还没有输入这篇文章的内容，当您输入内容后将在此位置进行显示。您还没有输入这篇文章的内容，当您输入内容后将在此位置进行显示。<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您还没有输入这篇文章的内容，当您输入内容后将在此位置进行显示。您还没有输入这篇文章的内容，当您输入内容后将在此位置进行显示。您还没有输入这篇文章的内容，当您输入内容后将在此位置进行显示。您还没有输入这篇文章的内容，当您输入内容后将在此位置进行显示。您还没有输入这篇文章的内容，当您输入内容后将在此位置进行显示。您还没有输入这篇文章的内容，当您输入内容后将在此位置进行显示。';
        }else{
            content = this.props.content;
        }

        return (
            <div className="phoneViewComponent">
                <p className="title">
                    {title}
                </p>
                <p className="time">
                    <span>
                        {time}
                    </span>
                </p>
                <div dangerouslySetInnerHTML={{__html:content}} className="content">

                </div>
            </div>
        )
    }
}

PhoneViewNews.defaultProps = {
    title:'', // 新闻标题
    content:'', // 新闻内容
};