/**
 * @Description: 
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/25 8:08
 */
import React from 'react';
import {connect} from "dva";
import Const from "../../../utils/Const";
import {Empty} from "antd";

const Room = ({room}) => {
  return (
    <div style={{padding: '40px 20px 60px'}}>
      {room.length ? room.map((item, index) => {
        return (
          <div className="room-card" key={index}>
            <div className="top">
              <div className="appoint-time">{item.startTime}-{item.endTime}</div>
              <div className="status">{Const.SERVICE_STATUS[item.status]}</div>
            </div>
            <div className="bottom">
              <span className='status colorblue'>{item.meetingRoomNum}</span>
              <span className='time'>{item.createTime}</span>
            </div>
          </div>
        )
      }) : <Empty/>}
    </div>
  );
};

export default connect(({home}) => home)(Room);
