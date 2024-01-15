const { EmbedBuilder } = require('discord.js');
const ee = require("../../../embed.json")

module.exports = {
    name: "botreport", // Name of command
    description: "⚙ Permet de signaler un bug au Staff", // Command description
    type: 1, // Command type
    options: [
        {
            name: "report",
            description: "Bug à signaler",
            type: 3,
            required: true,
        }
    ], // Command options
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages" // User permissions needed
    },
    run: async (client, interaction, config, db) => {
        // execute

        const aa = interaction.options.getString("report");

        const Embed = new EmbedBuilder()
            .setAuthor({
                name: "Shadow's Raven System | Bug Report",
                iconURL: ee.footericon
            })
            .setColor(ee.color)
            .setFooter({
                text: ee.footertext,
                iconURL: ee.footericon
            })
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                {
                    name: "» Utilisateur",
                    value: `${interaction.user}`
                },
                {
                    name: "» Report",
                    value: `${aa}`
                }
            )
        client.channels.cache.get("1055933978969911419").send({ embeds: [Embed] });

        interaction.reply({
            content: "Merci pour ton signalement !",
            ephemeral: true
        })
    },
};