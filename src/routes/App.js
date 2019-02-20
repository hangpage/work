import {BackTop, Breadcrumb, Layout, LocaleProvider} from 'antd';
import * as MyLayout from "../components/Layout";
import React from "react";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {Link} from "dva/router";

moment.locale('zh-cn');

const {Content} = Layout;

const App = ({children, location}) => {
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>
          导航
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
