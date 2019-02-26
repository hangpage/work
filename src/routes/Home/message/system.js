/**
 * @Description:
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/26 18:12
 */
import React from 'react';
import {connect} from "dva";
import SystemMessage from "../../../components/SystemMessage/SystemMessage";
import {Empty} from "antd";

const System = ({system}) => {
  return (
    <div style={{padding: '59px 20px 68px'}}>
      {system.length ? system.map((item, key) =>
        <SystemMessage time={item.createTime} key={key} title={item.title}/>
      ) : <Empty/>}
    </div>
  );
};

export default connect(({home}) => home)(System);
