/**
 * @Description: 点赞按钮
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/16 14:15
 */
import React from 'react';
import dianzan from '../../assets/icon/icon-default-dianzan.png';

const FabulousButton = ({onClick, style}) => {
  return (
    <div className='dianzan' style={style} onClick={onClick}>
      <img src={dianzan} alt=""/>
      <div >点赞</div>
    </div>
  );
};

export default FabulousButton;
