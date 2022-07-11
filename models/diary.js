const { Schema, model } = require('mongoose');

// const Joi = require('joi');

const diarySchema = Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    },
    day_id: {
      type: Schema.Types.ObjectId,
      ref: 'days',
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    weight: {
      type: Number,
      default: 0,
    },
    calories: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true },
);

const Diary = model('diarys', diarySchema, 'diarys');

// const dayAdd = Joi.object({
//   date: Joi.date().required(),
//   productId: Joi.string().required(),
//   weight: Joi.number().positive().required(),
// });

// const joiSchema = { dayAdd };

module.exports = Diary;
