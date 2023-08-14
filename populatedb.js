const userArgs = process.argv.slice(2);
const { dateFormatter } = require('luxon');

const Message = require('./models/message');

const messages = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];
  
main().catch((err) => console.log(err));
  
async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createMessages();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function messageCreate(index, text, user, added) {
    const message = new Message({ text: text, user: user, added: added });
    await message.save();
    messages[index] = message;
    console.log(`Added message: ${text}`);
}

async function createMessages() {
    console.log("Adding messages");
    await Promise.all([
        messageCreate(0, "Hi there!", "Amando", dateFormatter.fromJSDate(new Date()).toLocaleString(dateFormatter.DATE_MED)),
        messageCreate(1, "Hello World!", "Charles", dateFormatter.fromJSDate(new Date()).toLocaleString(dateFormatter.DATE_MED)),
    ]);
}
