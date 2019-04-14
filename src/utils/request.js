import fetch from 'dva/fetch';
import {routerRedux} from "dva/router";
import {message} from 'antd';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if(response.status === 500){
    message.error('服务端出错了，请稍后重试！');
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function handleData(data) {
  const { code, message } = data;
  if ((Number(code) === 2 && String(message).trim() === '请登录')) {
    //全局登录拦截, 缓存登录之后的回调url
    message.warning('需要登录后才能操作，请登录');
    if(window.location.href.split('#')[1] !== '/login'){
      sessionStorage.setItem('cbUrl', window.location.href.split('#')[1]);
    }
    window.g_app._store.dispatch(routerRedux.push({
      pathname: '/login'
    }));
    return {};
  }else{
    return {data};
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  if(process.env.NODE_ENV === 'production'){
    url = url.replace('/api', '/beili');
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(handleData)
    .catch(err => {
      console.log(err)
    });
}
