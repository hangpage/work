import {findList, getTeamDetail, matchGet, teamFindMatchDetail} from "../../services/competition";
import {model} from "../../utils/model";
import modelExtend from 'dva-model-extend'
import {equalResultStatus, getParams, pathMatchRegexp} from "../../utils";
import {message} from "antd";
import {tutorGetInfo} from "../../services/tutor";
import {routerRedux} from "dva/router";

export default modelExtend(model, {

  namespace: 'competition',

  state: {
    list: [],
    data: {},
    teamDetail: {},
    teamMatchDetail: {},
    count: 0,
    tutorReview: [], //当前比赛的可评分队伍列表,
    tutorData: {}
  }
  ,

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(location => {
        if(pathMatchRegexp('/competition', location.pathname)){
          dispatch({
            type: 'queryCompetitionList',
            payload: {
              pageSize: 9,
              pageNo: 1
            }
          })
        }else if(pathMatchRegexp('/competition/:id', location.pathname)){
          const match = pathMatchRegexp('/competition/:id', location.pathname);
          if (match) {
            if(sessionStorage.getItem('token')){
              dispatch({ type: 'queryDetail', payload: { id: match[1], token: sessionStorage.getItem('token') }});
              dispatch({ type: 'teamFindMatchDetail', payload: { mId: match[1] } })
            }else{
              dispatch({ type: 'queryDetail', payload: { id: match[1] }});
            }
          }
        }else if(pathMatchRegexp('/competition/:id/team_info_write', location.pathname)){
          const match = pathMatchRegexp('/competition/:id/team_info_write', location.pathname);
          if (match) {
            dispatch({ type: 'save', payload: {teamMatchDetail: {}}})
            dispatch({ type: 'teamFindMatchDetail', payload: { mId: match[1] } })
          }
        }else if(pathMatchRegexp('/competition/:id/project_info_write', location.pathname)){
          const match = pathMatchRegexp('/competition/:id/project_info_write', location.pathname);
          if (match) {
            dispatch({ type: 'save', payload: {teamMatchDetail: {}}})
            dispatch({ type: 'teamFindMatchDetail', payload: { mId: match[1] } })
          }
        }else if(pathMatchRegexp('/sign_teacher', location.pathname)){
          if(!sessionStorage.getItem('token')){
              dispatch(routerRedux.push({
                pathname: '/login'
              }))
          }else{
            dispatch({ type: 'tutorGetInfo'})
          }
        }else if(pathMatchRegexp('/competition/:id/score', location.pathname)){
          const match = pathMatchRegexp('/competition/:id/score', location.pathname);
          if (match) {
            dispatch({ type: 'queryDetail', payload: { id: match[1], token: sessionStorage.getItem('token')} })
          }
        }else if(pathMatchRegexp('/competition/:id/progress', location.pathname)){
          const match = pathMatchRegexp('/competition/:id/progress', location.pathname);
          if (match) {
            dispatch({ type: 'getTeamDetail', payload: { mId: match[1] } })
          }
        }
      })
    },
  },

  effects: {
    *queryCompetitionList({ payload }, { call, put }) {
      const {data} = yield call(findList, payload);
      if(data){
        yield put({
          type: 'updateState',
          payload: {
            list: data.data.list,
            count: data.data.count,
            pageNo: data.data.pageNo
          }
        });
      }
    },
    *queryDetail({ payload }, { call, put }){
      const {data={}} = yield call(matchGet, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'save',
          payload: {
            data: data.data,
            tutorReview: data.data.tutorReview
          }
        })
      }
    },
    *teamFindMatchDetail({ payload }, { call, put }){
      const {data={}} = yield call(teamFindMatchDetail, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'save',
          payload: {
            teamMatchDetail: data || {},
          }
        })
      }
    },
    *getTeamDetail({ payload }, { call, put }){
      const {data} = yield  call(getTeamDetail, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'save',
          payload: {
            teamDetail: data.data || {}
          }
        })
      }else{
        message.error(data.message);
      }
    },
    *tutorGetInfo({ payload }, { call, put }){
      const {data} = yield call(tutorGetInfo, payload);
      if(data.code === 1){
        if(String(data.data.status) === '0'){
          message.success('导师信息审核中');
        }else if(String(data.data.status) === '1'){
          message.success('导师信息审核通过');
        }else if(String(data.data.status) === '2'){
          message.error('导师申请已被拒绝');
        }
        yield put({
          type: 'save',
          payload: {
            tutorData: data.data || {}
          }
        })
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

})
