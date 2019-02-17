import {Layout} from 'antd';
import * as MyLayout from "../components/Layout";
import React from "react";

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const App = ({children}) => {
return (
  <LocaleProvider locale={zh_CN}>
    <Layout className="my-layout">
      <MyLayout.Header />
      {children}
      <MyLayout.Footer />
    </Layout>
  </LocaleProvider>
)
};

export default App;
