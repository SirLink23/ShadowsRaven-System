const { EmbedBuilder, PermissionsBitField, codeBlock, ChannelType } = require("discord.js");
const client = require("../../index");
const config = require("../../config/config.js");
const ee = require("../../embed.json")

module.exports = {
    name: "guildCreate"
};

client.on('guildCreate', async (guild) => {
    let LogChannel = await guild.channels.create(
        {
            name: `log-bots`,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
                },
            ],
        }
    );
    const newGuild = {
        guildID: guild.id,
        guildName: guild.name,
        logChannel: LogChannel.id
    }

    await client.createGuild(newGuild)
    client.channels.cache.get(guild.publicUpdatesChannelId).send(`Bien le bonjour,\n\nMerci de m'avoir ajouté ! Afin de fonctionner efficacement, j'ai crée un channel pour mes logs, le voici : ${LogChannel} , tu peux le changer à tout moment avec la commande \`setlogs\`\n\nMerci de ta confiance,\nShadow's Raven System`)
});
