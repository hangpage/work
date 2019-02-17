import request from '../../utils/request';
import qs from 'qs';


/**
 * @Description: 请求个人信息
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/11 17:06
 */
export function userGetInfo(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/user/getByToken?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}


export function userUpdateInfo(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/user/updateByToken?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}



export function userLeavePark(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/leave/save?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}
