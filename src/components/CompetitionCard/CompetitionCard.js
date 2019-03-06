/**
 * @Description: 比赛卡片
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/1/27 14:00
 */
import React from 'react';
import styles from "./Competition.less";
import Const from '../../utils/Const';

const CompetitionCard = ({img, title, time, read, status}) => {
  return (
    <div>
      <div className={styles.card}>
        <img src={img} alt=""/>
        <div className={styles.desc}>
          <span className={styles.status}>{Const.MATCH_STATUS[status]}</span>
          <p className={styles.title} style={{"WebkitBoxOrient": "vertical"}}>{title}</p>
          <p style={{marginTop: 14}}>
            <span className={styles.time}>{time}</span>
            <span className={styles.read}>已报名：<span className="deep-gray">{read || 0}</span></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompetitionCard;
