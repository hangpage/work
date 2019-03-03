/**
 * @Description:
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/11 22:51
 */
import React from 'react';
import {connect} from "dva";
import config from '../../utils/config';
import {Col, Empty, Pagination, Row} from "antd";
import {Link} from 'dva/router';

const ServiceList = ({list, count, match}) => {
  return (
    <div className='w'>
      <div className="service-list-card mt40">
        <Row type='flex'>
          {list.length ? list.map((item, index) => {
            return (
              <Col span={6} key={index}>
                <Link to={`${match.url}/detail`}>
                  <div className="box">
                    <div className='img-box'>
                      <img src={`${config.URL}${item.pic}`} alt=""/>
                    </div>
                    <p className='name'>{item.providerName}</p>
                    <span className='type'>{item.serviceType}</span>
                  </div>
                </Link>
              </Col>
            )
          }) : <Empty/>}
        </Row>
        <Pagination total={count} className='mt10 mb80'/>
      </div>
    </div>
  );
};

export default connect(({serviceList}) => (serviceList))(ServiceList);
