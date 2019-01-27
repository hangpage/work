import {Layout, Menu, Breadcrumb} from 'antd';
import banner from '../assets/banner.png';
import {ActivityCard, MyLayout, IndexEntrance} from "../components";
import React from "react";
import IndexTitle from "../components/IndexTitle/IndexTitle";
const {Content} = Layout;


const INDEX_ENTRANCE_LIST = [{
  icon: require('../assets/index/icon-yuyuecanguan.png'),
  text: '预约参观'
},{
  icon: require('../assets/index/icon-yuanqufuwu.png'),
  text: '园区服务'
},{
  icon: require('../assets/index/icon-yuanqufuwu.png'),
  text: '园区入驻'
},{
  icon: require('../assets/index/icon-yuanqufuwu.png'),
  text: '比赛报名'
}];

const IndexPage = () => {
  return (
    <Layout className="my-layout">
      <MyLayout.Header />
      <div style={{width: '100%'}}>
        <img style={{width: '100%'}} src={banner} alt=""/>
      </div>
      <Content className='w'>
        <div className="flex-width-space-between" style={{marginTop: '109px'}}>
          {INDEX_ENTRANCE_LIST.map((item) => <IndexEntrance icon={item.icon} text={item.text} />)}
        </div>
       <div className="stage">
         <IndexTitle title='最新活动' alias='activity'/>
         <div className='flex-width-space-between'>
           <ActivityCard title='哈哈' img={banner} read='200' time='2018-01-02'/>
           <ActivityCard title='哈哈' img={banner} read='200' time='2018-01-02'/>
           <ActivityCard title='哈哈' img={banner} read='200' time='2018-01-02'/>
         </div>
       </div>
        <div className="stage">
          <IndexTitle title='创业大赛' alias='competition'/>
          <div className='flex-width-space-between'>
            <ActivityCard title='哈哈' img={banner} read='200' time='2018-01-02'/>
            <ActivityCard title='哈哈' img={banner} read='200' time='2018-01-02'/>
            <ActivityCard title='哈哈' img={banner} read='200' time='2018-01-02'/>
          </div>
        </div>
      </Content>
      <MyLayout.Footer />
    </Layout>
  )
};

export default IndexPage;
