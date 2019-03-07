/**
 * @Description: 比赛详情页
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/1/30 23:26
 */
import React from 'react';
import ReportCard from "../../components/ReportCard/ReportCard";
import {connect} from "dva";
import {getParams} from "../../utils";
import {Avatar, Empty} from "antd";
import {Link} from "dva/router";

const Detail = ({data, location, match}) => {
  const params = getParams(location.search);
  let link = `/competition/${data.id}/team_info_write?mId=${data.id}`;
  let btnName = '报名';
  let allowReport;
  let noTeacher;
  if (params.from === 'home') {
    btnName = '查看比赛进度';
    noTeacher = true;
    if (params.isTutor === '1') {
      allowReport = false;
      link = `${match.url}/score`;
    } else {
      link = `${match.url}/progress${location.search}`;
    }
  } else {
    allowReport = data.status === '2';
  }

  return (
    <div className='second-bg'>
      <div className="w">
        <ReportCard
          time={data.createTime}
          read={data.pageViews}
          title={data.name}
          content={data.intro}
          mId={data.id}
          reportLink={link}
          btnName={btnName}
          noTeacher={noTeacher}
          img={data.pic}
          allowReport={allowReport}
        />
        <div className='competition-detail' dangerouslySetInnerHTML={{__html: data.content}}/>
        <div className='height6line  mb40'/>
        <div className="sign-member">
          <p>已报名</p>
          <div className="member-box competition-sign-member">
            {
              data.joinTeams && data.joinTeams.length ? data.joinTeams.map((item, index) => {
                return (
                  <li key={index}>
                    <Avatar size={50} src={item.pic}/>
                    <span>{item.name}</span>
                    {params.isTutor === '1' &&
                    <Link to={link}><span className='dianping'>点评</span></Link>}
                  </li>
                )
              }) : <Empty/>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(({competition}) => (competition))(Detail);
