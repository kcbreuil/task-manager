if (process.env.NODE_ENV !== 'production') require('dotenv').config();
//Import the DB connection
require('../config/index');

const Task = require('../models/task'),
  User = require('../models/user'),
  faker = require('faker'),
  mongoose = require('mongoose');

const dbReset = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  // Loop through each collection and delete all the documents.
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }

  //Count number of user documents ===> should be 0
  await User.countDocuments({}, function (err, count) {
    console.log('Number of users: ', count);
  });
  //Count number of task documents ===> should be 0
  await Task.countDocuments({}, function (err, count) {
    console.log('Number of tasks: ', count);
  });

  //Loop 100 times and create 100 new users
  const userIdArray = [];
  for (let i = 0; i < 100; i++) {
    const me = new User({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      admin: Boolean(Math.round(Math.random())),
      email: faker.internet.email(),
      password: faker.internet.password()
    });
    await me.generateAuthToken();
    userIdArray.push(me._id);
  }

  //Loop 100 times and create 100 new tasks
  for (let i = 0; i < 100; i++) {
    const task = new Task({
      description: faker.lorem.paragraph(),
      completed: Boolean(Math.round(Math.random())),
      dueDate: faker.date.future(),
      owner: userIdArray[Math.floor(Math.random() * userIdArray.length)]
    });
    await task.save();
  }

  //Count number of users ===> should be 100
  await User.countDocuments({}, function (err, count) {
    console.log('Number of users: ', count);
  });

  //Count number of tasks ===> should be 100
  await Task.countDocuments({}, function (err, count) {
    console.log('Number of users: ', count);
  });
};

dbReset();
