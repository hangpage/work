import {pathMatchRegexp} from "../../utils";
import {activityFindList} from "../../services/activity";
import {findList} from "../../services/competition";
import {articleFindList} from "../../services/article";
import {noticeFindList, slideShow} from "../../services/notice";

export default {

  namespace: 'index',

  state: {
    competitionList: [],
    activityList: [],
    articleList: [],
    slideShowList: [],
    noticeContent: {}
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
      const {data} = yield call(noticeFindList, {pageSize: 1});
      if(data){
        yield put({
          type: 'updateState',
          payload: {
            noticeContent: {content: data.data.list[0].content},
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
    }
  },

  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
