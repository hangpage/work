/**
 * @Description: 
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/25 10:58
 */
import React from 'react';
import HomeServiceCard from "../../../components/HomeServiceCard/HomeServiceCard";
import {connect} from "dva";
import {Empty} from "antd";

const Service = ({service}) => {
  return (
    <div style={{padding: '40px 20px 60px'}}>
      {service.length ? service.map((item, index) =>
        <HomeServiceCard key={index} status={item.status} name={item.name} time={item.createTime} phone={item.phone} content={item.content}/>
      ) : <Empty/>}
    </div>
  );
};

export default connect(({home}) => home)(Service);
