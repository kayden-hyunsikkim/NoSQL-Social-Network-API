const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [];
  const THoughts = getRandomThoughts(10);

  for (let i = 0; i < 20; i++) {
    const userame = getRandomName();
    const Email = getRandomName();

    users.push({
      userame,
      Email,
    });
  }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(THoughts);

  // loop through the saved thoughts, for each thoughts we need to generate a thought response and insert the thought responses
  console.table(users);
  console.table(THoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
