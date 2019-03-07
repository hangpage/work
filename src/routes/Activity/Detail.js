/**
 * @Description: 活动详情页
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/1/30 23:26
 */
import React from 'react';
import ReportCard from "../../components/ReportCard/ReportCard";
import {connect} from "dva";
import {Avatar} from "antd";

const Detail = ({data}) => {
  return (
    <div className='second-bg'>
      <div className="w">
        <ReportCard
          time={data.createTime}
          read={data.pageViews}
          title={data.title}
          content={data.intro}
          img={data.pic}
          reportLink={`/activity/${data.id}/report?id=${data.id}`}
          noTeacher={true}
        />
        <div className='competition-detail mb40' dangerouslySetInnerHTML={{__html: data.content}} />
        <div className='height6line  mb40'/>
        <div className="sign-member">
          <p>已报名</p>
          <div className="member-box">
            {data.signMembers.map((item, index) => {
              return (
                <li key={index}>
                  <Avatar size={50} src={item.img}/>
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

export default connect(({activity}) => (activity))(Detail);
