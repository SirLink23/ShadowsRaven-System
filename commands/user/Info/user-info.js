const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { index } = require('mathjs');
const moment = require('moment');
const ee = require("../../../embed.json")

module.exports = {
    name: "User Info",
    type: 2,
    run: async (client, interaction, config) => {

        const user = interaction.guild.members.cache.get(interaction.targetId);

        // Time Info
        const joinDate = user.joinedTimestamp;
        const createDate = interaction.user.createdTimestamp;

        const JoinClean = moment(joinDate).format("DD/MM/YYYY | HH:mm")
        const CreateClean = moment(createDate).format("DD/MM/YYYY | HH:mm")

        // Acknowledgements handler:
        // L for Dyno developers
        const acknowledgements = {
            fetch: {
                user(userInput) {
                    let result;

                    try {
                        if (userInput.permissions.has(PermissionsBitField.ViewChannel)) result = "Membre du serveur";
                        if (userInput.permissions.has(PermissionsBitField.KickMembers)) result = "<:SRM_Mod:1060305868803035156> Modérateur du serveur";
                        if (userInput.permissions.has(PermissionsBitField.ManageServer)) result = "<:SRM_Manager:1060305871294439454> Manager du serveur";
                        if (userInput.permissions.has(PermissionsBitField.Administrator)) result = "<:SRM_Admin:1060305874628902912> Administrateur du serveur";
                        if (userInput.id === interaction.guild.ownerId) result = "<:SRM_Owner:1060305846606757919> Propriétaire du serveur";

                    } catch (e) {
                        result = "Membre du serveur";
                    };

                    return result;
                }
            }
        };

        const status = {
			online: "<:discordOnline:847229150028234792>",
			idle: "<:discordIdle:847228944604200961>",
			dnd: "<:discordDnd:847228945233477632>",
			offline: "<:discordOffline:847228944717185034>"
		};

        const support = {
            'mobile': "Mobile",
            'desktop': "Ordinateur"
        }

        const devices = user.presence?.clientStatus || {}

		if (!devices) return

		const checkDesc = () => {
			const entries = Object.entries(devices)
				.map(
					(value, index) => `${value[0][0].toUpperCase()}${value[0].slice(1)}`).join(" | ")
			return `${entries}`
		}

		const appa = {
			Mobile: "Telephone",
			Desktop: "Ordinateur",
            Web: "Web"
		};

        // Finals:

        const UserInfo = new EmbedBuilder()
            .setAuthor({
                name: user.user.tag,
                iconURL: user.user.displayAvatarURL()
            })
            .setThumbnail(user.displayAvatarURL(
                {
                    dynamic: true
                }
            ))
            .setFooter({
                text: ee.footertext,
                iconURL: ee.footericon
            })
            .addFields(
                {
                    name: "**❱ Pseudo :**",
                    value: `${user.user.tag}`,
                    inline: true
                },
                {
                    name: "**❱ ID :**",
                    value: `\`${user.id}\``,
                    inline: true
                },
                /*{
                    name: `Rôles [${user.roles.cache.size - 1}]`, // Use "-1" because we removed the "@everyone" role 
                    value: `${user.roles.cache.map((ROLE) => ROLE).join(' ').replace('@everyone', '') || "[Aucun rôle]"}`,
                    inline: true
                },*/
                {
                    name: "**❱ Rejoint le :**",
                    value: `\`${JoinClean}\`\n<t:${Math.round(joinDate / 1000)}:R>`,
                    inline: true
                },
                {
                    name: "**❱ Créé le :**",
                    value: `\`${CreateClean}\`\n<t:${Math.round(createDate / 1000)}:R>`,
                    inline: true
                },
                /*{
                    name: "Support",
                    value: `${FinalDevice}`,
                    inline: true
                },
                {
                    name: "Remarquable",
                    value: `${acknowledgements.fetch.user(user)}`
                }*/
            )
            .setColor(ee.color)

        if (user.premiumSinceTimestamp != null) {
            const boostCleanClean = moment(user.premiumSinceTimestamp).format("DD/MM/YYYY | HH:mm")
            UserInfo.addFields(
                {
                    name: "**❱ Boost du serveur :**",
                    value: `Depuis le ${boostCleanClean}\n<t:${Math.round(user.premiumSinceTimestamp / 1000)}:R>`,
                    inline: false
                }
            )
        }

        if (user.presence) {
            user.presence.activities.map(a => {
                if (a.name === "Custom Status") {
                    UserInfo.addFields(
                        {
                            name: "**❱ Statut :**",
                            value: `${a.state}`,
                            inline: false
                        }
                    )
                }

                if (a.name === "Spotify") {
                    UserInfo.addFields(
                        {
                            name: "**❱ Spotify :**",
                            value: `**${a.details}** de **${a.state}**`,
                            inline: false
                        }
                    )
                }

                if (a.name === "Paladium") {
                    UserInfo.addFields({
                        name: "**❱ Paladium :**",
                        value: `Joue sur le compte \`${a.assets.smallText}\`\n<t:${Math.round(a.createdTimestamp / 1000)}:R>`,
                        inline: false
                    })
                }
            })

            UserInfo.addFields({
                name: "**❱ Support :**",
                value: `\`${checkDesc()}\` ${status[user.presence.status]}`,
                inline: false
            })
        } else {
            UserInfo.addFields({
                name: "**❱ Support :**",
                value: `\`Inconnu\` <:discordOffline:847228944717185034>`,
                inline: false
            })
        }

        UserInfo.addFields(
            {
                name: `**❱ Rôle principal :**`,
                value: `${user.roles.highest || "[Aucun rôle]"}`,
                inline: true
            },
            {
                name: "**❱ Remarquable :**",
                value: `${acknowledgements.fetch.user(user)}`
            }
        )

        interaction.reply({
            embeds: [UserInfo],
            ephemeral: true
        })
    },
};
