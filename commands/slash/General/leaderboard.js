const { EmbedBuilder } = require('discord.js');
const ee = require("../../../embed.json")

module.exports = {
    name: "leaderboard", // Name of command
    description: "Voir le classement de l'activité du serveur", // Command description
    type: 1, // Command type
    options: [], // Command options
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages" // User permissions needed
    },
    run: async (client, interaction, config, db) => {
        // execute

        const embed = new EmbedBuilder()
            .setAuthor({
                name: `Leaderboard | ${interaction.guild.name}`,
                iconURL: interaction.guild.iconURL()
            })
            .setColor("#303136")
            .setFooter({
                text: ee.footertext,
                iconURL: ee.footericon
            })
            .setThumbnail("https://media.discordapp.net/attachments/785945849824935977/785969079142842428/srmarket.gif")

        let x = 1
        await client.getUsers(interaction.guild).then(p => {
            p.sort((a, b) => (a.xpTotal < b.xpTotal) ? 1 : -1).splice(0, 9).forEach(e => {
                embed.addFields({
                    name: `\`${x}\` <:join:854809844707754024> ${e.username}`,
                    value: `» **Niveau :** ${e.level}\n» **Exp :** ${e.xp}\n» **Messages :** ${e.messages}`,
                    inline: true
                })
                x = x + 1
            })
        })

        interaction.reply({ embeds: [embed] })
    },
};