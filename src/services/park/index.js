import request from '../../utils/request';
import qs from 'qs';


/**
 * @Description: 查询可入住园区
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/11 17:06
 */
export function parkFindList(params){
  return request(`/api/park/findList?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });

}
/**
 * @Description: 入驻园区第一步接口
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/11 17:06
 */

export function parkResidentTeam(params){
  return request(`/api/residentTeam/save?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}
/**
 * @Description: 入驻园区
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/11 17:06
 */
export function parkSavePrincipal(params){
  return request(`/api/residentTeam/savePrincipal?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}
/**
 * @Description: 入驻园区
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/11 17:06
 */
export function parkSaveMembers(params){
  return request(`/api/residentTeam/saveMembers?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}


/** 
* @Description: 查询个人信息（负责人 成员）
* @Param:  
* @return:  
* @Author: zzhihang@hotmail.com 
* @date: 2019/3/2 0:37
*/


export function queryLeaderAndMemberInfo(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/residentTeam/findPrincipal?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}
