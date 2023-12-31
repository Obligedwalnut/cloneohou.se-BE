const Joi = require('joi');

const signupSchema = Joi.object().keys({
  email: Joi.string().email().required().messages({
    'string.email': '이메일 형식에 어긋납니다.',
    'any.required': '요청한 데이텨 형식이 올바르지 않습니다.',
  }),

  nickname: Joi.string().required().messages({
    'string.base': '닉네임은 문자열이어야 합니다.',
    'any.required': '요청한 데이터 형식이 올바르지 않습니다.',
  }),

  password: Joi.string().required().messages({
    'string.base': '비밀번호는 문자열이어야 합니다.',
    'any.required': '요청한 데이터 형식이 올바르지 않습니다.',
    'string.empty': '비밀번호를 입력해주세요.',
  }),
  confirm: Joi.string().valid(Joi.ref('password')).required().messages({
    'string.base': '비밀번호는 문자열이어야 합니다.',
    'any.only': '비밀번호가 일치하지 않습니다.',
    'any.required': '비밀번호 확인은 필수 항목입니다.',
  }),
});

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required().messages({
    'string.email': '이메일 혹은 비밀번호가 틀렸습니다.',
    'any.required': '요청한 데이텨 형식이 올바르지 않습니다.',
  }),

  password: Joi.string().required().messages({
    'string.base': '이메일 혹은 비밀번호가 틀렸습니다.',
    'any.required': '요청한 데이터 형식이 올바르지 않습니다.',
    'string.empty': '비밀번호를 입력해주세요.',
  }),
});

const articleSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.base': '제목은 문자열이어야 합니다.',
    'any.required': '요청한 데이터 형식이 올바르지 않습니다.',
    'string.empty': '제목을 입력해주세요.',
  }),
  coverImage: Joi.required().messages({
    'any.required': 'Cover 이미지를 넣어주세요',
  }),
  content: Joi.string().required().messages({
    'string.base': '내용은 문자열이어야 합니다.',
    'any.required': '요청한 데이터 형식이 올바르지 않습니다.',
    'string.empty': '내용을 입력해주세요.',
  }),
});

module.exports = {
  signupSchema,
  loginSchema,
  articleSchema,
};
