/**
 * Created by zhuzhihang on 2019/1/23.
 * @author zhuzhihang
 * @email zzhihang@hotmail.com
 */

import React from 'react';
import styles from './IndexEntrance.less';

const IndexEntrance = ({icon, text}) => {
    return (
      <div className={styles.card}>
        <img src={icon} alt=""/>
        <p>{text}</p>
      </div>
    )
};

export default IndexEntrance;
