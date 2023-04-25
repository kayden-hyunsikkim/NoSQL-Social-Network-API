const { User, Friend } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
      
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Updates and application using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
  async updateuser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a user and associated apps
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await User.deleteMany({ _id: { $in: user.applications } });
      res.json({ message: 'User and associated apps deleted!' })
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Adds a tag to an application. This method is unique in that we add the entire body of the tag rather than the ID with the mongodb $addToSet operator.
  async addFriend(req, res) {
    try {
      const friends = await Friend.create(req.body);
      const users = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: friends._id } },
        { runValidators: true, new: true }
      );
      console.log(users);
      if (!users) {
        return res.status(404).json({
          message: 'Application created, but found no user with that ID',
        })
      }

      res.json('Created the application 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Remove application tag. This method finds the application based on ID. It then updates the tags array associated with the app in question by removing it's tagId from the tags array.
  async removeFriend(req, res) {
    try {
      const friends = await Friend.findOneAndRemove(
        { _id: req.params.friendId }
      );

      if (!friends) {
        return res.status(404).json({ message: 'No application with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { friends: req.params.friendId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({
          message: 'Application created but no user with this id!',
        });
      }

      res.json({ message: 'Application successfully deleted!' });
      

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Get a single friend
  async getSingleFriend(req, res) {
    try {
      const friend = await Friend.findOne({ _id: req.params.friendId })
        .select('-__v');

      if (!friend) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
};
