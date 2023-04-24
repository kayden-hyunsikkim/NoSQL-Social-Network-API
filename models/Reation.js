const { Schema, Types } = require('mongoose');

const ReationSchema = new Schema(
  {
    reationId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    tagBody: {
      type: String,
      required: true,
      maxlength: 25,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = ReationSchema;
