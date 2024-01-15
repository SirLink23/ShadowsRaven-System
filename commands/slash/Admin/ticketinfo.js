const { EmbedBuilder } = require('discord.js');
const ee = require("../../../embed.json")
const { Ticket } = require("../../../Models/index")

module.exports = {
    name: "ticketinfo", // Name of command
    description: "Permet de retrouver des informations concernant un ticket via son identifiant", // Command description
    type: 1, // Command type
    options: [
        {
            name: "id",
            description: "L\'identifiant du ticket dont vous voulez connaitre les informations",
            type: 3,
            required: true,
        }
    ], // Command options
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "ViewAuditLog" // User permissions needed
    },
    run: async (client, interaction, config, db) => {
        // execute
        const idTicket = interaction.options.getString('id');
        const settings = await Ticket.findOne({ ticketID: idTicket, guildID: interaction.guild.id })
        const member = await interaction.guild.members.cache.get(settings.userID)
        const embed = new EmbedBuilder()
            .setAuthor({
                name: `Informations sur le support n°${settings.ticketID}`,
                iconURL: member.user.displayAvatarURL()
            })
            .setColor(ee.color)
            .setFooter({
                text: ee.footertext,
                iconURL: ee.footericon
            })
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .addFields(
                {
                    name: '**❱ Créé par :**',
                    value: `${interaction.guild.members.cache.get(settings.userID)}`,
                    inline: true
                },
                {
                    name: '**❱ Type :**',
                    value: `${settings.typeofTicket}`,
                    inline: true
                },
                {
                    name: '**❱ Statut :**',
                    value: `${settings.status}`,
                    inline: true
                },
                {
                    name: '**❱ Claim :**',
                    value: `${settings.isTaken}`,
                    inline: true
                },
                {
                    name: '**❱ Date :**',
                    value: `${settings.isTaken}`,
                    inline: true
                },
                {
                    name: '**❱ Staff :**',
                    value: `<@${settings.staff}>`,
                    inline: true
                },
            )
        interaction.reply({ embeds: [embed] })
    },
};