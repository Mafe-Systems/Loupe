const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config/config.json');
const fs = require('fs');
const path = require('path');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Map();
const commandsFolder = path.join(__dirname, 'commands');
fs.readdirSync(commandsFolder).forEach((file) => {
  const command = require(path.join(commandsFolder, file));
  client.commands.set(command.name, command);
});

client.once('ready', () => {
  console.log(`Bot ist online als ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const prefix = config.prefix;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (command) {
    command.execute(message, args);
  }
});

client.login(config.token);
