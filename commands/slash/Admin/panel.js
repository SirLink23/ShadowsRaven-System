const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const ee = require("../../../embed.json")

module.exports = {
    name: "panel", // Name of command
    description: "Panel de support", // Command description
    type: 1, // Command type
    options: [], // Command options
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "Administrator" // User permissions needed
    },
    run: async (client, interaction, config, db) => {
        // execute
        const support = new EmbedBuilder()
            .setColor(ee.color)
            .setThumbnail(client.user.displayAvatarURL())
            .setAuthor({
                name: "Shadow's Raven Market - Support :",
                iconURL: interaction.guild.iconURL()
            })
            .setFooter({
                text: ee.footertext,
                iconURL: ee.footericon
            })
            .setDescription('Il existe plusieurs types de tickets, pour en ouvrir un, il suffit de cliquer sur la réaction correspondante : \n\n<:SRPing:843182517259075625> Partenariat\n<:warning:843182893496270878> Problème/Question\n<:blacklist:843185104997187624> Report\n<a:Giveaway:843182545021829181> Récompense\n<:player:889786445001293834> Commande exceptionnelle\n\n<:scurit:843186100361363476> Seul le staff aura accès à votre support.');
        const Row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId("ButtonPart")
                    .setLabel("Communication / Partenariat")
                    .setEmoji("843182517259075625")
            )
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId("ButtonQuestion")
                    .setLabel("Problème / Question")
                    .setEmoji("843182893496270878")
            )
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId("ButtonReport")
                    .setLabel("Report")
                    .setEmoji("843185104997187624")
            )
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId("ButtonGift")
                    .setLabel("Récompenses")
                    .setEmoji("843182545021829181")
            )
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId("ButtonExtra")
                    .setLabel("Commande exceptionnelle")
                    .setEmoji("889786445001293834")
            )

        await interaction.reply({
            embeds: [support],
            components: [Row]
        });

        /*const log = new Discord.MessageEmbed()
            .setAuthor("Nouvelle log")
            .setColor(`RANDOM`)
            .setDescription(`**Action :** SupportPanelLoad\n**Administrateur :** <@${interaction.user.id}>`)
            .setThumbnail(interaction.guild.iconURL())
            .setTimestamp()
            .setFooter("Shadow's Raven Market", interaction.guild.iconURL());
        interaction.guild.channels.cache.get("816781822251630595").send({ embeds: [log] });*/
    },
};