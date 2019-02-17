/**
 * @Description: 返回按钮，注册history.back事件
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/10 15:08
 */
import React from 'react';

const onBackClick = () => {
  window.history.back();
};

const BackButton = ({text='返回'}) => {
  return (
    <div className='back-button' onClick={onBackClick}>
        {text}
    </div>
  );
};

export default BackButton;
