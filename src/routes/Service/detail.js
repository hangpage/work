/**
 * @Description: 服务详情页
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/1/30 23:26
 */
import React from 'react';
import ReportCard from "../../components/ReportCard/ReportCard";
import {connect} from "dva";

const Detail = ({detail}) => {
  return (
    <div className='second-bg'>
      <div className="w">
        <div className="card">

        </div>
        <div className='competition-detail' dangerouslySetInnerHTML={{__html: detail.content}} />
      </div>
    </div>
  );
};

export default connect(({service}) => (service))(Detail);
