const { EmbedBuilder, PermissionsBitField, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder, MessageAttachment, AttachmentBuilder } = require("discord.js");
const client = require("../../index");
const config = require("../../config/config.js");
const ee = require("../../embed.json")
const { Ticket } = require("../../Models/index")
const moment = require("moment")
const Transcripts = require("discord-html-transcripts")

module.exports = {
  name: "interactionCreate"
};

client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = client.slash_commands.get(interaction.commandName);

    if (!command) return;

    try {
      command.run(client, interaction, config);
    } catch (e) {
      console.error(e)
    };
  };

  if (interaction.isUserContextMenuCommand()) { // User:
    const command = client.user_commands.get(interaction.commandName);

    if (!command) return;

    try {
      command.run(client, interaction, config);
    } catch (e) {
      console.error(e)
    };
  };

  if (interaction.isMessageContextMenuCommand()) { // Message:
    const command = client.message_commands.get(interaction.commandName);

    if (!command) return;

    try {
      command.run(client, interaction, config);
    } catch (e) {
      console.error(e)
    };
  };

  if (interaction.isModalSubmit()) { // Modals:
    const modal = client.modals.get(interaction.customId);

    if (!modal) return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription('Something went wrong... Probably the Modal ID is not defined in the modals handler.')
          .setColor('Red')
      ],
      ephemeral: true
    });

    try {
      modal.run(client, interaction, config);
    } catch (e) {
      console.error(e)
    };
  }

  if (interaction.isButton()) { // Buttons:
    const guild = interaction.member.guild;
    const user = interaction.user;
    const member = interaction.member;
    const ticket = await Ticket.findOne({ channelID: interaction.channel.id })
    const date = Date.now()
    await interaction.deferUpdate()
    if (interaction.customId === "ButtonPart") {
      const ticketChannel = await guild.channels.create({
        name: `partenariat-${user.username}`,
        type: ChannelType.GuildText,
        parent: "785809258545545237",
        permissionOverwrites: [
          {
            id: guild.id, //Everyone
            deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          },
          {
            id: user.id, //Client
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          },
          {
            id: "1024081661417234443", //Mod +
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          },
          {
            id: "825489457478107176", //Responsable
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          }
        ]
      })

      await Ticket.create({ userID: user.id, channelID: ticketChannel.id, status: "Ouvert", ticketID: date, typeofTicket: "Partenariat", dateOpen: moment(date).format("DD/MM/YYYY | HH:mm") });

      const actuel = await Ticket.findOne({ userID: user.id, ticketID: date })

      const logs = new EmbedBuilder()
        .setColor(ee.color)
        .setFooter({
          text: ee.footertext,
          iconURL: ee.footericon
        })
        .setAuthor({
          name: "Nouveau Ticket",
          iconURL: member.user.displayAvatarURL({ dynamic: true })
        })
        .setDescription(`${user} (\`${user.id}\`)\n**Date de création du compte** : ${moment(member.joinedTimestamp).format("DD/MM/YYYY")}\n**ID** : ${actuel.ticketID}`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }));
      client.channels.cache.get("816781822251630595").send({ embeds: [logs] })

      const open = new EmbedBuilder()
        .setColor(ee.color)
        .setFooter({
          text: ee.footertext,
          iconURL: ee.footericon
        })
        .setAuthor({
          name: "Nouveau Ticket",
          iconURL: member.user.displayAvatarURL({ dynamic: true })
        })
        .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setDescription(`<a:flechequibouge:844716039429292042> L'équipe du Shadow's Raven Market te souhaite la bienvenue.\n\n> <:modo:853398766430060554> Explique nous la raison de ta venue.\n\n*Tu peux annuler si tu le souhaites grâce au bouton ci-dessous*.`)
      const Row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Danger)
            .setCustomId("ButtonTicketClose")
            .setEmoji("❌")
            .setLabel("Fermer le ticket")
        )
        .addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Success)
            .setCustomId("ButtonTicketClaim")
            .setEmoji("🙆‍♂️")
            .setLabel("Claim le ticket")
        )
      ticketChannel.send({
        content: "Bienvenue" + user.toString(),
        embeds: [open],
        components: [Row]
      })
    }

    if (interaction.customId === "ButtonQuestion") {
      const ticketChannel = await guild.channels.create({
        name: `support-${user.username}`,
        type: ChannelType.GuildText,
        parent: "785809258545545237",
        permissionOverwrites: [
          {
            id: guild.id, //Everyone
            deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          },
          {
            id: user.id, //Client
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          },
          {
            id: "1024081661417234443", //Mod +
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          },
          {
            id: "825489457478107176", //Responsable
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          },
          {
            id: "813062043929280533",
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          }
        ]
      })

      await Ticket.create({ userID: user.id, channelID: ticketChannel.id, status: "Ouvert", ticketID: date, typeofTicket: "Problème / Question", dateOpen: moment(date).format("DD/MM/YYYY | HH:mm") });

      const actuel = await Ticket.findOne({ userID: user.id, ticketID: date })

      const logs = new EmbedBuilder()
        .setColor(ee.color)
        .setFooter({
          text: ee.footertext,
          iconURL: ee.footericon
        })
        .setAuthor({
          name: "Nouveau Ticket",
          iconURL: member.user.displayAvatarURL({ dynamic: true })
        })
        .setDescription(`${user} (\`${user.id}\`)\n**Date de création du compte** : ${moment(member.joinedTimestamp).format("DD/MM/YYYY")}\n**ID** : ${actuel.ticketID}`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }));
      client.channels.cache.get("816781822251630595").send({ embeds: [logs] })

      const open = new EmbedBuilder()
        .setColor(ee.color)
        .setFooter({
          text: ee.footertext,
          iconURL: ee.footericon
        })
        .setAuthor({
          name: "Nouveau Ticket",
          iconURL: member.user.displayAvatarURL({ dynamic: true })
        })
        .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setDescription(`<a:flechequibouge:844716039429292042> L'équipe du Shadow's Raven Market te souhaite la bienvenue.\n\n> <:modo:853398766430060554> Explique nous la raison de ta venue.\n\n*Tu peux annuler si tu le souhaites grâce au bouton ci-dessous*.`)
      const Row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Danger)
            .setCustomId("ButtonTicketClose")
            .setEmoji("❌")
            .setLabel("Fermer le ticket")
        )
        .addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Success)
            .setCustomId("ButtonTicketClaim")
            .setEmoji("🙆‍♂️")
            .setLabel("Claim le ticket")
        )
      ticketChannel.send({
        content: "Bienvenue" + user.toString(),
        embeds: [open],
        components: [Row]
      })
    }

    if (interaction.customId === "ButtonReport") {
      const ticketChannel = await guild.channels.create({
        name: `report-${user.username}`,
        type: ChannelType.GuildText,
        parent: "785809258545545237",
        permissionOverwrites: [
          {
            id: guild.id, //Everyone
            deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          },
          {
            id: user.id, //Client
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          },
          {
            id: "1024081661417234443", //Mod +
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          },
          {
            id: "825489457478107176", //Responsable
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          },
          {
            id: "813062043929280533",
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          }
        ]
      })

      await Ticket.create({ userID: user.id, channelID: ticketChannel.id, status: "Ouvert", ticketID: date, typeofTicket: "Report", dateOpen: moment(date).format("DD/MM/YYYY | HH:mm") });

      const actuel = await Ticket.findOne({ userID: user.id, ticketID: date })

      const logs = new EmbedBuilder()
        .setColor(ee.color)
        .setFooter({
          text: ee.footertext,
          iconURL: ee.footericon
        })
        .setAuthor({
          name: "Nouveau Ticket",
          iconURL: member.user.displayAvatarURL({ dynamic: true })
        })
        .setDescription(`${user} (\`${user.id}\`)\n**Date de création du compte** : ${moment(member.joinedTimestamp).format("DD/MM/YYYY")}\n**ID** : ${actuel.ticketID}`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }));
      client.channels.cache.get("816781822251630595").send({ embeds: [logs] })

      const open = new EmbedBuilder()
        .setColor(ee.color)
        .setFooter({
          text: ee.footertext,
          iconURL: ee.footericon
        })
        .setAuthor({
          name: "Nouveau Ticket",
          iconURL: member.user.displayAvatarURL({ dynamic: true })
        })
        .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setDescription(`<a:flechequibouge:844716039429292042> L'équipe du Shadow's Raven Market te souhaite la bienvenue.\n\n> <:modo:853398766430060554> Explique nous la raison de ta venue.\n\n*Tu peux annuler si tu le souhaites grâce au bouton ci-dessous*.`)
      const Row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Danger)
            .setCustomId("ButtonTicketClose")
            .setEmoji("❌")
            .setLabel("Fermer le ticket")
        )
        .addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Success)
            .setCustomId("ButtonTicketClaim")
            .setEmoji("🙆‍♂️")
            .setLabel("Claim le ticket")
        )
      ticketChannel.send({
        content: "Bienvenue" + user.toString(),
        embeds: [open],
        components: [Row]
      })
    }

    if (interaction.customId === "ButtonGift") {
      const ticketChannel = await guild.channels.create({
        name: `récompense-${user.username}`,
        type: ChannelType.GuildText,
        parent: "785809258545545237",
        permissionOverwrites: [
          {
            id: guild.id, //Everyone
            deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          },
          {
            id: user.id, //Client
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          },
          {
            id: "1024081661417234443", //Mod +
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          },
          {
            id: "825489457478107176", //Responsable
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          },
          {
            id: "813062043929280533",
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          }
        ]
      })

      await Ticket.create({ userID: user.id, channelID: ticketChannel.id, status: "Ouvert", ticketID: date, typeofTicket: "Récompense", dateOpen: moment(date).format("DD/MM/YYYY | HH:mm") });

      const actuel = await Ticket.findOne({ userID: user.id, ticketID: date })

      const logs = new EmbedBuilder()
        .setColor(ee.color)
        .setFooter({
          text: ee.footertext,
          iconURL: ee.footericon
        })
        .setAuthor({
          name: "Nouveau Ticket",
          iconURL: member.user.displayAvatarURL({ dynamic: true })
        })
        .setDescription(`${user} (\`${user.id}\`)\n**Date de création du compte** : ${moment(member.joinedTimestamp).format("DD/MM/YYYY")}\n**ID** : ${actuel.ticketID}`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }));
      client.channels.cache.get("816781822251630595").send({ embeds: [logs] })

      const open = new EmbedBuilder()
        .setColor(ee.color)
        .setFooter({
          text: ee.footertext,
          iconURL: ee.footericon
        })
        .setAuthor({
          name: "Nouveau Ticket",
          iconURL: member.user.displayAvatarURL({ dynamic: true })
        })
        .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setDescription(`<a:flechequibouge:844716039429292042> L'équipe du Shadow's Raven Market te souhaite la bienvenue.\n\n> <:modo:853398766430060554> Explique nous la raison de ta venue.\n\n*Tu peux annuler si tu le souhaites grâce au bouton ci-dessous*.`)
      const Row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Danger)
            .setCustomId("ButtonTicketClose")
            .setEmoji("❌")
            .setLabel("Fermer le ticket")
        )
        .addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Success)
            .setCustomId("ButtonTicketClaim")
            .setEmoji("🙆‍♂️")
            .setLabel("Claim le ticket")
        )
      ticketChannel.send({
        content: "Bienvenue" + user.toString(),
        embeds: [open],
        components: [Row]
      })
    }

    if (interaction.customId === "ButtonExtra") {
      const ticketChannel = await guild.channels.create({
        name: `exceptionnelle-${user.username}`,
        type: ChannelType.GuildText,
        parent: "785809258545545237",
        permissionOverwrites: [
          {
            id: guild.id, //Everyone
            deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          },
          {
            id: user.id, //Client
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          },
          {
            id: "1024081661417234443", //Mod +
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          },
          {
            id: "825489457478107176", //Responsable
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          },
          {
            id: "813062043929280533",
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
          }
        ]
      })

      await Ticket.create({ userID: user.id, channelID: ticketChannel.id, status: "Ouvert", ticketID: date, typeofTicket: "Commande exceptionnelle", dateOpen: moment(date).format("DD/MM/YYYY | HH:mm") });

      const actuel = await Ticket.findOne({ userID: user.id, ticketID: date })

      const logs = new EmbedBuilder()
        .setColor(ee.color)
        .setFooter({
          text: ee.footertext,
          iconURL: ee.footericon
        })
        .setAuthor({
          name: "Nouveau Ticket",
          iconURL: member.user.displayAvatarURL({ dynamic: true })
        })
        .setDescription(`${user} (\`${user.id}\`)\n**Date de création du compte** : ${moment(member.joinedTimestamp).format("DD/MM/YYYY")}\n**ID** : ${actuel.ticketID}`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }));
      client.channels.cache.get("816781822251630595").send({ embeds: [logs] })

      const open = new EmbedBuilder()
        .setColor(ee.color)
        .setFooter({
          text: ee.footertext,
          iconURL: ee.footericon
        })
        .setAuthor({
          name: "Nouveau Ticket",
          iconURL: member.user.displayAvatarURL({ dynamic: true })
        })
        .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setDescription(`<a:flechequibouge:844716039429292042> L'équipe du Shadow's Raven Market te souhaite la bienvenue.\n\n> <:modo:853398766430060554> Explique nous la raison de ta venue.\n\n*Tu peux annuler si tu le souhaites grâce au bouton ci-dessous*.`)
      const Row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Danger)
            .setCustomId("ButtonTicketClose")
            .setEmoji("❌")
            .setLabel("Fermer le ticket")
        )
        .addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Success)
            .setCustomId("ButtonTicketClaim")
            .setEmoji("🙆‍♂️")
            .setLabel("Claim le ticket")
        )
      ticketChannel.send({
        content: "Bienvenue" + user.toString(),
        embeds: [open],
        components: [Row]
      })
    }

    if (interaction.customId === 'ButtonTicketClaim') {
      if (ticket.status === "Fermé" || ticket.status === "Supprimé") return interaction.channel.send({ content: "Vous ne pouvez pas claim un ticket fermé ou supprimé !", ephemeral: true })
      if (ticket.isTaken === true) return interaction.channel.send({ content: "Ce ticket est déjà claim !", ephemeral: true })
      if (!member.roles.cache.has('906322087701020703')) return interaction.channel.send("Vous ne pouvez pas faire ça")

      ticket.staff = `${interaction.user.id}`;
      ticket.isTaken = true
      await ticket.save();

      const logsclaim = new EmbedBuilder()
        .setColor(ee.color)
        .setFooter({
          text: ee.footertext,
          iconURL: ee.footericon
        })
        .setAuthor({
          name: "Ticket claim",
          iconURL: member.user.displayAvatarURL({ dynamic: true })
        })
        .setDescription(`**Créé par :** ${guild.members.cache.get(ticket.userID)} (\`${ticket.userID}\`)\n**Claim par :** ${user} (\`${user.id}\`)\n**ID :** ${ticket.ticketID}`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }));
      client.channels.cache.get("816781822251630595").send({ embeds: [logsclaim] })

      const infoClaim = new EmbedBuilder()
        .setColor(ee.color)
        .setFooter({
          text: ee.footertext,
          iconURL: ee.footericon
        })
        .setAuthor({
          name: "Ticket claim",
          iconURL: member.user.displayAvatarURL({ dynamic: true })
        })
        .setDescription(`Votre ticket sera traité par ${interaction.user}`)

      interaction.channel.send({
        embeds: [infoClaim]
      })
    }

    if (interaction.customId === 'ButtonTicketClose') {
      if (ticket.status === "Fermé") return interaction.reply({
        content: "Ce ticket est déjà fermé !",
        ephemeral: true
      })
      const msg = interaction.channel.send({ content: "Fermeture du ticket dans 5 secondes...", ephemeral: true })
      setTimeout(async () => {
        interaction.channel.permissionOverwrites.edit(guild.members.cache.get(ticket.userID), {
          [PermissionsBitField.Flags.ViewChannel]: false
        })
        const logsclose = new EmbedBuilder()
          .setColor(ee.color)
          .setFooter({
            text: ee.footertext,
            iconURL: ee.footericon
          })
          .setAuthor({
            name: "Ticket fermé",
            iconURL: member.user.displayAvatarURL({ dynamic: true })
          })
          .setDescription(`**Créé par :** ${guild.members.cache.get(ticket.userID)} (\`${ticket.userID}\`)\n**Fermé par :** ${user} (\`${user.id}\`)\n**ID :** ${ticket.ticketID}`)
          .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }));
        client.channels.cache.get("816781822251630595").send({ embeds: [logsclose] })

        ticket.status = "Fermé";
        await ticket.save();

        const closed = new EmbedBuilder()
          .setColor(ee.color)
          .setFooter({
            text: ee.footertext,
            iconURL: ee.footericon
          })
          .setAuthor({
            name: "Ticket fermé",
            iconURL: member.user.displayAvatarURL({ dynamic: true })
          })
          .setDescription('🔓 Réouvrir le ticket\n📑 Créer le transcript\n❌ Supprimer le ticket')
        const ChooseAction = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Success)
              .setCustomId("ButtonTicketReopen")
              .setEmoji("🔓")
              .setLabel("Réouvrir le ticket")
          )
          .addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setCustomId("ButtonTicketTranscript")
              .setEmoji("📑")
              .setLabel("Transcription du ticket")
          )
          .addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Danger)
              .setCustomId("ButtonTicketDelete")
              .setEmoji("❌")
              .setLabel("Supprimer le ticket")
          )
        interaction.channel.send({
          content: '🔒 Ticket fermé par ' + interaction.user.tag,
          embeds: [closed],
          components: [ChooseAction],
        }, 5000)
      })
    }

    if (interaction.customId === 'ButtonTicketReopen') {
      if (ticket.status === "Réouvert") return interaction.channel.send({ content: "Ce ticket a déjà été réouvert !", ephemeral: true })
      if (!member.roles.cache.has('906322087701020703')) return interaction.channel.send("Vous ne pouvez pas faire ça")

      interaction.channel.permissionOverwrites.create(guild.members.cache.get(ticket.userID), {
        [PermissionsBitField.Flags.ViewChannel]: true,
        [PermissionsBitField.Flags.SendMessages]: true
      });

      ticket.status = 'Réouvert';
      await ticket.save();

      const logsropen = new EmbedBuilder()
        .setColor(ee.color)
        .setFooter({
          text: ee.footertext,
          iconURL: ee.footericon
        })
        .setAuthor({
          name: "Ticket réouvert",
          iconURL: member.user.displayAvatarURL({ dynamic: true })
        })
        .setDescription(`**Créé par :** ${guild.members.cache.get(ticket.userID)} (\`${ticket.userID}\`)\n**Réouvert par :** ${user} (\`${user.id}\`)\n**ID :** ${ticket.ticketID}`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }));
      client.channels.cache.get("816781822251630595").send({ embeds: [logsropen] })

      interaction.channel.send("Ticket réouvert")
    }

    if (interaction.customId === 'ButtonTicketDelete') {

      if (ticket.status !== 'Fermé') return interaction.reply({ content: 'Vous devez attendre que le ticket soit fermé pour pouvoir le supprimer.', ephemeral: true });

      if (!member.roles.cache.has('906322087701020703')) return interaction.channel.send({ content: 'Vous ne pouvez pas effectuer cette action !', ephemeral: true });

      const logsclose = new EmbedBuilder()
        .setColor(ee.color)
        .setFooter({
          text: ee.footertext,
          iconURL: ee.footericon
        })
        .setAuthor({
          name: "Ticket supprimé",
          iconURL: member.user.displayAvatarURL({ dynamic: true })
        })
        .setDescription(`**Créé par :** ${guild.members.cache.get(ticket.userID)} (\`${ticket.userID}\`)\n**Supprimé par :** ${user} (\`${user.id}\`)\n**ID :** ${ticket.ticketID}`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }));
      client.channels.cache.get("816781822251630595").send({ embeds: [logsclose] })

      let ticketChannel = interaction.channel;

      let allMessages = await ticketChannel.messages.fetch()
      let systemMessages = allMessages.filter(m => m.content && m.author.id != client.user.id && !m.author.bot).map(m => msToTime(m.createdTimestamp) + " | " + m.author.tag + ": " + m.cleanContent).join("\n");
      if (!systemMessages) systemMessages = "Aucun message trouve"

      const dateClose = Date.now()
      let attch = new AttachmentBuilder(Buffer.from(systemMessages), { name: `${interaction.channel.name}.txt` });
      client.channels.cache.get("1078841731396673586").send({
        content: `Transcription du ticket \`${interaction.channel.name}\` supprimé le ${moment(dateClose).format("DD/MM/YYYY | HH:mm")} (<t:${Math.round(dateClose / 1000)}:R>)\nID du ticket : ${ticket.ticketID}`,
        files: [attch]
      });

      interaction.channel.send({ content: 'Suppression du ticket dans 5 secondes...' });
      setTimeout(async () => {
        interaction.channel.delete().catch();
        ticket.status = "Supprimé"
        await ticket.save();
      }, 5000);
    }

    if (interaction.customId === "ButtonTicketTranscript") {
      let ticketChannel = interaction.channel;

      let allMessages = await ticketChannel.messages.fetch()
      let systemMessages = allMessages.filter(m => m.content && m.author.id != client.user.id && !m.author.bot).map(m => msToTime(m.createdTimestamp) + " | " + m.author.tag + ": " + m.cleanContent).join("\n");
      if (!systemMessages) systemMessages = "Aucun message trouve"

      let attch = new AttachmentBuilder(Buffer.from(systemMessages), { name: `${interaction.channel.name}.txt` });
      ticketChannel.send({
        content: `${user}, ta transcription est prête`,
        files: [attch]
      });

      /*const logstrans = new EmbedBuilder()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setAuthor("Transcription crée", member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`**Ticket de :** ${guild.members.cache.get(ticket.userID)} (\`${ticket.userID}\`)\n**Demandé par :** ${user} (\`${user.id}\`)\n**ID :** ${ticket.ticketID}`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }));
      client.channels.cache.get("816781822251630595").send({
        embeds: [logstrans],
        files: [attch]
      })*/
    }
  }
});

function msToTime(ms) {
  let fullFill = (a, limit) => ("0".repeat(69) + a.toString()).slice(limit ? -limit : -2);

  let daet = new Date(ms);

  let day = fullFill(daet.getDate());
  let month = fullFill(daet.getMonth());
  let year = fullFill(daet.getFullYear(), 4);

  let hours = fullFill(daet.getHours());
  let mins = fullFill(daet.getMinutes());
  let secs = fullFill(daet.getSeconds());

  return `${day}/${month}/${year} ${hours}:${mins}:${secs}`;
}