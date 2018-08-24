import React from 'react';
import Api from '@api/tourongApi';
import BiaoQianItem from './biaoqian-item';


export default class BiaoQian extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            allDate:null, //全部数据
        };
      }

    //config类型对照数组
      configArray = ["0","资产类别","资产标签-债权资产","资产标签-股权资产","资产标签-同业业务","资产标签-非标产品","资产标签-投资银行","资产标签-信贷业务","资产标签-衍生品业务", "资产标签-专业服务","资产标签-其他业务","资产行业","机构选择","投资方式","投资阶段","参股方式","需提供资料","资金来源","机构类别","投资行业","资金偏好标签", "投资金额","投资地区","投风控要求","抵押物类型","前期费用","风险偏好","产品偏好","资产信息对接"]

      // 更新/请求数据
    updadeDate(){
        Api.getAllConfig({

        }).then((data)=>{
            console.log(789,data.data);
            this.setState({allDate:data.data});
        })
    }


    componentWillMount() {
        this.updadeDate(); //加载数据
    }

    render(){

        // 遍历生成数据
        let list = this.configArray.map((item,index)=>{
            if (index != 0){
                return (
                    <div key={index} style={{padding:'26px 0px',borderBottom:'1px solid #eee'}}>
                        <BiaoQianItem
                            cat={item}
                            type={index}
                            allDate={this.state.allDate}
                            deletaCallback={this.updadeDate.bind(this)}
                        />
                    </div>
                )
            }
            console.log(index);
        });

        return (
            <div>
                {list}
            </div>
        )
    }
}