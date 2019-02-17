import modelExtend from 'dva-model-extend'

export const model = {
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
};

export const pageModel = modelExtend(model, {
  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      pageNo:1,
      count: 0,
      pageSize: 10,
    },
  },

  reducers: {
    querySuccess(state, {payload}) {
      const {list, pagination} = payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    }
  }
});
