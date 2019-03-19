/**
 * @Description: 点赞按钮
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/16 14:15
 */
import React from 'react';
import dianzan from '../../assets/icon/icon-default-dianzan.png';
import dianzanDone from '../../assets/icon/icon-pressed-dianzan.png';

const FabulousButton = ({onClick, style, isAwesome}) => {
  return (
    <div className='dianzan' style={style} onClick={onClick}>
      {isAwesome === '1' ? <img src={dianzanDone} alt=""/> : <img src={dianzan} alt=""/>}
      <div>{isAwesome === '1' ? '已赞' : '点赞'}</div>
    </div>
  );
};

export default FabulousButton;
