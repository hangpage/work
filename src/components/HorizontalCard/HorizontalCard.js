/**
 * @Description: 
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/20 0:32
 */
import React from 'react';
import styles from "../CompetitionCard/HorizontalCard.less";
import Const from "../../utils/Const";

const HorizontalCard = ({img, title, time, count, status, desc, style}) => {
  return (
    <div style={style}>
      <div className={styles.card}>
        {Const.MATCH_STATUS[status] && <span className={styles.status}>{Const.MATCH_STATUS[status] || '未知'}</span>}
        <img src={img} alt=""/>
        <div className={styles.content}>
          <p className={styles.title} style={{"WebkitBoxOrient": "vertical"}}>{title}</p>
          <p className={styles.info}>
            <span style={{marginRight: 30}}>{time}</span>
            <span>已报名：<span className="deep-gray">{count}</span></span>
          </p>
          <p className='desc' />
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
