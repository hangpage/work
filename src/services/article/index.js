import request from '../../utils/request';
import qs from "qs";

export function articleFindList(params) {
  return request(`/api/article/findList?${qs.stringify(params)}`);
}

