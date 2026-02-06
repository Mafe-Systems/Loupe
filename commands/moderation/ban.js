const config = require('../../config/config.json');

module.exports = {
    name: 'ban',
    description: 'Bannt einen Benutzer vom Server',
    execute(message, args) {
      const adminID = config.adminID;
      
      // Security: Check permissions
      if (message.author.id !== adminID) {
        return message.reply('Du hast nicht die Berechtigung, diesen Befehl auszuführen!');
      }
  
      const user = message.mentions.users.first();
      if (!user) {
        return message.reply('Bitte gib den Benutzer an, den du bannen möchtest!');
      }
  
      // Security: Prevent banning the bot itself
      if (user.id === message.client.user.id) {
        return message.reply('Ich kann mich nicht selbst bannen!');
      }
      
      // Security: Prevent banning the admin
      if (user.id === adminID) {
        return message.reply('Du kannst den Admin nicht bannen!');
      }
  
      const member = message.guild.members.cache.get(user.id);
      if (!member) {
        return message.reply('Dieser Benutzer ist nicht auf dem Server!');
      }
      
      // Security: Check if member is bannable
      if (!member.bannable) {
        return message.reply('Ich kann diesen Benutzer nicht bannen. Möglicherweise hat er höhere Rechte als ich.');
      }
      
      member.ban()
        .then(() => message.reply(`${user.tag} wurde erfolgreich gebannt.`))
        .catch(err => {
          console.error('Ban error:', err);
          message.reply('Es gab einen Fehler beim Bann des Benutzers.');
        });
    },
  };
  