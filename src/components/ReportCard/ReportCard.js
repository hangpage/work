/**
 * @Description: 比赛详情，活动详情顶部报名卡片
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/1/30 23:37
 */
import React from 'react';
import styles from './ReportCard.less';
import {Link} from "dva/router";
import {isLogin, validateIsResident} from "../../utils";
import {Modal} from "antd";
import {Typography} from "antd";

const ReportCard = ({img, history, title, time, style, read, content, mId, noTeacher, reportLink, btnName='报名', allowReport=true, auth=false, editReportInfo=false, editUrl, editBtnText='修改比赛报名信息'}) => {
  noTeacher = true;
  const doLink = (link) => {
    if(auth){
      if(validateIsResident()){
        history.push(link);
      }else{
        Modal.warning({
          title: '您还未入驻！',
          content: '该功能只对已入驻成员开放，请您先入入驻或选择加入已入驻的团队！',
          centered: true
        });
      }
    }else if(!isLogin()){
      Modal.warning({
        title: '您还未登录！',
        content: '该功能登陆后才可进行相关操作！',
        centered: true
      });
    }else{
      history.push(link);
    }
  };
  return (
    <div className={styles.card} style={style}>
      <img src={img} alt=""/>
      <div className={styles.right}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.info}>
          <span>{time}</span>
          {/*<span className='ml20'>{read || 0}人阅读</span>*/}
        </div>
        <Typography.Paragraph className={styles.content} ellipsis={{ rows: 2}}>{content}</Typography.Paragraph>
        <div>
          {allowReport && <div className={styles.baoming}><div className={styles.link} onClick={() => {doLink(reportLink)}}>{btnName}</div></div>}
          {editReportInfo && <div className={styles.daoshi}><Link to={editUrl}>{editBtnText}</Link></div>}
          {!noTeacher ? <div className={styles.daoshi}><Link to={`/competition/${mId}/sign_teacher?mId=${mId}`}><span>成为导师</span></Link></div> : ''}
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
