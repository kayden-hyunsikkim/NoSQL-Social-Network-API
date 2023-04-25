const { Schema, model } = require('mongoose');


// Schema to create Post model
const friendSchema = new Schema(
  {
    friendName: {
      type: String,
      minLength: 15,
      maxLength: 500,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `getTags` that gets the amount of tags associated with an application
//thoughtSchema
//  .virtual('reactionCount')
//  // Getter
//  .get(function () {
//    return `${this.reactions.length}`;
//  });
//
// Initialize our Application model
const Friend = model('friend', friendSchema);

module.exports = Friend;
