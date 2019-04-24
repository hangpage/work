/**
 * @Description: 关于我们
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/27 19:16
 */
import React from 'react';
import {connect} from "dva";

const About = ({aboutUs}) => {
  return (
      <div className='bg-white'>
        <div className='w'>
          <div style={{padding: '40px 20px'}} dangerouslySetInnerHTML={{__html: aboutUs.content}}/>
        </div>
      </div>
  );
};

export default connect(({index}) => index)(About);
