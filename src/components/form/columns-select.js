
import React from 'react';
import { Select,  } from 'antd';


/*
* 分类选择框
*
* @props
*
*   参数：options 说明：选项列表 类型:Array  默认值：[]
*   参数：default 说明：默认选中项Key 类型:String/Number
*   参数：onChange(key) 说明：当选项变化时的回调，参数为回传选中项key 类型:Function
*
* */

export default class ColumnsSelect extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selectedKey:null, //当前选中项的key
        };
      }

      //选中项改变时
    onChange(key){
          /*
          * 定义name用来保存选中项目的文字内容
          * 遍历选项组的数据，找到key对应的一组数据，将其中的文字内容保存至name
          * 回调父组件的选项更改函数，将key和name回传
          *
          * */
        let name = '';
        for (let i=0;i<this.props.options.length;i++){
            if (this.props.options[i].column_id == key) name = this.props.options[i].column_name;
        }
        console.log(this.props.options);

        this.props.onChange(key,name);
        this.setState({selectedKey:key}); //记录到state

    }

    componentWillMount() {
        // 设置默认值
        this.setState({selectedKey:this.props.default}); //记录到state
        this.props.onChange(this.props.default); //回传给父组件
    }

    render(){
        
        //渲染栏目分类列表
        let options = this.props.options;
        let columnsList = options.map((item,index)=>{
            return <Select.Option value={item.column_id} key={item.column_id}>{item.column_name}</Select.Option>
        });

        return (
            <Select
                style={{ width: 120 }}
                value={this.state.selectedKey}
                onChange={this.onChange.bind(this)}
            >
                {columnsList}
            </Select>
        )
    }
}


ColumnsSelect.defaultProps = {
    options:[],
};