export const NUMBER_VALIDATE = {type: 'number', message: '请输入数字', transform(value) {
    return Number(value);
  }};

export const MOBILE_VALIDATE = {len: 11, message: '请输入11位手机号'};

export const EMAIL_VALIDATE = {type: 'email', message: '请输入邮箱'};

export const TWO_50 = {min: 2, max: 50, message: '2-50个汉字'};

export const TWO_20 = {min: 2, max: 20, message: '2-20个汉字'};

export const TWO_30 = {min: 2, max: 30, message: '2-30个汉字'};
