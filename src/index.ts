import TelegramBot from "node-telegram-bot-api";
import express from "express";

if (process.env.NODE_ENV === "development") {
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
} else {
  const app = express();
  const port = process.env.PORT;

  // Start Express Server
  app.listen(port, async () => {
    const url = process.env.CYCLIC_URL;

    // Replace the value below with the Telegram token you receive from @BotFather
    const token = String(process.env.TELEGRAM_BOT_TOKEN);

    // No need to pass any parameters as we will handle the updates with Express
    const bot = new TelegramBot(token);

    // This informs the Telegram servers of the new webhook.
    await bot.setWebHook(`${url}/bot${token}`);

    // Listen for any kind of message. There are different kinds of
    // messages.
    bot.on("message", async (message) => {
      const chatId = message.chat.id;

      // send a message to the chat acknowledging receipt of their message
      await bot.sendMessage(chatId, "Received your message!");
    });

    // Matches "/start"
    bot.onText(/\/start/, async (message) => {
      // 'message' is the received Message from Telegram
      // 'match' is the result of executing the regexp above on the text content
      // of the message

      const chatId = message.chat.id;

      const response = "Welcome to JP80EastBot!"; // the captured "whatever"

      // send back the matched "whatever" to the chat
      await bot.sendMessage(chatId, response);
    });

    // Matches "/echo [whatever]"
    bot.onText(/\/echo (.+)/, async (message, match) => {
      // 'message' is the received Message from Telegram
      // 'match' is the result of executing the regexp above on the text content
      // of the message

      const chatId = message.chat.id;

      const response = match ? match[1] : "Default echo response!"; // the captured "whatever"

      // send back the matched "whatever" to the chat
      await bot.sendMessage(chatId, response);
    });

    // Parse the updates to JSON
    app.use(express.json());

    // Simple welcome route
    app.get(`/`, (req, res) => {
      res.status(200).send({
        message: "Welcome to the JP80EastBot server!",
      });
    });

    // We are receiving updates at the route below
    app.post(`/bot${token}`, (req, res) => {
      bot.processUpdate(req.body);
      res.sendStatus(200);
    });

    console.log(`JP80EastBot webhook server is listening on ${port}!`);
  });
}
