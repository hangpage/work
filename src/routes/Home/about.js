/**
 * @Description: 关于我们
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/27 19:16
 */
import React from 'react';
import {connect} from "dva";

const About = ({aboutUs}) => {
  return (
    <div >
        <div >
          <div className="title-card"><span>关于我们</span></div>
          <div style={{padding: '40px 20px'}} dangerouslySetInnerHTML={{__html: aboutUs.content}}/>
        </div>
    </div>
  );
};

export default connect(({home}) => home)(About);
