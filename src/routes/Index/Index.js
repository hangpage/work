import {Carousel, Col, Layout, Row} from 'antd';
import pl from '../../assets/index/bg-zuo-gonhgao.png';
import laba from '../../assets/icon/icon-gonggao.png';
import jinru from '../../assets/icon/icon-jinru.png';
import {ActivityCard, IndexEntrance} from "../../components";
import React from "react";
import IndexTitle from "../../components/IndexTitle/IndexTitle";
import CompetitionCard from "../../components/CompetitionCard/CompetitionCard";
import {Link} from 'dva/router'
import config from '../../utils/config';
import {connect} from "dva";

const {Content} = Layout;


const INDEX_ENTRANCE_LIST = [{
  icon: require('../../assets/icon/icon-yuyuecanguan.png'),
  text: '预约参观',
  link: '/appoint'
},{
  icon: require('../../assets/icon/icon-yuanqufuwu.png'),
  text: '园区服务',
  link: '/service'
},{
  icon: require('../../assets/icon/icon-yuanquruzhu.png'),
  text: '园区入驻',
  link: '/park'
},{
  icon: require('../../assets/icon/icon-bisaibaoming.png'),
  text: '比赛报名',
  link: '/competition'
}];

const Index = ({competitionList, activityList, articleList, noticeContent, slideShowList}) => {
  return (
    <div className='bg-white pb78'>
      <div style={{width: '100%'}}>
        <Carousel autoplay={true}>
          {slideShowList.map((item, index) => {
            let url = '';
            switch (item.type) {
              case '1':
                url = item.src;
                break;
              case '2':
                url = '/article/' + item.src;
                break;
              case '3':
                url = '/activity/' + item.src;
                break;
              case '4':
                url = '/competition/' + item.src;
                break;
              case '5':
                url = '/park/' + item.src;
                break;
              default:
                url = '';
            }
            if(item.type === '1'){
              return (
                <div key={index}>
                    <a href={item.src}>
                      <img src={config.URL + item.img} alt=""/>
                    </a>
                </div>
              )
            }
            return (
              <div key={index}>
                <Link to={url}>
                  <img src={config.URL + item.img} alt=""/>
                </Link>
              </div>
            )
          })}
        </Carousel>
        <Link to='/notice'>
          <div className='info-public-box'>
           <div className="info-public">
             <img src={pl} alt="" className='mr28'/>
             <img src={laba} alt="" className='mr21'/>
             <p>{noticeContent.content}</p>
             <img src={jinru} alt=""/>
           </div>
          </div>
        </Link>
      </div>
      <div className='w'>
        <div className="flex-width-space-between" style={{marginTop: 75}}>
          {INDEX_ENTRANCE_LIST.map((item, index) => <Link to={item.link} key={index}><IndexEntrance key={index} icon={item.icon} text={item.text} /></Link>)}
        </div>
       <div className="stage">
         <IndexTitle title='最新活动' alias='activity' moreLink='/activity'/>
         <div className='flex-width-space-between'>
           <Row type='flex' gutter={58}>
           {activityList.map((item, index) =>{
             return (
               <Col key={index}>
                 <Link to={`/activity/${item.id}`}>
                   <ActivityCard title={item.title} img={`${config.URL}${item.pic}`} read={item.pageViews} time={item.createTime}/>
                 </Link>
               </Col>
               )
             })
           }
           </Row>
         </div>
       </div>
        <IndexTitle title='创业大赛' alias='competition' moreLink='/competition'/>
        <div className="stage">
            <Row type='flex' gutter={58}>
              {competitionList.map((item, index) => {
                return (
                  <Col key={index}>
                    <Link to={`/competition/${item.id}?park=${item.park}`}>
                    <CompetitionCard title={item.name} img={`${item.pic}`} read={item.pageViews}
                                     time={item.createTime} status={item.status}/>
                    </Link>
                  </Col>
                )
              })
              }
            </Row>
        </div>
        <IndexTitle title='创业动态' alias='dynamic' moreLink='/article'/>
        <div className="stage">
          <Row type='flex' gutter={60}>
            {articleList.map((item, index) => {
              return (
                <Col key={index}>
                  <Link to={`/article/${item.id}`}>
                    <ActivityCard title={item.title} img={`${item.pic}`} read={item.pageViews}
                                     time={item.createTime} size='big'/>
                  </Link>
                </Col>
              )
            })
            }
          </Row>
        </div>
      </div>
    </div>
  )
};

export default connect(({index}) => (index))(Index);
