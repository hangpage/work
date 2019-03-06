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

const Match = ({historyMatch}) => {
  return (
    <div className='pl20 pr 20'>
      {historyMatch.length ? historyMatch.map((item, index) => {
        return (
          <Link key={index} to={`/competition/${item.id}`}>
            <HorizontalCard style={{marginTop: 40}} img={item.pic} time={item.createTime}
                            title={item.name} count={item.joinCount} desc={item.intro} status={item.status}/>
          </Link>
        )
      }) : <Empty/>}
    </div>
  );
};

export default connect(({home}) => (home))(Match);
