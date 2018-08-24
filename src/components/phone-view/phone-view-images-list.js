import React from 'react';
import './phone-view-images-list.less';

/*
 * 图文新闻在列表中的预览
 * */
export default class PhoneViewImagesList extends React.Component{

    render(){

        /*处理默认标题*/
        let title = this.props.title=='' ? '您还未输入标题，标题输入后将在此处进行显示':this.props.title;
        /*处理当前时间*/
        let date = new Date();
        let time = (date.getMonth().toString().length ==1?0+date.getMonth().toString():date.getMonth().toString())+'-'+(date.getDate().toString().length ==1?0+date.getDate().toString():date.getDate().toString())+' '+(date.getHours().toString().length ==1?0+date.getHours().toString():date.getHours().toString())+':'+(date.getMinutes().toString().length ==1?0+date.getMinutes().toString():date.getMinutes().toString());
        /*处理缩略图*/
        let images = this.props.content.map((item,index)=>{
            if (index<3){
                return <div key={index}><img src={item.image} alt=""/></div>
            }else{
                return '';
            }

        });
        // let image = this.props.images[0];
        // let imaggeComponent = image == undefined ? '' : <div className="imgBox"><img src={image} alt=""/></div>


        return (
            <div className="phoneViewImagesList">
                <div className="demoItemNews">
                    <div className="mainBox">
                        <p style={{height:'12px',background:'#eee',margin:'0px 5px',borderRadius:'3px'}}></p>
                        <p style={{height:'12px',margin:'0px 0px',textAlign:'left'}}>
                            <span style={{display:'inline-block',height:'12px',background:'#eee',margin:'4px 5px 4px 4px',borderRadius:'3px',width:'60px',}}></span>
                            <span style={{display:'inline-block',height:'12px',background:'#eee',margin:'4px 5px 4px 0',borderRadius:'3px',width:'30px',}}></span>
                            <span style={{display:'inline-block',height:'12px',background:'#eee',margin:'4px 5px 4px 0',borderRadius:'3px',width:'30px',}}></span>
                        </p>
                        <p style={{height:'8px',margin:'6px 0px',textAlign:'right'}}>
                            <span style={{display:'inline-block',height:'8px',background:'#eee',margin:'4px 5px',borderRadius:'3px',width:'20px',float:'left'}}></span>
                            <span style={{display:'inline-block',height:'8px',background:'#eee',margin:'4px 5px',borderRadius:'3px',width:'20px',float:'left'}}></span>
                            <span style={{display:'inline-block',height:'8px',background:'#eee',margin:'4px 5px',borderRadius:'3px',width:'70px',}}></span>
                        </p>
                    </div>
                    <div className="imgBox"></div>
                </div>
                <div className="demoItemNews">
                    <div className="mainBox">
                        <p style={{height:'12px',background:'#eee',margin:'0px 5px',borderRadius:'3px'}}></p>
                        <p style={{height:'12px',margin:'0px 0px',textAlign:'left'}}>
                            <span style={{display:'inline-block',height:'12px',background:'#eee',margin:'4px 5px 4px 4px',borderRadius:'3px',width:'60px',}}></span>
                            <span style={{display:'inline-block',height:'12px',background:'#eee',margin:'4px 5px 4px 0',borderRadius:'3px',width:'30px',}}></span>
                            <span style={{display:'inline-block',height:'12px',background:'#eee',margin:'4px 5px 4px 0',borderRadius:'3px',width:'30px',}}></span>
                        </p>
                        <p style={{height:'8px',margin:'6px 0px',textAlign:'right'}}>
                            <span style={{display:'inline-block',height:'8px',background:'#eee',margin:'4px 5px',borderRadius:'3px',width:'20px',float:'left'}}></span>
                            <span style={{display:'inline-block',height:'8px',background:'#eee',margin:'4px 5px',borderRadius:'3px',width:'20px',float:'left'}}></span>
                            <span style={{display:'inline-block',height:'8px',background:'#eee',margin:'4px 5px',borderRadius:'3px',width:'70px',}}></span>
                        </p>
                    </div>
                </div>
                <div className="demoItemMyVideo">
                    <div className="mainBox">
                        <p style={{height:'40px',background:'#fff',margin:'0px 5px',borderRadius:'3px',fontSize:'12px',textAlign:'left',fontWeight:'900'}}>
                            {title}
                        </p>
                        <div className="videoBox">
                            {images}
                        </div>

                        <p style={{margin:'3px 0px',textAlign:'left',padding:'0px 5px'}}>
                            <span style={{display:'inline-block',borderRadius:'3px',fontSize:'10px',color:'#999',width:'175px'}}>
                                来源：{G_userNikeName}
                            </span>
                            <span style={{display:'inline',borderRadius:'3px',width:'100px',fontSize:'10px',color:'#999'}}>
                                {time}
                            </span>
                        </p>
                    </div>
                    {/*{imaggeComponent}*/}

                </div>
                <div className="demoItemNews">
                    <div className="mainBox">
                        <p style={{height:'12px',background:'#eee',margin:'0px 5px',borderRadius:'3px'}}></p>
                        <p style={{height:'12px',margin:'0px 0px',textAlign:'left'}}>
                            <span style={{display:'inline-block',height:'12px',background:'#eee',margin:'4px 5px 4px 4px',borderRadius:'3px',width:'60px',}}></span>
                            <span style={{display:'inline-block',height:'12px',background:'#eee',margin:'4px 5px 4px 0',borderRadius:'3px',width:'30px',}}></span>
                            <span style={{display:'inline-block',height:'12px',background:'#eee',margin:'4px 5px 4px 0',borderRadius:'3px',width:'30px',}}></span>
                        </p>
                        <p style={{height:'8px',margin:'6px 0px',textAlign:'right'}}>
                            <span style={{display:'inline-block',height:'8px',background:'#eee',margin:'4px 5px',borderRadius:'3px',width:'20px',float:'left'}}></span>
                            <span style={{display:'inline-block',height:'8px',background:'#eee',margin:'4px 5px',borderRadius:'3px',width:'20px',float:'left'}}></span>
                            <span style={{display:'inline-block',height:'8px',background:'#eee',margin:'4px 5px',borderRadius:'3px',width:'70px',}}></span>
                        </p>
                    </div>
                </div>
                <div className="demoItemNews">
                    <div className="mainBox">
                        <p style={{height:'12px',background:'#eee',margin:'0px 5px',borderRadius:'3px'}}></p>
                        <p style={{height:'12px',margin:'0px 0px',textAlign:'left'}}>
                            <span style={{display:'inline-block',height:'12px',background:'#eee',margin:'4px 5px 4px 4px',borderRadius:'3px',width:'60px',}}></span>
                            <span style={{display:'inline-block',height:'12px',background:'#eee',margin:'4px 5px 4px 0',borderRadius:'3px',width:'30px',}}></span>
                            <span style={{display:'inline-block',height:'12px',background:'#eee',margin:'4px 5px 4px 0',borderRadius:'3px',width:'30px',}}></span>
                        </p>
                        <p style={{height:'8px',margin:'6px 0px',textAlign:'right'}}>
                            <span style={{display:'inline-block',height:'8px',background:'#eee',margin:'4px 5px',borderRadius:'3px',width:'20px',float:'left'}}></span>
                            <span style={{display:'inline-block',height:'8px',background:'#eee',margin:'4px 5px',borderRadius:'3px',width:'20px',float:'left'}}></span>
                            <span style={{display:'inline-block',height:'8px',background:'#eee',margin:'4px 5px',borderRadius:'3px',width:'70px',}}></span>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}