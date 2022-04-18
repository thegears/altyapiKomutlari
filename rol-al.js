const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    Permissions
} = require('discord.js');

module.exports = {
    name: "rol-al",
    command: new SlashCommandBuilder().setName("rol-al").setDescription("Rol alırsınız.").addUserOption(option => option.setName("user").setDescription("Kişi.").setRequired(true)).addRoleOption(option => option.setName("role").setDescription("Rol.").setRequired(true)),
    async run(client, int, db) {
        let user = int.options.getUser("user");
        let role = int.options.getRole("role");

        if (!int.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) await int.reply({
            content: "Yetkili değilsin.",
            ephemeral: true
        })
        else {
            try {
                await int.guild.members.cache.get(user.id).roles.remove(role.id);
                await int.reply({
                    content: "Alındı.",
                    ephemeral: true
                });
            } catch (err) {
                await int.reply({
                    content: "Rol alırken bir hata aldım.",
                    ephemeral: true
                });
                console.log(err.message + " => Rol Alırken");
            };
        };

    }
};
