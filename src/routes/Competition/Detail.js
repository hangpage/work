/**
 * @Description: 比赛详情页
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/1/30 23:26
 */
import React from 'react';
import ReportCard from "../../components/ReportCard/ReportCard";
import {connect} from "dva";

const Detail = ({data}) => {
  return (
    <div className='second-bg'>
      <div className="w">
        <ReportCard
          time={data.createTime}
          read={data.joinCount}
          title={data.name}
          content={data.content}
          mId={data.id}
          reportLink={`/team_info_write?mId=${data.id}`}
        />
        <div className='competition-detail' dangerouslySetInnerHTML={{__html: data.content}} />
      </div>
    </div>
  );
};

export default connect(({competitionDetail}) => (competitionDetail))(Detail);
