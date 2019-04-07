import {Carousel, Col, message, Row, Typography} from 'antd';
import {ActivityCard, IndexEntrance} from "../../components";
import React from "react";
import IndexTitle from "../../components/IndexTitle/IndexTitle";
import CompetitionCard from "../../components/CompetitionCard/CompetitionCard";
import {Link, routerRedux} from 'dva/router'
import config from '../../utils/config';
import {connect} from "dva";

const INDEX_ENTRANCE_LIST = [{
  icon: require('../../assets/icon/icon-yuyuecanguan.png'),
  text: '预约参观',
  link: '/appoint'
},{
  icon: require('../../assets/icon/icon-yuanqufuwu.png'),
  text: '成为导师',
  link: '/sign_teacher'
},{
  icon: require('../../assets/icon/icon-yuanquruzhu.png'),
  text: '园区入驻',
  link: '/park',
  auth: true
},{
  icon: require('../../assets/icon/icon-bisaibaoming.png'),
  text: '比赛报名',
  link: '/competition'
}];

const Index = ({competitionList, activityList, articleList, noticeList, slideShowList, dispatch}) => {

  const doLink = (link) => {
    const status = JSON.parse(sessionStorage.getItem('user')).residentTeamStatus;
    if(status === 1){
      return message.warning('您已申请入驻！')
    }else if(status > 1){
      return message.warning('您已入驻！')
    }else{
      dispatch(routerRedux.push(link));
    }
  };

  return (
    <div className='bg-white pb78 pt24'>
      <div className='w index-banner'>
        <div className="" style={{width: 803,minHeight: 450}}>
          <Carousel autoplay={true} dots={true} style={{minHeight: 450}}>
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
        </div>
        <div className="notice">
            <div className='info-public-box'>
              <div className='title'>
                <span className='pull-left' style={{fontSize: 18, fontWeight: 'bold'}}>
                  公告
                </span>
                <span className='pull-right' style={{color:'#0772B7 !important'}}>
                 <Link to='/notice' style={{color:'#0772B7 !important'}}> 更多> </Link>
                </span>
              </div>
              <div className="info-public">
                {noticeList.map((item, index) => {
                  return (
                    <Link to={`/notice/${item.id}`} key={index}>
                      <Typography.Text className='notice-item' ellipsis={{ rows: 2}}>{item.title}</Typography.Text>
                    </Link>
                  )
                })}
              </div>
            </div>
        </div>
      </div>
      <div className='w'>
        <div className="flex-width-space-between" style={{marginTop: 75}}>
          {INDEX_ENTRANCE_LIST.map((item, index) => {
            if(item.auth){
              return <div onClick={() => {doLink(item.link)}} key={index}><IndexEntrance icon={item.icon} text={item.text} /></div>
            }
            return <Link to={item.link} key={index} style={{display: 'block'}}><IndexEntrance icon={item.icon} text={item.text} /></Link>
          })}
        </div>
       <div className="stage">
         <IndexTitle title='最新活动' alias='activity' moreLink='/activity'/>
         <div className='flex-width-space-between'>
           <Row type='flex' gutter={58}>
           {activityList.map((item, index) =>{
             return (
               <Col key={index}>
                 <Link to={`/activity/${item.id}`}>
                   <ActivityCard title={item.title} img={`${config.URL}${item.pic}`} read={item.pageViews} time={item.createTime} endTime={item.endTime}/>
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
                    <CompetitionCard title={item.name} img={`${item.pic}`} read={item.joinCount}
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
