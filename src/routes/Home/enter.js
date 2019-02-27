/**
 * @Description: 入驻
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/17 13:40
 */
import React from 'react';
import Home from './index';
import {message} from "antd";
import Const from "../../utils/Const";
import {connect} from "dva";
import {equalResultStatus} from "../../utils";
import {userEntering, userRefuse} from "../../services/user";


const Profile = ({enterData}) => {

  const handleEnter = (e, id) => {
    e.preventDefault();
    userEntering({id: id}).then(({data}) => {
      if(equalResultStatus(data)){
        message.success('入驻成功');
      }else{
        message.error(data.message);
      }
    });
  };

  const handleRefuse = (e, id) => {
    e.preventDefault();
    userRefuse({id: id}).then(({data}) => {
      if(equalResultStatus(data)){
        message.success('您已取消入驻');
      }else{
        message.error(data.message);
      }
    });
  };



  return (
    <Home>
      <div>
        <div className="title-card"><span>入驻管理</span></div>
        {enterData.map((item) => {
          return (
            <div className="bl-confirm mt42">
              <div className="border" />
              <div className="title">
                <span>状态：{Const.ENTER_STATUS[item.status]}</span>
              </div>
              <div className="content">
                请于一周内完成入驻，收到此信息请点击下方确认入驻按钮，有其他问题请咨询客服人员。
              </div>
              <div className="">
                <div className="btn bl"onClick={(e) => handleRefuse(e, item.id)}>放弃入驻</div>
                {item.status !== '1' && <div className="btn br" onClick={(e) => handleEnter(e, item.id)}>确认入驻</div>}
              </div>
            </div>
          )
        })}

      </div>
    </Home>
  );
}

export default connect(({home}) => (home))(Profile);
