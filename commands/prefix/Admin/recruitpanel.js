const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const ee = require("../../../embed.json");
const { description } = require('../../../templates/slash_command');

module.exports = {
    config: {
        name: "recruitpanel", // Name of Command
        description: "Panel de recrutement", // Command Description
        usage: "" // Command usage
    },
    permissions: "Administrator", // User permissions needed
    owner: false, // Owner only?
    run: async (client, message, args, prefix, config, db) => {
        // execute
        const PanelEmbed = new EmbedBuilder()
            .setAuthor({
                name: "Informations de recrutement - Shadow's Raven Market",
                iconURL: message.guild.iconURL()
            })
            .setDescription(`Choissisez le grade qui vous intéresse dans les suivants :\n\n> <:SRM_Vente:1060305857960738896> Equipe de Vente\n> <:SRM_Comm:1060305852663349309> Equipe de Communication\n> <:SRM_Mod:1060305868803035156> Equipe de Modération\n> <:SRM_Dev:1060305865388871760> Equipe de Développement\n\nPrenez votre temps, et bonne rédaction ! :)`)
            .setColor(ee.color)
            .setFooter({
                text: ee.footertext,
                iconURL: ee.footericon
            })
        const PanelRow = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("RecruitMenu")
                    .setPlaceholder("Choissisez le grade qui vous intéresse")
                    .addOptions(
                        {
                            label: "Equipe de Vente",
                            description: "Recrutement de l'équipe de Vente",
                            emoji: "<:SRM_Vente:1060305857960738896>",
                            value: "VendeurRC"
                        },
                        {
                            label: "Equipe de Développement",
                            description: "Recrutement de l'équipe de Développement",
                            emoji: "<:SRM_Dev:1060305865388871760>",
                            value: "DevRC"
                        },
                        {
                            label: "Equipe de Communication",
                            description: "Recrutement de l'équipe de Communication",
                            emoji: "<:SRM_Comm:1060305852663349309>",
                            value: "CommRC"
                        },
                        {
                            label: "Equipe de Modération",
                            description: "Recrutement de l'équipe de Modération",
                            emoji: ":SRM_Mod:1060305868803035156>",
                            value: "ModRC"
                        },
                    )
            )
        message.delete()
        message.channel.send({
            embeds: [PanelEmbed],
            components: [PanelRow]
        })
    },
};