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
    <div className="bg-white">
      <div className='w'>
        <div className="service-list-card pt39 pb80">
          <Row type='flex'>
            {list.length ? list.map((item, index) => {
              return (
                <Col span={6} key={index}>
                  <Link to={`${match.url}/detail?id=${item.id}`}>
                    <div className="box">
                      <div className='img-box'>
                        <img src={`${config.URL}${item.pic}`} alt=""/>
                      </div>
                      <p className='name'>{item.providerName}</p>
                      <span className='type'>{item.title}</span>
                    </div>
                  </Link>
                </Col>
              )
            }) : <Empty/>}
          </Row>
          <Pagination total={count} className='mt10'/>
        </div>
      </div>
    </div>
  );
};

export default connect(({service}) => (service))(ServiceList);
