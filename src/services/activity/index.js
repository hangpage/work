import request from '../../utils/request';
import qs from "qs";

export function activityFindList(params) {
  return request(`/api/activity/findList?${qs.stringify(params)}`);
}

export function activityGet(params) {
  return request(`/api/activity/get?${qs.stringify(params)}`);
}


export function activitySign(params) {
  return request(`/api/activity/sign?${qs.stringify(params)}`);
}


