const { MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("fr");
const fs = require("fs");
const mongoose = require('mongoose')
const { Guild } = require("./Models/index")
const { Member } = require("./Models/index")
//const { Case } = require("./Models/index")

module.exports = async (client) => {
    client.createGuild = async guild => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild)
        const createGuild = await new Guild(merged);
        createGuild.save().then(g => console.log(`Nouveau serveur`))
    }

    client.createMember = async member => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, member)
        const createMember = await new Member(merged);
        createMember.save().then(g => console.log(`Nouveau membre`))
    }

    /*client.getGuild = async guild => {
        const data = await Guild.findOne({ guildID: guild.id })
        if (data) return data;
        return config.DEFAULTSETTINGS;
    };*/

    client.getUsers = async guild => {
        const data = await Member.find({ guildID: guild.id });
        if (data) return data;
        else return;
    };

    /*client.getCases = async (guild, member) => {
        const data = await Case.find({ guildID: guild.id, userID: member.id });
        if (data) return data;
        else return;
    };

    client.createCase = async member => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, member)
        const createCase = await new Case(merged);
        createCase.save().then(m => console.log(`Nouveau casier`))
    };

    client.getMCases = async (guild, member) => {
        const data = await Case.find({ guildID: guild.id, modID: member.id });
        if (data) return data;
        else return;
    };*/
};