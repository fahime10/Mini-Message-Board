const express = require('express');
const router = express.Router();
const { DateTime } = require('luxon');

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const Message = require('../models/message');

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
    const messages = await Message.find();
    messagesArray = messages;
  } catch (err) {
    console.log(err);
  }
}

let messagesArray = [];

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mini Message Board', messages: messagesArray });
});

router.post('/new', async (req, res, next) => {
  const message = new Message({
    text: req.body.text,
    user: req.body.user,
    added: DateTime.fromJSDate(new Date()).toLocaleString(DateTime.DATE_MED),
  });

  await message.save();

  await main().catch((err) => console.log(err));

  res.redirect('/');
});

module.exports = router;
