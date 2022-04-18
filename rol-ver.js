const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    Permissions
} = require('discord.js');

module.exports = {
    name: "rol-ver",
    command: new SlashCommandBuilder().setName("rol-ver").setDescription("Rol verirsiniz.").addUserOption(option => option.setName("user").setDescription("Kişi.").setRequired(true)).addRoleOption(option => option.setName("role").setDescription("Rol.").setRequired(true)),
    async run(client, int, db) {
        let user = int.options.getUser("user");
        let role = int.options.getRole("role");

        if (!int.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) await int.reply({
            content: "Yetkili değilsin.",
            ephemeral: true
        })
        else {
            try {
                await int.guild.members.cache.get(user.id).roles.add(role.id);
                await int.reply({
                    content: "Verildi.",
                    ephemeral: true
                });
            } catch (err) {
                await int.reply({
                    content: "Rol verirken bir hata aldım.",
                    ephemeral: true
                });
                console.log(err.message + " => Rol Verirken");
            };
        };

    }
};
