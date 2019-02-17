/**
 * @Description: 园区入驻
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/12 17:12
 */
import React from 'react';
import {connect} from "dva";
import config from '../../utils/config';
import {Col, Row} from "antd";

const Index = ({list}) => {
  return (
    <div>
      <div className="w">
        <Row gutter={59}>
          {list.map((item, index) => {
            return (
              <Col key={index} span={12}>
                <div className="park-card">
                  <img src={`${config.Url}${item.pic}`} alt=""/>
                  <div className="content">
                    <p className='title'>{item.name}</p>
                    <p className="intro">
                      <span style={{fontWeight: 'bold'}}>介绍：</span>{item.intro}
                    </p>
                  </div>
                </div>
              </Col>
            )
          })}
        </Row>
      </div>
    </div>
  );
};

export default connect(({park}) => (park))(Index);
