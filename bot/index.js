const dotenv = require('dotenv');
const { Bot, GrammyError, HttpError } = require('grammy');

// Загрузка переменных окружения
const env = dotenv.config().parsed;

const bot = new Bot(env.BOT_API_KEY);
const users_id = JSON.parse(env.BOT_USERS_ID);

const sendBotMessage = (message = '', mode = 'HTML') => {
    users_id.forEach(id => bot.api.sendMessage(id, message, { parse_mode: mode }));
};
exports.sendBotMessage = sendBotMessage;

bot.api.setMyCommands([{ command: 'id', description: 'Получение id' }]);

bot.command('start', async (ctx) => {
    const user_id = await String(ctx?.update?.message?.from?.id);
    const isAccess = users_id.includes(user_id);
    const message = isAccess ? 'Доступ разрешен' : 'Доступ запрещен';
    await ctx.reply(message);
});

bot.command('id', async (ctx) => {
    await ctx.reply(`Ваш ID: ${ctx.from.id}`);
});

bot.catch(err => {
    const { ctx, error } = err;
    console.error(`Error while handling update ${ctx.update.update_id}`);
    if (error instanceof GrammyError) {
        console.error(`Error in request: ${error.description}`);
    } else if (error instanceof HttpError) {
        console.error(`Could not contact Telegram: ${error}`);
    } else {
        console.error(`Unknown error: ${error}`);
    }
});

bot.start();
