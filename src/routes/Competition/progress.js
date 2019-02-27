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
  return (
    <div className='w pt40 pb80'>
      <div className="second-bg">
        <div style={{width: 470, paddingTop: 53, margin: '0 auto'}}>
          <Timeline>
            {array.map((item, key) => <Timeline.Item key={key}>{item}</Timeline.Item>)}
          </Timeline>
        </div>
      </div>
    </div>
  );
};

export default Progress;
