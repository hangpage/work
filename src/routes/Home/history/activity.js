/**
 * @Description: 比赛
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/17 16:58
 */
import React from 'react';
import {connect} from "dva";
import {Link} from "dva/router";
import HorizontalCard from "../../../components/HorizontalCard/HorizontalCard";
import Empty from "antd/es/empty";
import {Pagination} from "antd";

const Activity = ({historyActivity, historyActivityCount, dispatch}) => {
  const onPageChange = (pageNo, pageSize) => {
    dispatch({
      type: 'home/historyActivity',
      payload: {
        pageNo,
        pageSize
      }
    })
  };
  return (
    <div className='pl20 pr 20'>
      {historyActivity.length ? historyActivity.map((item, index) => {
        return (
          <Link key={index} to={`/activity/${item.id}`}>
            <HorizontalCard style={{marginTop: 40}} img={item.pic} time={item.createTime} countDesc='阅读量'
                            title={item.title} count={item.count} desc={item.intro} status={item.status}/>
          </Link>
        )
      }) : <Empty/>}
      <Pagination total={historyActivityCount} onChange={onPageChange} pageSize={4} className='mt30'/>
    </div>
  );
};

export default connect(({home}) => (home))(Activity);
