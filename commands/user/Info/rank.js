const { EmbedBuilder } = require('discord.js');
const ee = require("../../../embed.json")
const { Member } = require("../../../Models/index")

module.exports = {
    name: "Rank Info", // Name of command
    type: 2, // Command type
    run: async (client, interaction, config, db) => {
        // execute
        const user = interaction.guild.members.cache.get(interaction.targetId);
        const settings = await Member.findOne({ id: user.id, guildID: interaction.guild.id })
        const embed = new EmbedBuilder()
            .setAuthor({
                name: `Rank | ${user.user.tag}`,
                iconURL: user.user.displayAvatarURL()
            })
            //.setDescription(`**Rank | <@${settings.id}>**`)
            .setColor(ee.color)
            .setFooter({
                text: ee.footertext, 
                iconURL: ee.footericon
            })
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .addFields(
                {
                    name: '**❱ Level :**',
                    value: `\`${settings.level}\``,
                    inline: true
                },
                {
                    name: '**❱ XP :**',
                    value: `${settings.xp} / ${Math.round(settings.xpNeeded)}`,
                    inline: true
                },
                {
                    name: '**❱ XP Total :**',
                    value: `${settings.xpTotal}`,
                    inline: true
                },
                {
                    name: '**❱ Messages :**',
                    value: `${settings.messages}`,
                    inline: true
                }
            )
        interaction.reply({ embeds: [embed], ephemeral: true })
    },
};