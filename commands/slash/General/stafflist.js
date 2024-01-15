const { EmbedBuilder } = require('discord.js');
const ee = require("../../../embed.json")

module.exports = {
    name: "stafflist", // Name of command
    description: "Liste du Staff", // Command description
    type: 1, // Command type
    options: [], // Command options
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages" // User permissions needed
    },
    run: async (client, interaction, config, db) => {
        // execute

        const admin = client.guilds.cache.get("461473504970145802").roles.cache.get("1009122825887547463").members.map(m => `<@${m.user.id}>`).join(", ")
        const resp = client.guilds.cache.get("461473504970145802").roles.cache.get("825489457478107176").members.map(m => `<@${m.user.id}>`).join(", ")
        const discord = client.guilds.cache.get("461473504970145802").roles.cache.get("838506839145840791").members.map(m => `<@${m.user.id}>`).join(", ")
        const dev = client.guilds.cache.get("461473504970145802").roles.cache.get("838507691122229248").members.map(m => `<@${m.user.id}>`).join(", ")
        const vendeurs = client.guilds.cache.get("461473504970145802").roles.cache.get("838509130556768307").members.map(m => `<@${m.user.id}>`).join(", ")
        const anim = client.guilds.cache.get("461473504970145802").roles.cache.get("838509511936442369").members.map(m => `<@${m.user.id}>`).join(", ")
        const crea = client.guilds.cache.get("461473504970145802").roles.cache.get("838511094946594826").members.map(m => `<@${m.user.id}>`).join(", ")
        const staff = client.guilds.cache.get("461473504970145802").roles.cache.get("906322087701020703").members.size
        const nadmin = client.guilds.cache.get("461473504970145802").roles.cache.get("1009122825887547463").members.size
        const nresp = client.guilds.cache.get("461473504970145802").roles.cache.get("825489457478107176").members.size
        const ndiscord = client.guilds.cache.get("461473504970145802").roles.cache.get("838506839145840791").members.size
        const ndev = client.guilds.cache.get("461473504970145802").roles.cache.get("838507691122229248").members.size
        const nvendeurs = client.guilds.cache.get("461473504970145802").roles.cache.get("838509130556768307").members.size
        const nanim = client.guilds.cache.get("461473504970145802").roles.cache.get("838509511936442369").members.size
        const ncrea = client.guilds.cache.get("461473504970145802").roles.cache.get("838511094946594826").members.size

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(ee.color)
                    .setTitle("Effectif du Shadow's Raven Market :")
                    .setAuthor({ name: 'Effectif - Shadow\'s Raven Market', iconURL: ee.footericon })
                    .setTimestamp()
                    .setFooter({ text: ee.footertext, iconURL: ee.footericon })
                    .addFields(
                        { name: `Administration (${nadmin})`, value: `${admin}` },
                        { name: `Responsable (${nresp})`, value: `${resp}` },
                        { name: `Équipe Discord (${ndiscord})`, value: `${discord}` },
                        { name: `Équipe de Développement (${ndev})`, value: `${dev}` },
                        { name: `Équipe d'Animation (${nanim})`, value: `${anim}` },
                        { name: `Équipe de Création (${ncrea})`, value: `${crea}` },
                        { name: `Équipe de Vente (${nvendeurs})`, value: `${vendeurs}` },
                        { name: `Nombre de staff`, value: `${staff}` }
                    )
            ]
        })
    },
};