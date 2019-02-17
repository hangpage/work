import {findList} from "../../services/competition";
import {model} from "../../utils/model";
import modelExtend from 'dva-model-extend'
import {pathMatchRegexp} from "../../utils";

export default modelExtend(model, {

  namespace: 'competition',

  state: {
    list: []
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(location => {
        if(pathMatchRegexp('/competition', location.pathname)){
          dispatch({
            type: 'queryCompetitionList'
          })
        }
      })
    },
  },

  effects: {
    *queryCompetitionList({ payload }, { call, put }) {
      const {data} = yield call(findList);
      if(data){
        yield put({
          type: 'updateState',
          payload: {
            list: data.data.list,
            count: data.data.count,
            pageSize: data.data.pageSize,
            pageNo: data.data.pageNo
          }
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

})
