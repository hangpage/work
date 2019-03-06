/**
 * @Description:
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/25 8:08
 */
import React from 'react';
import {connect} from "dva";
import Const from '../../../utils/Const';
import {Empty} from "antd";

const Lockers = ({locker}) => {
  return (
    <div style={{padding: '40px 20px 60px'}}>
      {locker.length ? locker.map((item, index) => {
        return (
          <div className="room-card" key={index}>
            <div className="top colorblue">储物柜：{item.lockerName}</div>
            <div className="bottom">
              <span className='status'>{Const.SERVICE_STATUS[item.status]}</span>
              <span className='time'>{item.createTime}</span>
            </div>
          </div>
        )
      }) : <Empty/>}
    </div>
  );
};

export default connect(({home}) => home)(Lockers);
