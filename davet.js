const {
  SlashCommandBuilder
} = require('@discordjs/builders');
const {
  MessageEmbed
} = require("discord.js");

module.exports = {
    name: "davet",
    command: new SlashCommandBuilder().setName("davet").setDescription("Botun davet linkini atar."),
  async run(client, int) {
    int.reply({
      embeds: [new MessageEmbed().setColor("RANDOM").setDescription(`[Beni davet etmek için tıkla!](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`)]
    });
  }
};
