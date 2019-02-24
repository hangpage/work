import request from '../../utils/request';
import qs from "qs";

export function articleFindList(params) {
  return request(`/api/article/findList?${qs.stringify(params)}`);
}
export function articleGet(params={}) {
  params.token = sessionStorage.getItem('token');
  return request(`/api/article/get?${qs.stringify(params)}`);
}

