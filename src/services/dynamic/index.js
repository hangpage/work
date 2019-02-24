import request from '../../utils/request';
import qs from 'qs';


/**
 * @Description: 点赞
 * @Param: type 信息类型 1文章2活动3动态4评论  msgId 信息id
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/11 17:06
 */
export function dynamicAwesome(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/dynamic/awesome?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}

/**
 * @Description: 举报
 * @Param: type 信息类型 1文章2活动3动态4评论5通知  msgId 信息id
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/11 17:06
 */
export function dynamicReport(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/dynamic/report?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}

/**
 * @Description: 评论
 * @Param: type 信息类型 1文章2活动3动态4评论5通知  msgId 信息id
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/11 17:06
 */
export function dynamicComment(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/dynamic/commont?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}
