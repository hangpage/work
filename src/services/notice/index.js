import request from '../../utils/request';
import qs from "qs";

/**
* @Description: 公告列表
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2019/2/12 18:35
*/
export function noticeFindList(params) {
  return request(`/api/notice/findList?${qs.stringify(params)}`);
}

export function messageFindList(params={}) {
  params.token = sessionStorage.getItem('token');
  return request(`/api/notice/findMessageList?${qs.stringify(params)}`);
}


export function slideShow(params) {
  return request(`/api/slideShow/findSlideShow?${qs.stringify(params)}`);
}


export function noticeGet(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/notice/get?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}
