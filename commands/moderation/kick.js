const config = require('../../config/config.json');

module.exports = {
    name: 'kick',
    description: 'Kicke einen Benutzer vom Server',
    execute(message, args) {
      const adminID = config.adminID;
  
      // Security: Check permissions
      if (message.author.id !== adminID) {
        return message.reply('Du hast nicht die Berechtigung, diesen Befehl auszuführen!');
      }
  
      const user = message.mentions.users.first();
      if (!user) {
        return message.reply('Bitte gib den Benutzer an, den du kicken möchtest!');
      }
  
      // Security: Prevent kicking the bot itself
      if (user.id === message.client.user.id) {
        return message.reply('Ich kann mich nicht selbst kicken!');
      }
      
      // Security: Prevent kicking the admin
      if (user.id === adminID) {
        return message.reply('Du kannst den Admin nicht kicken!');
      }
  
      const member = message.guild.members.cache.get(user.id);
      if (!member) {
        return message.reply('Dieser Benutzer ist nicht auf dem Server!');
      }
      
      // Security: Check if member is kickable
      if (!member.kickable) {
        return message.reply('Ich kann diesen Benutzer nicht kicken. Möglicherweise hat er höhere Rechte als ich.');
      }
      
      member.kick()
        .then(() => message.reply(`${user.tag} wurde erfolgreich gekickt.`))
        .catch(err => {
          console.error('Kick error:', err);
          message.reply('Es gab einen Fehler beim Kicken des Benutzers.');
        });
    },
  };
  