module.exports = {
    name: 'kick',
    description: 'Kicke einen Benutzer vom Server',
    execute(message, args) {
      const adminID = config.adminID;
  
      if (message.author.id !== adminID) {
        return message.reply('Du hast nicht die Berechtigung, diesen Befehl auszuführen!');
      }
  
      const user = message.mentions.users.first();
      if (!user) {
        return message.reply('Bitte gib den Benutzer an, den du kicken möchtest!');
      }
  
      const member = message.guild.members.cache.get(user.id);
      member.kick()
        .then(() => message.reply(`${user.tag} wurde erfolgreich gekickt.`))
        .catch(err => message.reply('Es gab einen Fehler beim Kicken des Benutzers.'));
    },
  };
  