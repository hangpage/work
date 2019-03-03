/**
 * @Description: 
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/27 21:41
 */
import React from 'react';
import {Timeline} from "antd";
import Const from '../../utils/Const';
import {getParams} from "../../utils";

const Progress = ({location}) => {
  const params = getParams(location.search);
  let array = [];
  for(let key in Const.MATCH_STATUS){
    if(Const.MATCH_STATUS.hasOwnProperty(key)){
      if(Number(key) > Number(params.status)){
        break;
      }
      array.push(Const.MATCH_STATUS[key]);
    }
  }
  let pen = ' ';
  if(params.status === '12'){
    pen = ''
  }
  return (
    <div className='w pt40 pb80'>
      <div style={{background: '#f5f5f5'}}>
        <div style={{width: 470, paddingTop: 53, margin: '0 auto'}}>
          <Timeline pending={pen} pendingDot={<i/>}>
            {array.map((item, key) => <Timeline.Item dot={<i className='icon-timeline-circle'/>} key={key}>{item}</Timeline.Item>)}
          </Timeline>
        </div>
      </div>
    </div>
  );
};

export default Progress;
