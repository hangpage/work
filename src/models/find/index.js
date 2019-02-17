import {model} from "../../utils/model";
import modelExtend from 'dva-model-extend'
import {equalResultStatus, getParams, pathMatchRegexp} from "../../utils";
import {activityFindList, activityGet} from "../../services/activity";
import {message} from "antd";
import {articleFindList} from "../../services/article";

export default modelExtend(model, {

  namespace: 'find',

  state: {
    list1: [],
    list2: [],
    count1: 0,
    count2: 0
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if(pathMatchRegexp('/find', location.pathname)){
          dispatch({
            type: 'queryList'
          })
        }
      })
    },
  },

  effects: {
    *queryList({ payload }, { call, put }) {
      const {data} = yield call(activityFindList);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            list1: data.data.list,
            count1: data.data.count,
            pageSize1: data.data.pageSize,
            pageNo1: data.data.pageNo
          }
        });
      }else{
        message.error(data.message);
      }

      const data2 = (yield call(articleFindList)).data;
      if(equalResultStatus(data2)){
        yield put({
          type: 'updateState',
          payload: {
            list2: data2.data.list,
            count2: data2.data.count,
            pageSize2: data2.data.pageSize,
            pageNo2: data2.data.pageNo
          }
        });
      }else{
        message.error(data2.message);
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

})
