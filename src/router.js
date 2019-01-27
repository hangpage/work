import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import App from "./routes/app/App";


const routes = [{
  path: '/',
  component: IndexPage,
  exact: 'exact'
},{
  path: '/index',
  component: App,
  exact: 'exact'
}];

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        {routes.map((item, index) => <Route path={item.path} key={index} exact component={item.component}/>)}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
