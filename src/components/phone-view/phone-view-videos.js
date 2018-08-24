import React from 'react';
import './phone-view-videos.less';
import ReactPlayer from 'react-player';

/*
* 在手机预览中  视频新闻详情页的预览组件
*
*   @props title，标题，string
*   @props videoUrl，视频地址，string
*
*
* */
export default class PhoneviewVideo extends React.Component{
    render(){

        /*处理当前时间*/
        let date = new Date();
        let time = (date.getMonth().toString().length ==1?0+date.getMonth().toString():date.getMonth().toString())+'-'+(date.getDate().toString().length ==1?0+date.getDate().toString():date.getDate().toString())+' '+(date.getHours().toString().length ==1?0+date.getHours().toString():date.getHours().toString())+':'+(date.getMinutes().toString().length ==1?0+date.getMinutes().toString():date.getMinutes().toString());

        /*处理标题显示文字*/
        let title = this.props.title == '' ? '您还没有输入这篇文章的标题，输入后将在此位置进行显示！' : this.props.title;
        /*处理视频显示格式*/
        let propsVideoUrl = this.props.videoUrl;
        console.log(765,this.props.videoUrl);
        
        let video;
        if (propsVideoUrl==''){
            video = <div className="videoBox">您目前未选择视频</div>
        }else{
            video=  <ReactPlayer
                url={this.props.videoUrl}// 视频播放地址
                // url='https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'// 视频播放地址
                playing={true} // 视频是否播放，true/false，默认false
                loop={false}  // 视频是否能够循环播放，true/false，默认false
                controls={true} // 是否显示控制菜单，true/false，默认false
                volume={0.9} // Sets the volume of the appropriate player 默认0.8
                playbackRate={1} // 播放速度，数字，默认1
                width={'100%'} // 播放器宽度，默认640
                height={'120px'}  // 播放器高度，默认360
                style={{zIndex:999}} // Add inline styles to the root element
                // className={styles.videoBox}
                id="videoBox"
            />
        }

        console.log(video);


        return (
            <div className="phoneViewVideo">
                {video}
                <p className="title">
                    {title}
                </p>
                <p className="source">
                    <span>
                        来源：{G_userNikeName}
                    </span>
                </p>
                <p className="time">
                    <span>
                        {time} 发布
                    </span>
                </p>

            </div>
        )
    }
}