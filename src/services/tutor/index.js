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
