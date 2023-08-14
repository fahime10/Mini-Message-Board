const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

require('dotenv').config();

const user = process.env.USER;
const password = process.env.PASSWORD;
const collection = process.env.COLLECTION;

const mongoDB = 
  `mongodb+srv://${user}:${password}@cluster0.hehynx3.mongodb.net/${collection}?retryWrites=true&w=majority`;

main().catch((err) => console.log(err));

async function main() {
  try {
    mongoose.connect(mongoDB);
    const messages = await MessageChannel.find();
    messagesArray = messages;
  } catch (err) {
    console.log(err);
  }
}

let messagesArray = [];

// const messages = [
//   {
//     text: "Hi there!",
//     user: "Amando",
//     added: new Date(),
//   },
//   {
//     text: "Hello World!",
//     user: "Charles",
//     added: new Date(),
//   },
// ];

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mini Message Board', messages: messages });
});

router.post('/new', async (req, res, next) => {
  // TO DO
})

module.exports = router;
