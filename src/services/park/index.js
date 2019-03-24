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
 * @Description: 团队信息保存成员
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
 * @Description: 删除团队成员
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/11 17:06
 */
export function parkDeleteMember(params){
  return request(`/api/residentTeam/deleteMember?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}


/**
 * @Description: 保存负责人教育经历
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/11 17:06
 */
export function saveStudyExperience(params){
  return request(`/api/residentTeam/saveStudyExperience`,{
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: params,
    credentials: "include"
  });
}


/**
 * @Description: 保存负责人工作经历
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/11 17:06
 */
export function saveWorkExperience(params){
  return request(`/api/residentTeam/saveWorkExperience`,{
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: params,
    credentials: "include"
  });
}

/**
* @Description: 更新成员信息
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2019/3/3 18:59
*/

export function updateMembers(params){
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
