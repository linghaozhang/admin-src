

// fetch请求header
const fetchHeader = {
    // "Content-Type":"application/json",
    'Authorization':'Bearer '+G_token,
};

// fetch请求封装
// 参数说明：url -> 请求地址  options -> 请求参数 {"userName":"name"}
function fetchService(url , options) {
    return fetch(url,options).then(function(response) {
        
        console.log(7744,response);
        
        if( response.status == 200 ){
            return response.json();
        }else{
            console.log('请求出错，错误信息：',response);
            return response;
        }
    })
};




/*
 * API统一封装函数
 *
 * */
export const sendFetch = function (method,url,options) {

    if (method=='GET'){
        // 使用fetch进行HTTP请求
        return fetchService( url,{
            method: method,
            headers: fetchHeader,
        });
    }else{
        // 使用fetch进行HTTP请求
        return fetchService( url,{
            method: method,
            headers: fetchHeader,
            body:JSON.stringify(options)
        });
    }



};