import {equalResultStatus, getParams, pathMatchRegexp} from "../../utils";
import {matchGet} from "../../services/competition";
import {message} from 'antd';

export default {

  namespace: 'competitionDetail',

  state: {
    data: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const match = pathMatchRegexp('/competition/:id', location.pathname);
        if (match) {
          dispatch({ type: 'query', payload: { id: match[1], token: sessionStorage.getItem('token'), park: getParams(location.search).park } })
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }){
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

};
