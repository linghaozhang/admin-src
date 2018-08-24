import React from 'react';
import PropTypes from 'prop-types';

import {Icon, Modal, Button} from 'antd';
import ModelImages from './model-images';
import OneBox from './one-box';

/*
* 图片选择器
*
* @props
*   selectImagesNumber 选择图片的最大数量，number类型，默认值：3
*   selectNumberIsFixed 是否必须选够最大数量，布尔类型，默认值：true
*   selectImagesUrlList 图片库的图片地址列表 数组 无默认值
*   nowSelectImagesArray 当前选中的图片列表 数组 无默认值
*
* */

export default class SelectImagesBox extends React.Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            modalVisible:false, // 弹出框是否显示
            selectedArrayNotSave:[], // 还未保存的图片列表
        };
    }

    /*
    * 关闭弹出框
    * */
    handleCancel(){
        this.setState({modalVisible:false});
    }

    /*
    * 打开弹出窗
    * */
    openModal(){
        this.setState({modalVisible:true});
    }

    /*
    * 点击确定
    * */
    handleOk(){
        this.props.changeNowSelectedArray(this.state.selectedArrayNotSave);
        this.setState({modalVisible:false})
    }

    /*
    * 还未保存的当前选中图片
    * */
    selectedArrayNotSave(selectedArray){
        this.setState({selectedArrayNotSave:selectedArray});
    }

    render(){
        
        /*
        * 根据props中的最大选择图片数量，生成图片框，同时将图片地址放入，保存至oneBoxList数组中
        * */
        let oneBoxList = []; // 要渲染的图片框
        for (let i=0;i<this.props.selectImagesNumber;i++){
            let nowSelectImagesArray = this.props.nowSelectImagesArray;
            let oneBox =  <OneBox imageUrl={nowSelectImagesArray[i]} key={i} openModalFunc={this.openModal.bind(this)} />;
            oneBoxList.push(oneBox);
        }

        return (
            <div>
                {oneBoxList}
                {/*弹出选择部分*/}
                <div>
                    <Modal
                        title="选择封面"
                        visible={this.state.modalVisible}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                        width={556}
                    >
                        <ModelImages
                            selectImagesUrlList={this.props.selectImagesUrlList} // 图片库图片列表
                            selectImagesNumber={this.props.selectImagesNumber}  // 选择图片的最大值
                            nowSelectImagesArray={this.props.nowSelectImagesArray}  // 当前选中的图片列表
                            selectedArrayNotSave={this.selectedArrayNotSave.bind(this)} // 更新还未保存的当前选中图片函数
                        />
                    </Modal>
                </div>
            </div>
        )
    }
};


// 设置组件参数默认值
SelectImagesBox.defaultProps = {
    selectImagesNumber:3,
    selectNumberIsFixed:true,
};

// 组件参数检查
SelectImagesBox.propTypes ={

};

