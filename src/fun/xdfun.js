/*
* 本文件是为了工作方便，封装的一些工作中常用的函数
*
* 以下是截止目前的所有函数目录，方便快速查找
*
*   getData()  处理时间戳，返回指定的日期格式
*
*
* */


/*
 * getData() 日期处理
 *
 *   @parameter Name:timestamp,Tip:时间戳,Type:Number,Default:当前时间戳
 *   @parameter Name:type,Tip:返回格式类型,Type:Number,Default:1
 *
 *   @return string 处理后的日期
 *
 *   @example  type=1 , return '2017-08-17 14:29:47'
 *
 *
 * */
export function getData(timestamp,type){

    // 处理时间戳位数
    let _timestamp = timestamp.toString(); // 转字符串

    if(_timestamp.length==10){
        _timestamp = _timestamp + '000';
    }else if (_timestamp.length==13){
        _timestamp = _timestamp ;
    }else{
        console.log('xdfun错误信息：getData()方法中，timestamp参数传入的时间戳位数错误');
    }

    _timestamp = parseInt(_timestamp);

    // _timestamp => 13位时间戳 => eg:1502778294000

    // 获取用到的各个单位
    let _date = new Date(_timestamp); // 获取时间对象
    let year = _date.getFullYear(); // 年
    let _month = (_date.getMonth()+1).toString(); // 月，1-9是1位数,eg：8
    let month = ((_date.getMonth()+1).toString()).length==1?0+((_date.getMonth()+1).toString()):((_date.getMonth()+1).toString()); // 月，1-9是2位数,eg:08
    let _day = (_date.getDate().toString()); // 日，1位数,eg：8
    let day = (_date.getDate().toString()).length ==1?0+(_date.getDate().toString()):(_date.getDate().toString()); // 日，1位数,eg：08
    let _hour = (_date.getHours().toString()); // 小时，1位数,eg：8
    let hour = (_date.getHours().toString()).length ==1?0+(_date.getHours().toString()):(_date.getHours().toString()); // 小时，1位数,eg：08
    let _minute = (_date.getMinutes().toString()); // 分，1位数,eg：8
    let minute = (_date.getMinutes().toString()).length ==1?0+(_date.getMinutes().toString()):(_date.getMinutes().toString()); // 分，1位数,eg：08
    let _second = (_date.getSeconds().toString()); // 秒，1位数,eg：8
    let second = (_date.getSeconds().toString()).length ==1?0+(_date.getSeconds().toString()):(_date.getSeconds().toString()); // 秒，1位数,eg：08
    let week = _date.getDay()+1; // 星期 1-7

    if(type==1){
        // yyyy-mm-dd hh:mm:ss
        return (year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second);
    }


}

/*
 * getUrlPar() 从域名栏获取参数
 *
 *   @parameter Name:name,Tip:参数名,Type:String,Default:''
 *
 *   @return string 获取到的参数值
 *
 * */
export function getUrlPar(name){
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
};


/*
 * ArrayRemoveByValue 删除数组中指定项目
 *
 *   @parameter arr 数组
 *   @return val 要删除的内容
 *
 * */
export function ArrayRemoveByValue(arr,val){
    let newArr = [];
    for(var i=0; i<arr.length; i++) {
        if(arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
    return arr;
};

