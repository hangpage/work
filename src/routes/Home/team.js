/**
 * @Description: 团队档案
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/20 21:50
 */
import React from 'react';
import {connect} from "dva";
import {Link} from "dva/router";
import {Tabs} from "antd";
import CompanyInfo from "./team/company_info";
import FinancingInfo from "./team/financing_info";
import TeamInfo from "./team/team_info";
import MemberInfo from "./team/member_info";

const Team = ({data, location}) => {
  return (
    <div className='team-body'>
      <div className="team-box">
        <div className="border">
          <div className="avatar">
            <img src={data.img} alt=""/>
          </div>
        </div>
        <div className="nick-name">{data.nickName}</div>
        <div className="desc">{data.intro}</div>
        <Link to='/home/profile'>
          <div className="edit">编辑个人资料</div>
        </Link>
      </div>
      <div className="w">
        <div className="main-title">团队档案</div>
        <div>
          <Tabs>
            <Tabs.TabPane tab='公司与项目信息' key='0'>
              <CompanyInfo/>
            </Tabs.TabPane>
            <Tabs.TabPane tab='融资情况' key='1'>
              <FinancingInfo/>
            </Tabs.TabPane>
            <Tabs.TabPane tab='团队信息' key='2'>
              <TeamInfo/>
            </Tabs.TabPane>
            <Tabs.TabPane tab='个人详情（负责人）' key='3'>
              <CompanyInfo/>
            </Tabs.TabPane>
            <Tabs.TabPane tab='个人详情（成员）' key='4'>
              <MemberInfo/>
            </Tabs.TabPane>

          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default connect(({home}) => (home))(Team);
