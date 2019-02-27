/**
 * @Description: 浏览历史
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/27 19:35
 */
import React from 'react';
import {Tabs} from "antd";
import Room from "./service/room";
import Home from "./index";

const History = () => {
  return (
    <div>
      <Home>
        <div className="title-card"><span>浏览历史</span></div>
        <Tabs className='service-tab'>
          <Tabs.TabPane tab='活动' key='0'>
            <Room/>
          </Tabs.TabPane>
          <Tabs.TabPane tab='创业大赛' key='1'>
            <Room/>
          </Tabs.TabPane>
        </Tabs>
      </Home>
    </div>
  );
};

export default History;
