/**
 * @Description: 比赛详情，活动详情顶部报名卡片
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/1/30 23:37
 */
import React from 'react';
import styles from './ReportCard.less';
import {Link} from "dva/router";

const ReportCard = ({img, title, time, read, content, mId, noTeacher, reportLink, btnName='报名'}) => {
  return (
    <div className={styles.card}>
      <img src={img} alt=""/>
      <div className={styles.right}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.info}>
          <span>{time}</span>
          <span className='ml20'>{read}人阅读</span>
        </div>
        <p className={styles.content} />
        <div>
          <div className={styles.baoming}><Link className={styles.link} to={reportLink}>{btnName}</Link></div>
          {!noTeacher ? <div className={styles.daoshi}><Link to={`/competition/${mId}/sign_teacher?mId=${mId}`}><span>成为导师</span></Link></div> : ''}
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
