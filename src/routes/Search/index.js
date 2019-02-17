/**
 * @Description: 搜索结果页
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/18 1:01
 */
import React from 'react';
import {Tabs} from "antd";
import ActivityList from "../../components/ActivityList/ActivityList";

const Index = () => {
  return (
    <div>
      <div className="w mb80">
        <Tabs>
          <Tabs.TabPane tab='活动' key={1}>
            <ActivityList url='/api/activity/findList'/>
          </Tabs.TabPane>
          <Tabs.TabPane tab='创业动态' key={2}>
            <ActivityList url='/api/article/findList'/>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
