/**
 * @Description: 园区入驻
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/12 17:12
 */
import React from 'react';
import {connect} from "dva";
import {Col, Pagination, Row} from "antd";
import {Link} from 'dva/router';

const Index = ({list, count}) => {
  return (
    <div className='pt40 pb80'>
      <div className="w">
        <Row gutter={59}>
          {list.map((item, index) => {
            return (
              <Col key={index} span={12}>
                <Link to={`/park/parkStep1?id=${item.id}`}>
                  <div className="park-card">
                    <img src={`${item.pic}`} alt=""/>
                    <div className="content">
                      <p className='title'>{item.name}</p>
                      <p className="intro">
                        <span style={{fontWeight: 'bold'}}>介绍：</span>{item.intro}
                      </p>
                    </div>
                  </div>
                </Link>
              </Col>
            )
          })}
        </Row>
        <Pagination total={count}/>
      </div>
    </div>
  );
};

export default connect(({park}) => (park))(Index);
