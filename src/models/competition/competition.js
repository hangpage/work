import {findList, matchGet} from "../../services/competition";
import {model} from "../../utils/model";
import modelExtend from 'dva-model-extend'
import {equalResultStatus, getParams, pathMatchRegexp} from "../../utils";
import {message} from "antd";

export default modelExtend(model, {

  namespace: 'competition',

  state: {
    list: [],
    data: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(location => {
        if(pathMatchRegexp('/competition', location.pathname)){
          dispatch({
            type: 'queryCompetitionList'
          })
        }else if(pathMatchRegexp('/competition/:id', location.pathname)){
          const match = pathMatchRegexp('/competition/:id', location.pathname);
          if (match) {
            dispatch({ type: 'queryDetail', payload: { id: match[1], park: getParams(location.search).park } })
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
      const {data} = yield  call(matchGet, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'save',
          payload: {
            data: data.data
          }
        })
      }else{
        message.error(data.message);
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

})
