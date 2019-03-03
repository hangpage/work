/**
 * @Description: 搜索结果页
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/18 1:01
 */
import React from 'react';
import {Input, Tabs} from "antd";
import ActivityList from "../../components/ActivityList/ActivityList";
import {getParams} from "../../utils";

const Search = ({location}) => {
  const title = getParams(location.search).q;
  return (
    <div>
      <div className="w mb80">
        <div style={{background: '#fafafa', borderBottom: '1px solid rgba(153, 153, 153, 0.1)'}}>
          <div className="w" style={{minHeight: '88px', lineHeight: '88px',}}>
            <Input className='result-search' placeholder='输入感兴趣的内容' autoFocus={true} style={{background: 'transparent', border: 'none'}}/>
          </div>
        </div>
        <Tabs>
          <Tabs.TabPane tab='活动' key={1}>
            <ActivityList url={`/api/activity/findList?title=${title}`}/>
          </Tabs.TabPane>
          <Tabs.TabPane tab='创业动态' key={2}>
            <ActivityList url={`/api/article/findList?title=${title}`}/>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Search;
