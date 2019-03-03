/**
 * @Description: 比赛详情页
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/1/30 23:26
 */
import React from 'react';
import ReportCard from "../../components/ReportCard/ReportCard";
import {connect} from "dva";
import {getParams} from "../../utils";

const Detail = ({data, location, match}) => {
  const params = getParams(location.search);
  let link = `/competition/${data.id}/team_info_write?mId=${data.id}`;
  let btnName = '报名';
  if(params.from === 'home'){
    btnName = '查看比赛进度';
    if(params.isTutor === '1'){
      link = `${match.url}/score`;
    }else{
      link = `${match.url}/progress?status=${params.status}`;
    }
  }

  return (
    <div className='second-bg'>
      <div className="w">
        <ReportCard
          time={data.createTime}
          read={data.pageViews}
          title={data.name}
          content={data.content}
          mId={data.id}
          reportLink={link}
          btnName={btnName}
          img={data.pic}
        />
        <div className='competition-detail' dangerouslySetInnerHTML={{__html: data.content}} />
        <div className='height6line  mb40'/>
        <div className="sign-member">
          <p>已报名</p>
          <div className="member-box">
            {data.joinTeams && data.joinTeams.map((item, index) => {
              return (
                <li key={index}>
                  <img src={item.pic} alt=""/>
                  <span>{item.name}</span>
                </li>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(({competition}) => (competition))(Detail);
