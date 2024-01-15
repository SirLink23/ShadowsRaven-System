const { EmbedBuilder, PermissionsBitField, codeBlock } = require("discord.js");
const client = require("../../index");
const config = require("../../config/config.js");
const ee = require("../../embed.json")
const { Member, Guild } = require("../../Models/index")

module.exports = {
  name: "messageCreate"
};

client.on('messageCreate', async (message) => {
  if (message.channel.type !== 0) return;
  if (message.author.bot) return;

  const prefix = config.Prefix || "?";

  if (!message.guild) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);

  if (!message.content.startsWith(prefix)) {
    const newMember = {
      guildID: message.guild.id,
      id: message.author.id,
      username: message.author.username,
      tag: message.author.tag
    }

    const user = await Member.findOne({ id: message.author.id, guildID: message.guild.id })
    if (!user) {
      await client.createMember(newMember)
    }

    const memberData = await Member.findOne({ guildId: message.guild.id, id: message.author.id })
    const settings = await Guild.findOne({ guildId: message.guild.id })

    if (!memberData) return;
    if (!settings) return;

    const valueXp = settings.xpBoost * (Math.floor(Math.random() * 21))
    const newExp = memberData.xp + valueXp;
    const newTotal = memberData.xpTotal + valueXp
    const newLevel = memberData.level + 1;
    const newMessages = memberData.messages + 1;

    memberData.xp = newExp;
    memberData.xpTotal = newTotal;
    memberData.messages = newMessages;
    await memberData.save();

    /*let x = 1
    await client.getUsers(message.guild).then(p => {
      p.sort((a, b) => (a.xpTotal < b.xpTotal) ? 1 : -1).splice(0, client.getUsers.size).forEach(e => {
        if (!e.rank === x) {
          e.rank = x
          e.save()
        }
      })
    })*/

    const xpNeed = memberData.xpNeeded

    if (xpNeed < memberData.xp) {
      memberData.level = newLevel;
      memberData.xp = 0;
      await memberData.save();

      message.author.send(`➣ **__Notification du Shadow's Raven Market__**\n\n• Bien joué à toi ${message.author}, tu passes au niveau ${newLevel}, félicitations jeune corbeau !\n\n*Continues ainsi :3*`)
    }

    memberData.xpNeeded = memberData.level * (500 + (memberData.level + 10))
    memberData.save();
  } else {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;

    let command = client.prefix_commands.get(cmd);

    if (!command) return;

    if (command) {
      if (command.permissions) {
        if (!message.member.permissions.has(PermissionsBitField.resolve(command.permissions || []))) return message.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(`🚫  Visiblement, tu n'as pas la permission d'éxécuter cette commande.`)
              .setColor("Red")
          ]
        })
      };

      if (command.owner, command.owner == true) {
        if (config.Users?.OWNERS) {
          const allowedUsers = []; // New Array.

          config.Users.OWNERS.forEach(user => {
            const fetchedUser = message.guild.members.cache.get(user);
            if (!fetchedUser) return allowedUsers.push('*Unknown User#0000*');
            allowedUsers.push(`${fetchedUser.user.tag}`);
          })

          if (!config.Users.OWNERS.some(ID => message.member.id.includes(ID))) return message.reply({
            embeds: [
              new EmbedBuilder()
                .setDescription(`🚫 Sorry but only owners can use this command! Allowed users:\n**${allowedUsers.join(", ")}**`)
                .setColor("Red")
            ]
          })
        }
      };

      try {
        command.run(client, message, args, prefix, config);
      } catch (error) {
        console.error(error);
      };
    }
  }
});
