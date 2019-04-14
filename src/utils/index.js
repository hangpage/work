import pathToRegexp from 'path-to-regexp';
import {cloneDeep} from 'lodash';
import moment from "moment";

export function pathMatchRegexp(regexp, pathname) {
  return pathToRegexp(regexp).exec(pathname)
}

/**
 * @Description: 通用后端返回值状态判断 只根据statusMsg返回布尔
 * @Param:
 * @return:  boolean
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/10 17:42
 */
export function equalResultStatus(data = {}) {
  return data.statusMsg === 'success';
}

/**
 * @Description: 转换getFieldsValue获取的data，防止有undefined和moment类型的数据
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/11 20:08
 */
export function reFormatParams(map) {
  let queryData = cloneDeep(map);
  for (let p in queryData) {
    if (typeof queryData[p] !== 'boolean' && typeof queryData[p] !== 'number' && !queryData[p]) {
      queryData[p] = '';
    } else {
      if (queryData[p] instanceof moment) {
        queryData[p] = moment(queryData[p]).format('YYYY-MM-DD');
      }
    }
  }
  return queryData;
}

export function convertStringToRangeDate(stringDate, split = '~') {
  if (typeof stringDate === 'string') {
    const array = stringDate.split(split);
    return [moment(array[0]), moment(array[1])];
  }
  return stringDate;
}


export function getParams(paramString) {
  let params = {};
  if (paramString !== '') {
    const kvs = paramString.replace('?', '').split('&');
    for (let i = 0; i < kvs.length; i++) {
      let kv = kvs[i].split('=');
      params[kv[0]] = kv[1];
    }
  }
  return params;
}


export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


export function validateIsResident() { //大于等于2表示入驻
  if (JSON.parse(sessionStorage.getItem('user')).residentTeamStatus >= 2) {
    return true;
  }
  return false;
}

export function isEnd(date1) {
  const oDate1 = new Date(date1);
  const oDate2 = new Date();
  if (oDate1.getTime() > oDate2.getTime()) {//转换成毫秒进行比较
    return false;
  } else {
    return true;
  }
}

export function testId(id) {
  // 1 "验证通过!", 0 //校验不通过
  if(!id){
    return {};
  }
  id = String(id);
  const format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
  //号码规则校验
  if (!format.test(id)) {
    return {'status': 0, 'msg': '身份证号码不合规'};
  }
  //区位码校验
  //出生年月日校验   前正则限制起始年份为1900;
  const year = id.substr(6, 4),//身份证年
    month = id.substr(10, 2),//身份证月
    date = id.substr(12, 2),//身份证日
    time = Date.parse(month + '/' + date + '/' + year),//身份证日期时间戳date
    now_time = Date.parse(new Date()),//当前时间戳
    dates = (new Date(year, month, 0)).getDate();//身份证当月天数
  if (time > now_time || date > dates) {
    return {'status': 0, 'msg': '出生日期不合规'}
  }
  //校验码判断
  const c = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];   //系数
  const b = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];  //校验码对照表
  const id_array = id.split("");
  let sum = 0;
  for (var k = 0; k < 17; k++) {
    sum += parseInt(id_array[k]) * parseInt(c[k]);
  }
  if (id_array[17].toUpperCase() !== b[sum % 11].toUpperCase()) {
    return {'status': 0, 'msg': '身份证校验码不合规'}
  }
  return {'status': 1, 'msg': '校验通过'}
}


export const checkId = (rule, value, callback) => {
  const result = testId(value);
  if (result.status === 0) {
    callback(result.msg);
    return;
  }
  callback();
};

/**
* @Description: 判断用户是否登录
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2019/4/12 12:32
*/
export const isLogin = () => {
  if(sessionStorage.getItem('token')){
    return true
  }
  return false;
};
