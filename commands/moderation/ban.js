module.exports = {
    name: 'ban',
    description: 'Bannt einen Benutzer vom Server',
    execute(message, args) {
      const adminID = config.adminID;
      
      if (message.author.id !== adminID) {
        return message.reply('Du hast nicht die Berechtigung, diesen Befehl auszuführen!');
      }
  
      const user = message.mentions.users.first();
      if (!user) {
        return message.reply('Bitte gib den Benutzer an, den du bannen möchtest!');
      }
  
      const member = message.guild.members.cache.get(user.id);
      member.ban()
        .then(() => message.reply(`${user.tag} wurde erfolgreich gebannt.`))
        .catch(err => message.reply('Es gab einen Fehler beim Bann des Benutzers.'));
    },
  };
  