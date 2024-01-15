const { EmbedBuilder } = require('discord.js');
const ee = require("../../../embed.json");
const moment = require("moment")


module.exports = {
    name: "serverinfo", // Name of command
    description: "Renvoie les informations sur le serveur", // Command description
    type: 1, // Command type
    options: [], // Command options
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages" // User permissions needed
    },
    run: async (client, interaction, config, db) => {
        // execute
        //console.log(interaction.guild)
        let boosts = interaction.guild.premiumSubscriptionCount;
        var boostlevel = 0;
        if (boosts >= 2) boostlevel = "1";
        if (boosts >= 7) boostlevel = "2";
        if (boosts >= 14) boostlevel = "3";

        const owner = interaction.guild.members.cache.get(interaction.guild.ownerId)

        var myDate = new Date(interaction.guild.createdTimestamp)
        var myEpoch = Math.round(myDate.getTime() / 1000);

        const embed = new EmbedBuilder()
            .setAuthor({
                name: interaction.guild.name, 
                iconURL: interaction.guild.iconURL()
            })
            .setColor(ee.color)
            .addFields(
                {
                    name: "❱ Informations Serveur",
                    value: `> » **Owner :** \`${owner.user.tag}\`\n> » **Identifiant :** ${interaction.guild.id}\n> » **Description :** ${interaction.guild.description}`,
                    inline: false
                },
                {
                    name: "❱ Statistiques",
                    value: `> » **Channels :** ${interaction.guild.channels.cache.size}\n> » **Emojis :** ${interaction.guild.emojis.cache.size}\n> » **Stickers :** ${interaction.guild.stickers.cache.size}\n> » **Rôles :** ${interaction.guild.roles.cache.size}\n> » **Membres :** ${interaction.guild.memberCount}\n> » **Boost :** ${interaction.guild.premiumSubscriptionCount} (Tier ${boostlevel})`,
                    inline: false
                },
                {
                    name: "❱ Discord",
                    value: `> » **Création :** \`${moment(interaction.guild.createdTimestamp).format("DD/MM/YYYY")}\` à \`${moment(interaction.guild.createdTimestamp).format("HH:mm")}\` » <t:${myEpoch}:R>\n> » **Salon AFK :** \`${interaction.guild.afkChannel.name}\` » \`${interaction.guild.afkTimeout / 60}min\``
                }
            )
            //.addField("❱ Informations Serveur", `> » **Owner :** \`${owner.user.tag}\`\n> » **Identifiant :** ${interaction.guild.id}\n> » **Description :** ${interaction.guild.description}`, false)

            //.addField("❱ Statistiques", `> » **Channels :** ${interaction.guild.channels.cache.size}\n> » **Emojis :** ${interaction.guild.emojis.cache.size}\n> » **Stickers :** ${interaction.guild.stickers.cache.size}\n> » **Rôles :** ${interaction.guild.roles.cache.size}\n> » **Membres :** ${interaction.guild.memberCount}\n> » **Boost :** ${interaction.guild.premiumSubscriptionCount} (Tier ${boostlevel})`, true)

            //.addField("❱ Discord", `> » **Création :** \`${moment(interaction.guild.createdTimestamp).format("DD/MM/YYYY")}\` à \`${moment(interaction.guild.createdTimestamp).format("HH:mm")}\` » <t:${myEpoch}:R>\n> » **Salon AFK :** \`${interaction.guild.afkChannel.name}\` » \`${interaction.guild.afkTimeout / 60}min\``)

            .setThumbnail(interaction.guild.iconURL({
                dynamic: true
            }))
            .setFooter({
                text: "ID: " + interaction.guild.id, 
                iconURL: interaction.guild.iconURL()
            });
        
        interaction.reply({
            embeds: [embed],
        });
    },
};