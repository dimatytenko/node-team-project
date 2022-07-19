const { Schema, model } = require('mongoose');

const diarySchema = Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    day_id: {
      type: Schema.Types.ObjectId,
      ref: 'days',
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'user',
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

module.exports = Diary;
