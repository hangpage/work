import {equalResultStatus, pathMatchRegexp} from "../../utils";
import {activityFindList} from "../../services/activity";
import {findList} from "../../services/competition";
import {articleFindList} from "../../services/article";
import {noticeFindList, slideShow} from "../../services/notice";
import {message} from "antd";
import {aboutUs} from "../../services/user";

export default {

  namespace: 'index',

  state: {
    competitionList: [],
    activityList: [],
    articleList: [],
    slideShowList: [],
    noticeList: [],
    aboutUs: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if(pathMatchRegexp('/index', location.pathname)){
          dispatch({type: 'activityFindList'});
          dispatch({type: 'findList'});
          dispatch({type: 'articleFindList'});
          dispatch({type: 'noticeFindList'});
          dispatch({type: 'slideShow'});
        }else if(pathMatchRegexp('/about', location.pathname)){
          dispatch({type: 'aboutUs'});
          dispatch({type: 'updateState',
            payload: {
              selectedKeys: ['10']
            }
          })
        }
      })
    },
  },

  effects: {
    *findList({ payload }, { call, put }) {
      const {data} = yield call(findList, {pageSize: 3});
      if(data){
        yield put({
          type: 'updateState',
          payload: {
            competitionList: data.data.list,
          }
        });
      }
    },
    *activityFindList({payload}, { call, put }){
      const {data} = yield call(activityFindList, {pageSize: 3});
      if(data){
        yield put({
          type: 'updateState',
          payload: {
            activityList: data.data.list,
          }
        });
      }
    },
    *aboutUs({ payload }, { call, put }) {
      const {data} = yield call(aboutUs, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            aboutUs: data.data
          }
        })
      }else{
        message.error(data.message);
      }
    },
    *articleFindList({payload}, { call, put }){
      const {data} = yield call(articleFindList, {pageSize: 2});
      if(data){
        yield put({
          type: 'updateState',
          payload: {
            articleList: data.data.list,
          }
        });
      }
    },
    *noticeFindList({payload}, { call, put }){
      const {data} = yield call(noticeFindList, {pageSize: 4});
      if(data){
        yield put({
          type: 'updateState',
          payload: {
            noticeList: data.data.list,
          }
        });
      }
    },
    *slideShow({payload}, { call, put }){
      const {data} = yield call(slideShow);
      if(data){
        yield put({
          type: 'updateState',
          payload: {
            slideShowList: data.data,
          }
        });
      }
    },
  },

  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
