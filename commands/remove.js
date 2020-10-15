const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "remove",
  description: "Remove song from the queue",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Il n'y a pas de file d'attente.").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    
    if (!args.length) return message.reply(`Usage: ${message.client.prefix}supprimer <Numéro de file d'attente>`);
    if (isNaN(args[0])) return message.reply(`Usage: ${message.client.prefix}supprimer <Numéro de file d'attente>`);

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} ❌ supprimer **${song[0].title}** de la file d'attente .`);
  }
};
