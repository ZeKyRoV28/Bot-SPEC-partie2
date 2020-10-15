var discord = require("discord.js");


// Blacklist
module.exports = {
	name: "bl",
	desc: "Edit the blacklist to prevent people from using the bot.",
	longDesc: "Allows you to blacklist people from using the bot if they are abusing it.",
	usage: "<add/remove> <user mention>",
	adminOnly: true,
	main: function(bot, msg, args) {
		fs.readFile("./blackList.json", (err, data) => {
			if (!err) {
				var blackList = JSON.parse(data);
				if (args[0] === "add") {
					if (msg.mentions.length === 1) {
						if (blackList.indexOf(msg.mentions[0].id) === -1) {
							var addedUser = util.format("%s#%s", msg.mentions[0].username, msg.mentions[0].discriminator);
							blackList.push(msg.mentions[0].id);
							var newBlackList = JSON.stringify(blackList);
							fs.writeFile("./blackList.json", newBlackList, (writeErr) => {
								if (!writeErr) {
									bot.sendMessage(msg, "Successfully blacklisted " + addedUser);
								}
							});
						} else if (blackList.indexOf(msg.mentions[0].id) > -1) {
							bot.sendMessage(msg, "That user is already blacklisted.");
						}
					} else if (msg.mentions.length !== 1) {
						bot.sendMessage(msg, "Please mention **1 (one)** person you wish to blacklist.");
					}
				} else if (args[0] === "remove") {
					if (msg.mentions.length === 1) {
						if (blackList.indexOf(msg.mentions[0].id) > -1) {
							var removedUser = util.format("%s#%s", msg.mentions[0].username, msg.mentions[0].discriminator);
							delete blackList[msg.mentions[0].id];
							var newBlackList = JSON.stringify(blackList);
							fs.writeFile("./blackList.json", newBlackList, (writeErr) => {
								if (!writeErr) {
									bot.sendMessage(msg, "Successfully stopped blacklisting " + removedUser);
								}
							});
						} else if (blackList.infexOf(msg.mentions[0].id) === -1) {
							bot.sendMessage(msg, "That user is not in the blacklist.")
						}
					} else if (msg.mentions.length !== 1) {
						bot.sendMessage(msg, "Please mention **1 (one)** person you wish to stop blacklisting.");
					}
				} else {
					bot.sendMessage(msg, "That is not a valid argument.")
				}
			}
		});
	}
}
