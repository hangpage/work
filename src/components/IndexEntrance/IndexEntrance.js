/**
 * Created by zhuzhihang on 2019/1/23.
 * @author zhuzhihang
 * @email zzhihang@hotmail.com
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './IndexEntrance.less';

const IndexEntrance = ({icon, text}) => {
    return (
      <div className={styles.card}>
        <img src={icon} alt=""/>
        <p>{text}</p>
      </div>
    )
};


IndexEntrance.propTypes = {

};

export default IndexEntrance;
