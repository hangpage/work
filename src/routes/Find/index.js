/**
 * @Description: 发现
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/1/27 15:26
 */
import React from 'react';
import bannerFaxian from "../../assets/banner/banner-faxian.png";
import {Tabs} from 'antd';

import ActivityList from "../../components/ActivityList/ActivityList";

const Index = () => {
  return (
    <div>
      <div style={{width: '100%'}}>
        <img style={{width: '100%'}} src={bannerFaxian} alt=""/>
      </div>
      <div className="w mb80">
        <Tabs>
          <Tabs.TabPane tab='活动' key={1}>
            <ActivityList url='/api/activity/findList'/>
          </Tabs.TabPane>
          <Tabs.TabPane tab='创业动态' key={2}>
            <ActivityList url='/api/article/findList' linkTo='article'/>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
