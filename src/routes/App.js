import {BackTop, Breadcrumb, Layout, LocaleProvider} from 'antd';
import * as MyLayout from "../components/Layout";
import React from "react";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {Link} from "dva/router";
import {pathMatchRegexp} from "../utils";

moment.locale('zh-cn');

const {Content} = Layout;

const routes = [{
  path: '/login',
  breadcrumbName: '登录'
}, {
  path: '/index',
  breadcrumbName: '首页'
}, {
  path: '/service',
  breadcrumbName: '服务'
}, {
  path: '/service/:id',
  breadcrumbName: '服务列表'
}, {
  path: '/service/:id/detail',
  breadcrumbName: '服务详情'
}, {
  path: '/service/type/parking',
  breadcrumbName: '车位申请'
}, {
  path: '/service/type/parking/record',
  breadcrumbName: '申请记录'
},  {
  path: '/service/type/repair',
  breadcrumbName: '报修申请'
}, {
  path: '/service/type/lockers',
  breadcrumbName: '储物柜申请'
}, {
  path: '/service/type/meeting',
  breadcrumbName: '会议室申请'
}, {
  path: '/service/type/post',
  breadcrumbName: '服务申请'
}, {
  path: '/competition',
  breadcrumbName: '比赛'
}, {
  path: '/competition/:id',
  breadcrumbName: '比赛详情'
}, {
  path: '/competition/:id/score',
  breadcrumbName: '比赛打分'
}, {
  path: '/competition/:id/progress',
  breadcrumbName: '比赛进度'
},{
  path: '/team_info_write',
  breadcrumbName: '团队信息填写'
}, {
  path: '/project_info_write',
  breadcrumbName: '项目信息填写'
}, {
  path: '/sign_teacher',
  breadcrumbName: '成为导师'
}, {
  path: '/appoint',
  breadcrumbName: '预约参观'
}, {
  path: '/notice',
  breadcrumbName: '公告'
}, {
  path: '/notice/:id',
  breadcrumbName: '公告详情'
}, {
  path: '/article/:id',
  breadcrumbName: '文章详情'
},  {
  path: '/park',
  breadcrumbName: '园区入驻'
}, {
  path: '/park/parkStep1',
  breadcrumbName: '第一步'
}, {
  path: '/park/parkStep2',
  breadcrumbName: '第二步'
}, {
  path: '/park/parkStep3',
  breadcrumbName: '第三步'
}, {
  path: '/activity',
  breadcrumbName: '活动列表'
}, {
  path: '/activity/:id',
  breadcrumbName: '活动详情'
}, {
  path: '/activity/:id/report',
  breadcrumbName: '活动报名'
}, {
  path: '/find',
  breadcrumbName: '发现'
}, {
  path: '/home',
  breadcrumbName: '主页'
}, {
  path: '/home/profile',
  breadcrumbName: '个人信息'
}, {
  path: '/home/match',
  breadcrumbName: '我的比赛'
}, {
  path: '/home/leave',
  breadcrumbName: '离园'
}, {
  breadcrumbName: '建议'
}, {
  path: '/home/enter',
  breadcrumbName: '我的入驻'
}, {
  path: '/home/history',
  breadcrumbName: '浏览历史'
}, {
  path: '/home/activity',
  breadcrumbName: '我的活动'
}, {
  path: '/home/team',
  breadcrumbName: ''
},  {
  path: '/home/about',
  breadcrumbName: ''
}, {
  path: '/home/message',
  breadcrumbName: ''
}, {
  path: '/home/service',
  breadcrumbName: ''
},{
  path: '/search',
  breadcrumbName: ''
}];

const App = ({children, location, match}) => {
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    console.log(url)
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>
          {
            console.log(routes.find((_) => {
              return pathMatchRegexp(url, _.path)
            }))
          }
          {routes.find((_) => {
            return pathMatchRegexp(url, _.path)
          }) ? routes.find((_) => {
            return pathMatchRegexp(url, _.path)
          }).breadcrumbName : ''}
        </Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [(
    <Breadcrumb.Item key="home">
      <Link to="/index">首页</Link>
    </Breadcrumb.Item>
  )].concat(extraBreadcrumbItems);

  return (
  <LocaleProvider locale={zh_CN}>
    <Layout className="my-layout">
      <MyLayout.Header />
        {/*<Breadcrumb>*/}
          {/*{breadcrumbItems}*/}
        {/*</Breadcrumb>*/}
        {children}
      <BackTop />
      <MyLayout.Footer />
    </Layout>
  </LocaleProvider>
)
};

export default App;
