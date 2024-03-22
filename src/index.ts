import TelegramBot from "node-telegram-bot-api";

// Replace the value below with the Telegram token you receive from @BotFather
const token = String(process.env.TELEGRAM_BOT_TOKEN);

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", (message) => {
  const chatId = message.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, "Received your message!");
});

// Matches "/start"
bot.onText(/\/start/, (message) => {
  // 'message' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = message.chat.id;

  const response = "Welcome to JP80EastBot!"; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, response);
});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (message, match) => {
  // 'message' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = message.chat.id;

  const response = match ? match[1] : "Default echo response!"; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, response);
});
