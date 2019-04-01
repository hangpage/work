export const NUMBER_VALIDATE = {
  type: 'number', message: '请输入数字', transform(value) {
    return Number(value);
  }
};

export const MOBILE_VALIDATE = {len: 11, message: '请输入11位手机号'};

export const EMAIL_VALIDATE = {type: 'email', message: '请输入邮箱'};

export const validateNoChinese = (rule, value, callback) => {
  let reg = /[^\u4e00-\u9fa5]/g;
  if (value && reg.test(value)) {
    callback('只能输入汉字');
  } else if (value && (value.length < 2 || value > 50)) {
    callback('2-20个字符');
  } else {
    callback();
  }
};
