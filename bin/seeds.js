// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Tweet = require("../models/Tweet");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/twitter-clone', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: "charly",
    password: bcrypt.hashSync("charly", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: "david",
    password: bcrypt.hashSync("david", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: "eve",
    password: bcrypt.hashSync("eve", bcrypt.genSaltSync(bcryptSalt)),
  },
]

let tweets = [
  { content: 'If San Francisco is so great, why is everyone I love leaving? ' },
  { content: 'This game is genius. Test your design eye by choosing the UI that looks more correct.' },
  { content: 'Leap Spins Out of YC' },
  { content: 'It\'s simultaneously true the other way around' },
  { content: 'If you were going to move anywhere in Europe, where would you go?' },
]

User.deleteMany()
.then(() => Tweet.deleteMany())
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created`);

  for (let i = 0; i < tweets.length; i++) {
    tweets[i]._owner = usersCreated[i]._id
  }
  return Tweet.create(tweets)
})
.then(tweetsCreated => {
  console.log(`${tweetsCreated.length} tweets created`);

  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})