/**
 * @Description: 车位申请记录卡片
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/24 20:41
 */
import React from 'react';
import styles from './ParkRecord.less';
import Const from '../../utils/Const';

const ParkRecord = ({name, mobile, model, carNumber, status, createTime}) => {
  return (
    <div className='park-record  pl22 pr18'>
      <div className={styles.top}>
        <i className='icon-rili'/>
        <span className={styles.time}>{createTime}</span>
        <span className={styles.status}>{Const.CHE_WEI_SHEN_QING_STATUS[status]}</span>
      </div>
      <div className={styles.bottom}>
        <span>申请人：<span className={styles.content}>{name}</span></span>
        <span>联系方式：<span className={styles.content}>{mobile}</span></span>
        <span>车型：<span className={styles.content}>{model}</span></span>
        <span>车牌号：<span className={styles.content}>{carNumber}</span></span>
      </div>
    </div>
  );
};

export default ParkRecord;
