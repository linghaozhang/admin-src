/**
 * Created by Xin on 17/8/8.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Icon, Modal, Button} from 'antd';

export default class OneBox extends React.Component{

    /*
     * @props imageUrl 图片地址
     *
     * */

    render(){

        /*
         * 若有图片，则展示图片，若没有图片，则展示默认图像
         * */
        if(this.props.imageUrl == ''){
            return (
                <div
                    style={{
                        width:'120px',height:'80px',marginRight:'8px',display:'inline-block',border:'1px solid #eee',
                        textAlign:'center',lineHeight:'80px',cursor:'pointer'
                    }}
                    onClick={this.props.openModalFunc}
                >
                    <Icon
                        type="plus"
                        style={{
                            fontSize:'26px',color:'#ccc'
                        }}
                    />
                </div>
            )
        }else{
            return (
                <div
                    style={{
                        width:'120px',height:'80px',marginRight:'8px',display:'inline-block',border:'1px solid #eee',
                        textAlign:'center',lineHeight:'80px',cursor:'pointer'
                    }}
                    onClick={this.props.openModalFunc}
                >
                    <img src={this.props.imageUrl} style={{width:'100%',height:'100%'}}/>
                </div>
            )
        }

    }
}

// 设置组件参数默认值
OneBox.defaultProps = {
    imageUrl:'',
};