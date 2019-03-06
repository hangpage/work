/**
 * @Description: 我的活动
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/17 16:58
 */
import React from 'react';
import {connect} from "dva";
import {Link} from "dva/router";
import HorizontalCard from "../../components/HorizontalCard/HorizontalCard";
import {Empty} from "antd";

const Match = ({activityData}) => {
  return (
      <div>
        <div className="title-card"><span>我的活动</span></div>
        <div className='pl20 pr 20'>
          {activityData.length ? activityData.map((item, index) => {
            return (
              <Link key={index} to={`/activity/${item.id}`}>
                <HorizontalCard style={{marginTop: 40}} img={item.pic} time={item.createTime}
                                title={item.title} count={item.count} desc={item.intro} status={item.status}/>
              </Link>
            )
          }) : <Empty/>}
        </div>
      </div>
  );
};

export default connect(({home}) => (home))(Match);
