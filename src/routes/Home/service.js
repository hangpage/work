/**
 * @Description:
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/25 8:06
 */
import React from 'react';
import {Tabs} from "antd";
import Room from './service/room'
import Repair from './service/repair'
import Lockers from './service/lockers'
import Service from './service/service'
import Home from "./index";

const ServiceTab = () => {
  return (
      <Home>
        <div className="title-card"><span>我的服务</span></div>
        <Tabs className='service-tab'>
          <Tabs.TabPane tab='会议室预约' key='0'>
            <Room/>
          </Tabs.TabPane>
          <Tabs.TabPane tab='储物柜申请' key='1'>
            <Lockers/>
          </Tabs.TabPane>
          <Tabs.TabPane tab='报修' key='2'>
            <Repair/>
          </Tabs.TabPane>
          <Tabs.TabPane tab='服务' key='3'>
            <Service/>
          </Tabs.TabPane>
        </Tabs>
      </Home>
  );
};

export default ServiceTab;
