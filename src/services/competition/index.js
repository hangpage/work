import request from '../../utils/request';
import qs from 'qs';

export function findList(params) {
  return request(`/api/match/findList?${qs.stringify(params)}`);
}

/**
* @Description: 获取比赛详情
* @Param:  mId 比赛ID
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2019/2/11 17:06
*/
export function getTeamDetail(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/team/getTeamDetail?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}

/**
* @Description: 比赛报名
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2019/2/11 19:58
*/

export function insertTeam(formData){
  return request(`/api/team/insertTeam`,{
    method: 'post',
    body: formData
  });
}


/**
 * @Description: 更新比赛报名信息
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/11 19:58
 */

export function updateTeam(formData){
  return request(`/api/team/updateTeam`,{
    method: 'post',
    body: formData
  });
}

/**
 * @Description: 比赛报名
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/11 19:58
 */

export function insertProject(formData){
  return request('/api/team/insertProject',{
    method: 'post',
    body: formData
  });
}


/**
 * @Description: 获取比赛详情
 * @Param: id：比赛id
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/11 19:58
 */
export function matchGet(params={}){
  return request(`/api/match/get?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}

/**
 * @Description: 获取比赛详情
 * @Param: id：比赛id
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/11 19:58
 */
export function teamFindMatchDetail(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/team/findMatchDetail?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}

/**
 * @Description: 获取比赛详情
 * @Param: id：比赛id
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/11 19:58
 */
export function saveScore(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/tutor/score?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}


/**
* @Description: 更新团队档案信息
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2019/2/28 23:31
*/

export function updateTeamInfo(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/dataUpdate/save?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}
