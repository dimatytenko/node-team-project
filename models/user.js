const { Schema, model } = require('mongoose');

const Joi = require('joi');

const userSchema = Schema(
  {
    blood: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    age: {
      type: Number,
      default: null,
    },
    weight_current: {
      type: Number,
      default: null,
    },
    weight_desired: {
      type: Number,
      default: null,
    },
    name: {
      type: String,
      minLength: 3,
      required: [true, 'Name is required'],
    },
    password: {
      type: String,
      minLength: 8,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
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
  name: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
});

const userLogin = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const joiSchema = { userAdd, userLogin };

module.exports = { User, joiSchema };
