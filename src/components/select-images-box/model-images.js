import React from 'react';

class OneImage extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isSelected:false,  //当前是否被选中
            imageBoxborder:'2px solid #eee', //图片的边框，选中状态为'2px solid #108ee9'，未选中状态为'2px solid #eee'
        };
      }

    /*
    * 点击图片 整体实现思路
    *   根据state->isSelected判断当前是否被选中，若为选中状态，则切换成未选中状态，并调用父组件的减少选中方法imageClickReduce
    *   若当前是未选中状态，则调用父组件的imageClickAdd方法
    *       若此方法返回true，则说明当前选择图片还没有超过上限，可以选中，则将当前图片选中；
    *       若接收到false，则说明选中的图片已经超过上限，则不作任何处理
    *
    * */
    imageClick(imageUrl){


        if (this.state.isSelected){ // 若当前为选中

            // 切换为未选中状态
            this.setState({
                imageBoxborder:'2px solid #eee',
                isSelected:false,
            });
            // 调用父组件减少选中方法
            this.props.imageClickReduce(imageUrl);

        }else{  // 若当前为未选中

            // 调用父组件增加选中方法,若还没有选够图片返回true，否则false
            let addFunReturn = this.props.imageClickAdd(imageUrl);

            // 若接收到true，则将当前图片选中
            if (addFunReturn){
                // 切换为选中状态
                this.setState({
                    imageBoxborder:'2px solid #108ee9',
                    isSelected:true,
                });
            }
        }

    }

    render(){
        return(
            <div
                style={{width:'120px',height:'80px',display:'inline-block',margin:'3px',cursor:'pointer'}}
                onClick={this.imageClick.bind(this,this.props.imageUrl)}
            >
                <img src={this.props.imageUrl} alt="" style={{width:'100%',height:'100%',border:this.state.imageBoxborder,padding:'3px'}}/>
            </div>
        )
    }
}


/*
* @props
*   selectImagesUrlList 待选图片列表，数组
*   selectImagesNumber 选择图片的最大数量，number类型，默认值：3
*   selectNumberIsFixed 是否必须选够最大数量，布尔类型，默认值：true
*   nowSelectImagesArray 当前选中的图片列表 数组 无默认
*
*
* */
export default class ModelImages extends React.Component{

    // 构造
      constructor(props) {
          console.log(99999);
        super(props);
        // 初始状态
        this.state = {
            nowSelectList:[], //当前已经选中的图片
        };
      };

      /*
      * 图片被点击-增加选中
      *     获取当前已经选中的图片数量，与要求选中数量进行对比
      *      如果小于则返回true,并将图片地址加入到选中数据中，nowSelectList
      *      如果已经等于最大值，则返回false
      *
      * */
    imageClickAdd(imageUrl){
        console.log(666);

        let nowSelectImagesNumber = this.state.nowSelectList.length;
        // 若还没到最大值
        if (nowSelectImagesNumber < this.props.selectImagesNumber){

            let nowSelectList =  this.state.nowSelectList;
            nowSelectList.push(imageUrl);

            this.setState({nowSelectList:nowSelectList},()=>{
                this.props.selectedArrayNotSave(nowSelectList);
            });

            return true;


        }
        //若已经到最大值
        else{

            return false;

        }

        console.log('增加',imageUrl);
    }

    /*
     * 图片被点击-减少选中
     *
     * 整体实现思路
     *    拿到参数imageUrl，遍历当前选中的图片地址数组state->nowSelectList，找到匹配项并删除
     *
     * */
    imageClickReduce(imageUrl){

        let imageUrlList = this.state.nowSelectList; // 当前图片地址数组
        // 遍历图片地址数据，找到当前数据并删除
        for (let i=0;i<imageUrlList.length;i++){
            if (imageUrlList[i] == imageUrl){
                imageUrlList.splice(i, 1);
            }
        }
        // 重新为图片地址数据赋值
        this.setState({nowSelectList:imageUrlList},()=>{
            this.props.selectedArrayNotSave(imageUrlList);
        });

    }

    render(){

          let iamgesUrlListLen = this.props.selectImagesUrlList.length; // 图片库数量
          let imagesBoxList = []; //展示用的图片列表

          for (let i=0;i<iamgesUrlListLen;i++){
              let oneImage = <OneImage
                  imageUrl={this.props.selectImagesUrlList[i]}
                  key={i}
                  imageClickAdd={this.imageClickAdd.bind(this)}
                  imageClickReduce={this.imageClickReduce.bind(this)}
              />;
              imagesBoxList.push(oneImage);
          }

        return (
            <div>
                {imagesBoxList}
            </div>
        )
    }
}

// 设置组件参数默认值
ModelImages.defaultProps = {
    selectImagesUrlList:[
        // 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2749775473,2983211252&fm=26&gp=0.jpg',
        // 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502182920853&di=3fbd521560c16ec23ed501c315374d38&imgtype=0&src=http%3A%2F%2Fimg.zybus.com%2Fuploads%2Fallimg%2F131213%2F1-131213105511-50.jpg',
        // 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502182934979&di=aa623b74b2534efccf130e6c072492bb&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201606%2F23%2F20160623230843_QncYB.thumb.700_0.jpeg',
        // 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2749775473,2983211252&fm=26&gp=0.jpg',
        // 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502182920853&di=3fbd521560c16ec23ed501c315374d38&imgtype=0&src=http%3A%2F%2Fimg.zybus.com%2Fuploads%2Fallimg%2F131213%2F1-131213105511-50.jpg',
        // 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502182934979&di=aa623b74b2534efccf130e6c072492bb&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201606%2F23%2F20160623230843_QncYB.thumb.700_0.jpeg',
    ],
    selectImagesNumber:3,
    selectNumberIsFixed:true,
};
