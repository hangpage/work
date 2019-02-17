import request from '../../utils/request';
import qs from 'qs';

export function getValidateCode(phone){
  return request(`/api/user/sendCode?phone=${phone}`,{
    method: 'get',
    headers: new Headers(),
    credentials: "include"
  });
}

export function login(params){
  return request(`/api/user/regist?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}
