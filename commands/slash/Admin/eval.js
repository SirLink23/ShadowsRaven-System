const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "eval", // Name of command
    description: "Evaluate Action", // Command description
    type: 1, // Command type
    options: [
        {
            name: "query",
            description: "Query to evaluate",
            type: 3,
            required: true,
        }
    ], // Command options
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "Administrator" // User permissions needed
    },
    run: async (client, interaction, config, db) => {
        // execute
        const query = interaction.options.getString('query');
        if (interaction.user.id !== "386853368318001152") // 386853368318001152
            return interaction.reply(
                ":x: ERREUR : Seul l'owner du bot peut faire cela !"
            );
        if (
            query.includes("token") ||
            query.includes("client.token") ||
            query.includes("client.token")
        )
            return interaction.reply(
                "cette action est trop dangereuse, je ne peux pas vous laisser faire ça"
            );
        try {
            let codein = query;
            let code = eval(codein);

            if (typeof code !== "string")
                code = require("util").inspect(code, { depth: 0 });
            const embed = new EmbedBuilder()
                .setAuthor({
                    name: `Eval demandé par ${interaction.user.username}`,
                    iconURL: interaction.user.avatarURL({ dynamic: true })
                })
                .setColor("#338EFF")
                .addFields({
                    name: ":inbox_tray: Entrée",
                    value: `\`\`\`js\n${codein}\`\`\``
                },
                    {
                        name: ":outbox_tray: Sortie",
                        value: `\`\`\`js\n${code}\n\`\`\``
                    }
                )
                .setFooter({
                    text: `${interaction.guild.name}`,
                    iconURL: interaction.guild.iconURL({ dynamic: true })
                })
                .setTimestamp();
    interaction.reply({ embeds: [embed] });
} catch (e) {
    interaction.reply(`\`\`\`js\n${e}\n\`\`\``);
}
    },
};