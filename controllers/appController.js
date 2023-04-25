const { Thought, User } = require('../models');


module.exports = {
  // Function to get all of the Thoughts by invoking the find() method with no arguments.
  // Then we return the results as JSON, and catch any errors. Errors are sent as JSON with a message and a 500 status code
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Gets a single Thought using the findOneAndUpdate method. We pass in the ID of the Thought and then respond with it, or an error if not found
  async getSingleThoughts(req, res) {
    try {
      const thoughts = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thoughts) {
        return res.status(404).json({ message: 'No Thought with that ID' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Creates a new Thought. Accepts a request body with the entire Thought object.
  // Because Thoughts are associated with Users, we then update the User who created the app and add the ID of the application to the applications array
  async createThoughts(req, res) {
    try {
      const thoughts = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thoughts._id } },
        { new: true }
      );

      if (!user) {
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
  // Updates and Thought using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
  async updateThoughts(req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thoughts) {
        return res.status(404).json({ message: 'No application with this id!' });
      }

      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Deletes an Thought from the database. Looks for an app by ID.
  // Then if the app exists, we look for any users associated with the app based on the Thought ID and update the applications array for the User.
  async deleteThoughts(req, res) {
    try {
      const thoughts = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thoughts) {
        return res.status(404).json({ message: 'No application with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Application created but no user with this id!',
        });
      }

      res.json({ message: 'Application successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Adds a reaction to an Thought. This method is unique in that we add the entire body of the reaction rather than the ID with the mongodb $addToSet operator.
  async addReaction(req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thoughts) {
        return res.status(404).json({ message: 'No application with this id!' });
      }

      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Remove thought's reaction. This method finds the thought based on ID. It then updates the tags array associated with the thought in question by removing it's tagId from the reactions array.
  async removeReaction(req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { tagId: req.params.tagId } } },
        { runValidators: true, new: true }
      );

      if (!thoughts) {
        return res.status(404).json({ message: 'No application with this id!' });
      }

      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  

};



