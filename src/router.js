import React from 'react';
import {Route, Router, Switch} from 'dva/router';
import Index from './routes/Index/Index';
import Service from './routes/Service';
import Competition from './routes/Competition';
import CompetitionDetail from './routes/Competition/Detail';
import App from "./routes/App";
import Login from "./routes/Login";
import TeamInfoWrite from "./routes/Competition/TeamInfoWrite";
import ProjectInfoWrite from "./routes/Competition/ProjectInfoWrite";
import SignTeacher from "./routes/Competition/SignTeacher";
import ServiceList from "./routes/Service/ServiceList";
import ServiceDetail from "./routes/Service/detail";
import AppointVisit from "./routes/Index/AppointVisit";
import Notice from "./routes/Notice";
import NoticeDetail from "./routes/Notice/detail";
import ArticleDetail from "./routes/Article/index";
import ArticleList from "./routes/Article/ArticleList";
import Park from "./routes/Park";
import ParkStep1 from "./routes/Park/ParkStep1";
import ParkStep2 from "./routes/Park/ParkStep2";
import ParkStep3 from "./routes/Park/ParkStep3";
import Activity from "./routes/Activity";
import Find from "./routes/Find";
import ActivityDetail from "./routes/Activity/Detail";
import ActivityReport from "./routes/Activity/Report";
import Home from "./routes/Home";
import Profile from "./routes/Home/profile";
import Match from "./routes/Home/match";
import Leave from "./routes/Home/leave";
import Message from "./routes/Home/message";
import Advise from "./routes/Home/advise";
import Enter from "./routes/Home/enter";
import ViewHistory from "./routes/Home/history";
import MyActivity from "./routes/Home/activity";
import Team from "./routes/Home/team";
import About from "./routes/Home/about";
import ServiceTab from "./routes/Home/service";
import ServiceParking from './routes/Service/parking';
import Repair from './routes/Service/repair';
import Lockers from './routes/Service/lockers';
import Search from './routes/Search';
import Meeting from './routes/Service/meeting';
import Post from './routes/Service/post';
import NoMatch from './routes/404/404';
import ScrollToTop from "./components/ScrollTop";
import ApplicationRecord from "./routes/Service/application_record";
import Score from "./routes/Competition/score";
import Progress from "./routes/Competition/progress";

const routes = [{
  path: '/login',
  component: Login,
  exact: 'exact',
  breadcrumbName: '登录'
},{
  path: '/about',
  component: About,
  exact: 'exact',
  breadcrumbName: '关于我们'
}, {
  path: '/index',
  component: Index,
  exact: 'exact',
  breadcrumbName: '首页'
}, {
  path: '/service',
  component: Service,
  exact: 'exact',
  breadcrumbName: '服务'
}, {
  path: '/service/:id',
  component: ServiceList,
  exact: 'exact',
  breadcrumbName: '服务列表'
}, {
  path: '/service/:id/detail',
  component: ServiceDetail,
  exact: 'exact',
  breadcrumbName: '服务详情'
}, {
  path: '/service/type/parking',
  component: ServiceParking,
  exact: 'exact',
  breadcrumbName: '车位申请'
}, {
  path: '/service/type/parking/record',
  component: ApplicationRecord,
  exact: 'exact',
  breadcrumbName: '申请记录'
}, {
  path: '/service/type/repair',
  component: Repair,
  exact: 'exact',
  breadcrumbName: '报修申请'
}, {
  path: '/service/type/lockers',
  component: Lockers,
  exact: 'exact',
  breadcrumbName: '储物柜申请'
}, {
  path: '/service/type/meeting',
  component: Meeting,
  exact: 'exact',
  breadcrumbName: '会议室申请'
}, {
  path: '/service/type/post',
  component: Post,
  exact: 'exact',
  breadcrumbName: '服务申请'
}, {
  path: '/competition',
  component: Competition,
  exact: 'exact',
  breadcrumbName: '比赛'
}, {
  path: '/competition/:id',
  component: CompetitionDetail,
  exact: 'exact',
  breadcrumbName: '比赛详情'
}, {
  path: '/competition/:id/score',
  component: Score,
  exact: 'exact',
  breadcrumbName: '比赛打分'
}, {
  path: '/competition/:id/progress',
  component: Progress,
  exact: 'exact',
  breadcrumbName: '比赛进度'
}, {
  path: '/competition/:id/team_info_write',
  component: TeamInfoWrite,
  exact: 'exact',
  breadcrumbName: '团队信息填写'
}, {
  path: '/competition/:id/project_info_write',
  component: ProjectInfoWrite,
  exact: 'exact',
  breadcrumbName: '项目信息填写'
}, {
  path: '/competition/:id/sign_teacher',
  component: SignTeacher,
  exact: 'exact',
  breadcrumbName: '成为导师'
}, {
  path: '/appoint',
  component: AppointVisit,
  exact: 'exact',
  breadcrumbName: '预约参观'
}, {
  path: '/notice',
  component: Notice,
  exact: 'exact',
  breadcrumbName: '公告'
}, {
  path: '/notice/:id',
  component: NoticeDetail,
  exact: 'exact',
  breadcrumbName: '公告详情'
}, {
  path: '/article',
  component: ArticleList,
  exact: 'exact',
  breadcrumbName: '创业动态列表'
}, {
  path: '/article/:id',
  component: ArticleDetail,
  exact: 'exact',
  breadcrumbName: '文章详情'
}, {
  path: '/park',
  component: Park,
  exact: 'exact',
  breadcrumbName: '园区入驻'
}, {
  path: '/park/parkStep1',
  component: ParkStep1,
  exact: 'exact',
  breadcrumbName: '第一步'
}, {
  path: '/park/parkStep2',
  component: ParkStep2,
  exact: 'exact',
  breadcrumbName: '第二步'
}, {
  path: '/park/parkStep3',
  component: ParkStep3,
  exact: 'exact',
  breadcrumbName: '第三步'
}, {
  path: '/activity',
  component: Activity,
  exact: 'exact',
  breadcrumbName: '活动列表'
}, {
  path: '/activity/:id',
  component: ActivityDetail,
  exact: 'exact',
  breadcrumbName: '活动详情'
}, {
  path: '/activity/:id/report',
  component: ActivityReport,
  exact: 'exact',
  breadcrumbName: '活动报名'
}, {
  path: '/find',
  component: Find,
  exact: 'exact',
  breadcrumbName: '发现'
}, {
  path: '/search',
  component: Search,
  exact: 'exact',
  breadcrumbName: ''
}, {
  path: '/home/team',
  component: Team,
  exact: 'exact',
  breadcrumbName: ''
}, {
  path: '/sign_teacher',
  component: SignTeacher,
  exact: 'exact',
  breadcrumbName: '成为导师'
}];

const homeRoutes = [{
  path: '/home',
  component: Profile,
  exact: 'exact',
  breadcrumbName: '个人信息'
}, {
  path: '/home/profile',
  component: Profile,
  exact: 'exact',
  breadcrumbName: '个人信息'
}, {
  path: '/home/match',
  component: Match,
  exact: 'exact',
  breadcrumbName: '我的比赛'
}, {
  path: '/home/leave',
  component: Leave,
  exact: 'exact',
  breadcrumbName: '离园'
}, {
  path: '/home/advise',
  component: Advise,
  exact: 'exact',
  breadcrumbName: '建议'
}, {
  path: '/home/enter',
  component: Enter,
  exact: 'exact',
  breadcrumbName: '我的入驻'
}, {
  path: '/home/history',
  component: ViewHistory,
  exact: 'exact',
  breadcrumbName: '浏览历史'
}, {
  path: '/home/activity',
  component: MyActivity,
  exact: 'exact',
  breadcrumbName: '我的活动'
}, {
  path: '/home/about',
  component: About,
  exact: 'exact',
  breadcrumbName: ''
}, {
  path: '/home/message',
  component: Message,
  exact: 'exact',
  breadcrumbName: ''
}, {
  path: '/home/service',
  component: ServiceTab,
  exact: 'exact',
  breadcrumbName: ''
}];

const HomeApp = () => {
    return (
      <Home>
          <Switch>
            {homeRoutes.map((item, index) => {
              return (
                <Route path={item.path} key={index} exact component={item.component}/>
              )
            })}
          </Switch>
      </Home>
    )
};

const Apps = () => {
  return (
    <App>
      <Switch>
        {routes.map((item, index) => {
          return (
            <Route path={item.path} key={index} exact component={item.component}/>
          )
        })}
        <Route path='/home' component={HomeApp}/>
        <Route component={NoMatch}/>
      </Switch>
    </App>
  )
};

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <ScrollToTop>
        <div style={{height: '100%'}}>
         <Switch>
           <Route path='/login' component={Login} exact/>
           <Route path='/' component={Apps}/>
         </Switch>
        </div>
      </ScrollToTop>
    </Router>
  );
}

export default RouterConfig;
