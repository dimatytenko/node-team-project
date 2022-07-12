const { Schema, model } = require('mongoose');

const Joi = require('joi');

const daySchema = Schema(
  {
    date: {
      type: Date,
      default: new Date(),
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    daily_rate: {
      type: Number,
      default: 0,
    },
    left: {
      type: Number,
      default: 0,
    },
    consumed: {
      type: Number,
      default: 0,
    },
    percentage_of_normal: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true },
);

const Day = model('days', daySchema, 'days');

const dayAdd = Joi.object({
  date: Joi.date().required(),
  productId: Joi.string().required(),
  weight: Joi.number().positive().required(),
});

const joiSchema = { dayAdd };

module.exports = { Day, joiSchema };
