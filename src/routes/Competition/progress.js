/**
 * @Description:
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/27 21:41
 */
import React from 'react';
import {Timeline} from "antd";
import {connect} from "dva";
import qs from "qs";

const Progress = ({location, teamDetail}) => {
  let pen = ' ';
  if (teamDetail.endReview) {
    pen = ''
  }
  const params = qs.parse(location.search.split('?')[1]);
  return (
    <div className='w pt40 pb80'>
      <div style={{background: '#f5f5f5'}}>
        <div style={{width: 470, paddingTop: 53, margin: '0 auto'}}>
          <Timeline pending={pen} pendingDot={<i/>}>
            <Timeline.Item dot={<i className='icon-timeline-circle'/>}><p className='mb12'>报名开始<span>{params.time1}</span></p></Timeline.Item>
            {teamDetail.schoolReview &&
            <Timeline.Item dot={<i className='icon-timeline-circle'/>}><p
              className='mb12'>学校内部评审<span>{params.time2}</span></p>{teamDetail.schoolReview.total}</Timeline.Item>}
            {teamDetail.netReview &&
            <Timeline.Item dot={<i className='icon-timeline-circle'/>}><p
              className='mb12'>网络评审<span>{params.time3}</span></p>{teamDetail.netReview.total}</Timeline.Item>}
            {teamDetail.firstReview &&
            <Timeline.Item dot={<i className='icon-timeline-circle'/>}><p
              className='mb12'>现场答辩初试<span>{params.time4}</span></p>{teamDetail.firstReview.total}</Timeline.Item>}
            {teamDetail.secondReview &&
            <Timeline.Item dot={<i className='icon-timeline-circle'/>}><p
              className='mb12'>现场答辩复试<span>{params.time5}</span></p>{teamDetail.secondReview.total}</Timeline.Item>}
            {teamDetail.endReview &&
            <Timeline.Item dot={<i className='icon-timeline-circle'/>}><p
              className='mb12'>比赛结束<span>{params.time6}</span></p>{teamDetail.endReview.total}</Timeline.Item>}
          </Timeline>
        </div>
      </div>
    </div>
  );
};

export default connect(({competition}) => competition)(Progress);
