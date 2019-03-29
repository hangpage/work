import request from '../../utils/request';
import qs from 'qs';


/**
* @Description: 导师申请
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2019/2/11 17:06
*/
export function tutorDeclare(formData){
  return request('/api/tutor/declare',{
    method: 'post',
    body: formData
  });
}
/**
* @Description: 获取导师信息
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2019/3/28 23:08
*/

export function tutorGetInfo(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/tutor/getByToken?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}
