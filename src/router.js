import React from 'react';
import {Router, Route, Switch} from 'dva/router';
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
import Park from "./routes/Park";
import Activity from "./routes/Activity";
import Find from "./routes/Find";
import ActivityDetail from "./routes/Activity/Detail";
import ActivityReport from "./routes/Activity/Report";
import Home from "./routes/Home";
import Profile from "./routes/Home/profile";
import Match from "./routes/Home/match";
import Leave from "./routes/Home/leave";
import Advise from "./routes/Home/advise";
import ServiceParking from './routes/Service/parking';
import Repair from './routes/Service/repair';
import Lockers from './routes/Service/lockers';
import Search from './routes/Search';
import Meeting from './routes/Service/meeting';
import Post from './routes/Service/post';

const routes = [{
  path: '/login',
  component: Login,
  exact: 'exact'
}, {
  path: '/index',
  component: Index,
  exact: 'exact'
}, {
  path: '/service',
  component: Service,
  exact: 'exact'
}, {
  path: '/service/:id',
  component: ServiceList,
  exact: 'exact'
}, {
  path: '/service/:id/detail',
  component: ServiceDetail,
  exact: 'exact'
}, {
  path: '/service/type/parking',
  component: ServiceParking,
  exact: 'exact'
}, {
  path: '/service/type/repair',
  component: Repair,
  exact: 'exact'
}, {
  path: '/service/type/lockers',
  component: Lockers,
  exact: 'exact'
},{
  path: '/service/type/meeting',
  component: Meeting,
  exact: 'exact'
},{
  path: '/service/type/post',
  component: Post,
  exact: 'exact'
}, {
  path: '/competition',
  component: Competition,
  exact: 'exact'
}, {
  path: '/competition/:id',
  component: CompetitionDetail,
  exact: 'exact'
}, {
  path: '/team_info_write',
  component: TeamInfoWrite,
  exact: 'exact'
}, {
  path: '/project_info_write',
  component: ProjectInfoWrite,
  exact: 'exact'
}, {
  path: '/sign_teacher',
  component: SignTeacher,
  exact: 'exact'
}, {
  path: '/appoint',
  component: AppointVisit,
  exact: 'exact'
}, {
  path: '/notice',
  component: Notice,
  exact: 'exact'
}, {
  path: '/notice/:id',
  component: NoticeDetail,
  exact: 'exact'
}, {
  path: '/park',
  component: Park,
  exact: 'exact'
}, {
  path: '/activity',
  component: Activity,
  exact: 'exact'
}, {
  path: '/activity/:id',
  component: ActivityDetail,
  exact: 'exact'
}, {
  path: '/activity/:id/report',
  component: ActivityReport,
  exact: 'exact'
}, {
  path: '/find',
  component: Find,
  exact: 'exact'
},{
  path: '/home',
  component: Home,
  exact: 'exact'
},{
  path: '/home/profile',
  component: Profile,
  exact: 'exact'
},{
  path: '/home/match',
  component: Match,
  exact: 'exact'
},{
  path: '/home/leave',
  component: Leave,
  exact: 'exact'
},{
  path: '/home/advise',
  component: Advise,
  exact: 'exact'
},{
  path: '/search',
  component: Search,
  exact: 'exact'
}];

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <div style={{height: '100%'}}>
        <Switch>
          <Route path='/login' component={Login} exact/>
          <App>
            {routes.map((item, index) => {
              return <Route path={item.path} key={index} exact component={item.component}/>
            })}
          </App>
        </Switch>
      </div>
    </Router>
  );
}

export default RouterConfig;
