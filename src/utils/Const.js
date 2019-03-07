const Const = {};

Const.COMPANY_ADDRESS = '北京市海淀区中关村';
Const.COMPANY_CONTACT = '020-2395495';
Const.Yes = '1';
Const.No = '0';
Const.Man = '1';
Const.Woman = '2';
Const.ZHENG_CHANG_CHU_FU = '1';
Const.TI_QIAN_CHU_FU = '2';
Const.RULE = {rules: [{ required: true, message: '此处为必填项!' }]};
//1父子2父女3母子4母女
Const.FU_ZI = '1';
Const.FU_NV = '2';
Const.MU_ZI = '3';
Const.MU_NV = '4';

Const.YesOrNoOptions = [{
  text: '是',
  value: Const.Yes
},{
  text: '否',
  value: Const.No
}];

Const.FATHER_RELATION = [{
  text: '父子',
  value: Const.FU_ZI
},{
  text: '父女',
  value: Const.FU_NV
}];

Const.MOTHER_RELATION = [{
  text: '母子',
  value: Const.MU_ZI
},{
  text: '母女',
  value: Const.MU_NV
}];

Const.HaveOrNot = [{
  text: '有',
  value: Const.Yes
},{
  text: '无',
  value: Const.No
}];

Const.GENDAR_OPTIONS = [{
  text: '男',
  value: Const.Man
},{
  text: '女',
  value: Const.Woman
}];

Const.MATCH_STATUS = {
  1: '未开始',
  2: '报名中',
  3: '报名结束',
  4: '学校评审',
  5: '学校评审结束',
  6: '网络评审开始',
  7: '网络评审结束',
  8: '初审开始',
  9: '初审结束',
  10: '复审开始',
  11: '复审结束',
  12: '比赛结束',
};


const COMPETITION_PROGRESS_MAP = {
  schoolReview: '学校内部评审',
  netReview: '网络评审',
  firstReview: '现场答辩初试',
  secondReview: '现场答辩复试',
  endReview: '比赛结束',
};

Const.CHE_WEI_SHEN_QING_STATUS = {
  0: '审核中',
  1: '已通过',
  2: '已拒绝',
};

Const.ENTER_STATUS = {
  0: '未确认',
  1: '已同意入驻'
};

Const.SERVICE_STATUS = {
  0: '审核中',
  1: '已通过',
  2: '已拒绝',
};

export default Const;
