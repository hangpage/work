/**
 * @Description: 比赛
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/17 16:58
 */
import React from 'react';
import Home from "./index";
import {connect} from "dva";
import {Link} from "dva/router";
import HorizontalCard from "../../components/HorizontalCard/HorizontalCard";
import Empty from "antd/es/empty";

const Match = ({matchData}) => {
  return (
    <Home>
      <div>
        <div className="title-card"><span>我的比赛</span></div>
        <div className='pl20 pr 20'>
        {matchData.length ? matchData.map((item, index) => {
          return (
            <Link key={index} to={`/competition/${item.id}?from=home&isTutor=${item.isTutor}&status=${item.status}`}>
              <HorizontalCard style={{marginTop: 40}} img={item.pic} time={item.createTime}
                              title={item.name} count={item.joinCount} desc={item.content} status={item.status}/>
            </Link>
          )
        }) : <Empty/>}
        </div>
      </div>
    </Home>
  );
};

export default connect(({home}) => (home))(Match);
