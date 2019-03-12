import fetch from 'dva/fetch';
import store from '../index';
import {routerRedux} from "dva/router";

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function handleData(data) {
  const { code, message } = data;
  if (code === 2 && message === '请登录') {
    //全局登录拦截, 缓存登录之后的回调url
    if(window.location.href.split('#')[1] !== '/login'){
      sessionStorage.setItem('cbUrl', window.location.href.split('#')[1]);
    }
    window.g_app._store.dispatch(routerRedux.push({
      pathname: '/login'
    }));
    return {};
  }
  return {data};
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
