/**
 * @Description:
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/27 21:41
 */
import React from 'react';
import {Button, Popover, Timeline} from "antd";
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
            <Timeline.Item dot={<i className='icon-timeline-circle'/>}><div
              className='mb12'>报名开始<div>{params.time1}</div></div></Timeline.Item>
            {teamDetail.schoolReview &&
            <Timeline.Item dot={<i className='icon-timeline-circle'/>}><div
              className='mb12'>学校内部评审<div>{params.time2}</div>
            </div>{String(teamDetail.schoolReview.status) === '1' ? '晋级下一轮' : '未晋级下一轮'}</Timeline.Item>}
            {teamDetail.netReview &&
            <Timeline.Item dot={<i className='icon-timeline-circle'/>}><div
              className='mb12'>网络评审<div>{params.time3}{
              String(teamDetail.netReview.status) === '1' && <Popover
                content={<img className="progress_qrcode" src={teamDetail.netReview.qrcode}/>} title="请扫描二维码加入群聊" trigger="click">
                <Button type='small' className='ml10'>查看成绩</Button>
              </Popover>
            }</div>
            </div>{String(teamDetail.netReview.status) === '1' ? '晋级下一轮' : '未晋级下一轮'}</Timeline.Item>}
            {teamDetail.firstReview &&
            <Timeline.Item dot={<i className='icon-timeline-circle'/>}><div
              className='mb12'>现场答辩初试<div>{params.time4}{
              String(teamDetail.firstReview.status) === '1' && <Popover
                content={<img className="progress_qrcode" src={teamDetail.firstReview.qrcode}/>} title="请扫描二维码加入群聊" trigger="click">
                <Button type='small' className='ml10'>查看成绩</Button>
              </Popover>
            }</div>
            </div>{String(teamDetail.firstReview.status) === '1' ? '晋级下一轮' : '未晋级下一轮'}</Timeline.Item>}
            {teamDetail.secondReview &&
            <Timeline.Item dot={<i className='icon-timeline-circle'/>}><div
              className='mb12'>现场答辩复试<div>{params.time5}{
              String(teamDetail.secondReview.status) === '1' && <Popover
                content={<img className="progress_qrcode" src={teamDetail.secondReview.qrcode}/>} title="请扫描二维码加入群聊" trigger="click">
                <Button type='small' className='ml10'>查看成绩</Button>
              </Popover>
            }</div>
            </div>{String(teamDetail.secondReview.status) === '1' ? '晋级下一轮' : '未晋级下一轮'}</Timeline.Item>}
            {teamDetail.endReview &&
            <Timeline.Item dot={<i className='icon-timeline-circle'/>}><div
              className='mb12'>比赛结束<div>{params.time6}</div>
            </div>{String(teamDetail.endReview.status) === '1' ? '晋级下一轮' : '未晋级下一轮'}</Timeline.Item>}
          </Timeline>
        </div>
      </div>
    </div>
  );
};

export default connect(({competition}) => competition)(Progress);
