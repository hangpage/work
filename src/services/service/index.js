import request from '../../utils/request';
import qs from 'qs';


/**
 * @Description: 查询服务类型列表
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/11 17:06
 */
export function findType(params){
  return request(`/api/service/findType?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}


/**
 * @Description: 查询服务
 * @Param: type 服务类型id
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/11 17:06
 */
export function findService(params){
  return request(`/api/service/findService?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}

/**
 * @Description: 查询服务详情
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/12 12:37
 */
export function serviceGet(params){
  return request(`/api/service/getServiceBy?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}

/**
 * @Description: 申请服务
 * @Param: type 服务类型id
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/11 17:06
 */
export function serviceDeclare(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/service/declare?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}


/**
* @Description: 预约参观
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2019/2/12 12:37
*/
export function reservationPark(params){
  return request(`/api/reservation/park?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}

/**
 * @Description: 车位申请
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/12 12:37
 */
export function parkingApply(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/carLicense/appli?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}

/**
 * @Description: 报修
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/12 12:37
 */

export function repairApply(formData){
  return request('/api/repair/appli',{
    method: 'post',
    body: formData
  });
}

/**
 * @Description: 服务申请
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/12 12:37
 */
export function serviceApply(params){
  return request(`/api/repair/appli?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}
/**
 * @Description: 查询储物柜
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/12 12:37
 */
export function serviceQueryLockers(params = {}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/locker/findLockers?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}
/**
 * @Description: 查询储物柜
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/12 12:37
 */
export function serviceLockerAppli(params = {}){
  return request(`/api/locker/appli?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}
/**
 * @Description: 查询储物柜
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/12 12:37
 */
export function serviceQueryMeeting(params = {}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/reservation/findMeetingRoom?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}
/**
 * @Description: 查询储物柜
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/12 12:37
 */
export function serviceMeetingAppli(params = {}){
  params.token = sessionStorage.getItem('token');
  return request(`/api//reservation/reservation?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}
