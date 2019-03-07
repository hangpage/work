/**
 * @Description: 比赛
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/17 16:58
 */
import React from 'react';
import {connect} from "dva";
import {Link} from "dva/router";
import HorizontalCard from "../../components/HorizontalCard/HorizontalCard";
import Empty from "antd/es/empty";
import qs from "qs";

const Match = ({matchData}) => {
  return (
    <div>
      <div className="title-card"><span>我的比赛</span></div>
      <div className='pl20 pr 20'>
        {matchData.length ? matchData.map((item, index) => {
          const params = {
            from: 'home',
            isTutor: item.isTutor,
            time1: item.signStartTime,
            time2: item.signStartTime,
            time3: item.signStartTime,
            time4: item.signStartTime,
            time5: item.signStartTime,
            time6: item.signStartTime,
          };
          return (
            <Link key={index}
                  to={`/competition/${item.id}?${qs.stringify(params)}`}>
              <HorizontalCard style={{marginTop: 40}} img={item.pic} time={item.createTime}
                              title={item.name} count={item.joinCount} desc={item.intro} status={item.status}/>
            </Link>
          )
        }) : <Empty/>}
      </div>
    </div>
  );
};

export default connect(({home}) => (home))(Match);
