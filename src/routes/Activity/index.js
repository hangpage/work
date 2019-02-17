/**
 * @Description: 活动列表
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/1/27 18:24
 */
import React from 'react';
import {connect} from "dva";
import config from '../../utils/config';
import {Col, Pagination, Row} from "antd";
import {Link} from "dva/router";
import ActivityCard from "../../components/ActivityCard/ActivityCard";

const Index = ({list, count, match}) => {
  const comps = list.map((item, index) => {
    return (
      <Col span={8} key={index}>
        <Link to={`${match.url}/${item.id}?park=${item.park}`}>
          <ActivityCard
            key={index}
            img={`${config.URL}${item.pic}`}
            title={item.title}
            time={item.createTime}
            read={item.pageViews}
          />
        </Link>
      </Col>
    )
  });
  return (
    <div className='w' style={{marginTop: 40, marginBottom: 80}}>
      <Row gutter={59}>
        {comps}
      </Row>
      <Pagination total={count} className='mt60'/>
    </div>
  );
};


export default connect(({activity}) => (activity))(Index);
