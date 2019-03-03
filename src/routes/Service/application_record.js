/**
 * @Description:
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/24 11:48
 */
import React from 'react';
import ParkRecord from "../../components/ParkRecord/ParkRecord";
import {connect} from "dva";
import {Empty} from "antd";

const ApplicationRecord = ({parkRecordList}) => {
  return (
    <div className='second-bg pt39 pb79'>
      <div className="w bg-white">
        {parkRecordList.length ? parkRecordList.map((item, index) =>
          <ParkRecord name={item.name} status={item.status} createTime={item.createTime} key={index} carNumber={item.carNumber} mobile={item.phone} model={item.model}/>
        ) : <Empty/>}
      </div>
    </div>
  );
};

export default connect(({service}) => service)(ApplicationRecord);
