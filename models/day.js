const { Schema, model } = require('mongoose');

const Joi = require('joi');

const daySchema = Schema(
  {
    date: {
      type: Date,
      default: new Date(),
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    },
    weight: {
      type: Number,
      default: 0,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const Day = model('calendar', daySchema, 'calendar');

const dayAdd = Joi.object({
  date: Joi.date().required(),
  productId: Joi.string().required(),
  weight: Joi.number().positive().required(),
});

const joiSchema = { dayAdd };

module.exports = { Day, joiSchema };
