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
export function equalResultStatus(data){
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


export function getParams(paramString){
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
