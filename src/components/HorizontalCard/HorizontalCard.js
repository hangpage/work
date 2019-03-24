/**
 * @Description: 
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/20 0:32
 */
import React from 'react';
import styles from "./HorizontalCard.less";
import Const from "../../utils/Const";
import moment from "moment";
import {Typography} from "antd";

const HorizontalCard = ({img, title, time, count, status, desc, style, countDesc='已报名'}) => {
  return (
    <div style={style}>
      <div className={styles.card}>
        {Const.MATCH_STATUS[status] && <span className={styles.status}>{Const.MATCH_STATUS[status] || '未知'}</span>}
        <img src={img} alt=""/>
        <div className={styles.content}>
          <Typography.Paragraph className={styles.title} ellipsis={{ rows: 1}}>{title}</Typography.Paragraph>
          <p className={styles.info}>
            <span style={{marginRight: 30}}>{moment(time).format('YYYY-MM-DD')}</span>
            <span>{countDesc}：<span className="deep-gray">{count || 0}</span></span>
          </p>
          <Typography.Paragraph className={styles.desc} ellipsis={{ rows: 2}}>{desc}</Typography.Paragraph>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
