const { Schema, model } = require('mongoose');

const Joi = require('joi');

const codeRegexp = {
  PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?!.*\W).*$/,
};

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    name: {
      type: String,
      minLength: 3,
      maxLength: 60,
      required: [true, 'Name is required'],
    },
    blood: {
      type: Number,
      enum: [1, 2, 3, 4],
      default: null,
    },
    height: {
      type: Number,
      min: 100,
      max: 250,
      default: null,
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
      default: null,
    },
    weight_current: {
      min: 20,
      max: 500,
      type: Number,
      default: null,
    },
    weight_desired: {
      min: 20,
      max: 500,
      type: Number,
      default: null,
    },
    daily_rate: {
      type: Number,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

const User = model('user', userSchema);

const userAdd = Joi.object({
  name: Joi.string().min(3).max(60).required(),
  password: Joi.string().min(8).max(32).pattern(codeRegexp.PASSWORD).required(),
  email: Joi.string().email().required(),
});

const userLogin = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const userUpdate = Joi.object({
  blood: Joi.number().min(1).max(4).required(),
  height: Joi.number().min(100).max(250).required(),
  age: Joi.number().min(18).max(100).required(),
  weight_current: Joi.number().min(20).max(500).required(),
  weight_desired: Joi.number().min(20).max(500).required(),
});

const joiSchema = { userAdd, userLogin, userUpdate };

module.exports = { User, joiSchema };
