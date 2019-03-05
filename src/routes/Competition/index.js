/**
 * @Description: 比赛首页
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/1/27 18:24
 */
import React from 'react';
import {connect} from "dva";
import CompetitionCard from "../../components/CompetitionCard/CompetitionCard";
import config from '../../utils/config';
import {Col, Pagination, Row} from "antd";
import {Link} from "dva/router";

const Index = ({list, count, pageSize, pageNo, match, dispatch}) => {
  const comps = list.map((item, index) => {
    return (
      <Col span={8} key={index}>
        <Link to={`${match.url}/${item.id}?park=${item.park}`}>
          <CompetitionCard
            key={index}
            img={`${config.URL}${item.pic}`}
            title={item.name}
            time={item.createTime}
            read={item.joinCount}
            status={item.status}
          />
        </Link>
      </Col>
    )
  });

  const onPageChange = (pageNo, pageSize) => {
    dispatch({
      type: 'competition/queryCompetitionList',
      payload: {
        pageNo,
        pageSize
      }
    })
  };
  return (
    <div className="bg-white pt40 pb80">
      <div className='w'>
        <div className='competition'>
          <Row gutter={60} style={{width: '100%'}}>
            {comps}
          </Row>
        </div>
        <Pagination total={count} onChange={onPageChange} pageSize={9}/>
      </div>
    </div>
  );
};


export default connect(({competition}) => (competition))(Index);
