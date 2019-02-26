/**
 * @Description: 
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/25 10:58
 */
import React from 'react';
import HomeRepairCard from "../../../components/HomeRepairCard/HomeRepairCard";
import {connect} from "dva";
import {Empty} from "antd";

const Repair = ({repair}) => {
  return (
    <div style={{padding: '40px 20px 60px'}}>
      {repair.length ? repair.map((item, index) => {
        return (
          <HomeRepairCard room={item.roomNum} key={index} position={item.position} desc={item.content} pic={item.pic}/>
        )
      }) : <Empty/>}
    </div>
  );
};
export default connect(({home}) => home)(Repair);
