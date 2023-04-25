const { Schema, model } = require('mongoose');


// Schema to create User model
const userSchema = new Schema(
  {
    username: String,
    email: String,
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Friend',
      },
    ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `friendcount` that gets and gets the user's friend's amount
userSchema
  .virtual('friendcount')
  // Getter
  .get(function () {
    return `${this.friends.length}`;
  })

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
