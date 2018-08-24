import { message } from 'antd';

/*
* 顶部出现的全局提示框
* */
export const messageSuccess = (txt) => {
    message.success(txt);
};

export const messageError = (txt) => {
    message.error(txt);
};

export const messageWarning = (txt) => {
    message.warning(txt);
};