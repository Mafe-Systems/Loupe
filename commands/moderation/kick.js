module.exports = {
    name: 'kick',
    description: 'Kicke einen Benutzer vom Server',
    execute(message, args) {
      // Admin-ID aus der Konfiguration
      const adminID = config.adminID;
  
      // Überprüfe, ob der Benutzer die Admin-ID hat
      if (message.author.id !== adminID) {
        return message.reply('Du hast nicht die Berechtigung, diesen Befehl auszuführen!');
      }
  
      // Den zu kickenden Benutzer finden
      const user = message.mentions.users.first();
      if (!user) {
        return message.reply('Bitte gib den Benutzer an, den du kicken möchtest!');
      }
  
      // Benutzer kicken
      const member = message.guild.members.cache.get(user.id);
      member.kick()
        .then(() => message.reply(`${user.tag} wurde erfolgreich gekickt.`))
        .catch(err => message.reply('Es gab einen Fehler beim Kicken des Benutzers.'));
    },
  };
  