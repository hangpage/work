/**
 * @Description:
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/26 18:10
 */
import React from 'react';
import {Tabs} from "antd";
import System from './message/system';
import Awesome from './message/awesome';
import Comment from './message/comment';

const Message = () => {
  return (
    <div>
      <div className="title-card"><span>我的消息</span></div>
      <Tabs className='service-tab'>
        <Tabs.TabPane tab='系统消息' key='0'>
          <System/>
        </Tabs.TabPane>
        <Tabs.TabPane tab='赞' key='1'>
          <Awesome/>
        </Tabs.TabPane>
        <Tabs.TabPane tab='评论' key='2'>
          <Comment/>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Message;
