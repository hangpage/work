/**
 * @Description: 浏览历史
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/27 19:35
 */
import React from 'react';
import {Tabs} from "antd";
import Match from "./history/article";
import Activity from "./history/activity";

const History = () => {
  return (
    <div>
        <div className="title-card"><span>浏览历史</span></div>
        <Tabs className='service-tab'>
          <Tabs.TabPane tab='活动' key='0'>
            <Activity/>
          </Tabs.TabPane>
          <Tabs.TabPane tab='文章' key='1'>
            <Match/>
          </Tabs.TabPane>
        </Tabs>
    </div>
  );
};

export default History;
