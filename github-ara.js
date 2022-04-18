const {
  SlashCommandBuilder
} = require('@discordjs/builders');
const axios = require("axios");
const {
  MessageEmbed
} = require("discord.js");

module.exports = {
  name: "github-ara",
  command: new SlashCommandBuilder().setName("github-ara").setDescription("Github'da arama yaparsınız.").addStringOption(o => o.setName("query").setDescription("İçerik").setRequired(true)),
  async run(client, int) {

    let query = int.options.getString("query");
    query = query.replaceAll("İ", "I");
    query = query.toLowerCase();
    query = query.replaceAll("ğ", "g").replaceAll("ç", "c").replaceAll("ş", "s").replaceAll("ı", "i").replaceAll("ö", "o").replaceAll("ü", "u");

    let req = await axios.get(`https://api.github.com/search/repositories?q=${query}`);
    let res = req.data;
    let items = res.items;
    items = items.map(a => (`[${a.name}](${a.html_url})`));
    items = items.slice(0, 15);

    await int.reply({
      embeds: [new MessageEmbed().setColor("RANDOM").setTitle(`*${query}* github arama sonuçları`).setDescription(`${(items.length > 0) ? items.join("\n"):'Sonuç bulunamadı'}`).setThumbnail("https://imgs.search.brave.com/dpl3EBeaUxemrVAP6oMJ1bczA9RlvvHwERqxb-Ww1h8/rs:fit:468:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5l/b1pQQjJnZkdILTFj/a2FMX0pTWmR3SGFI/ZyZwaWQ9QXBp").setTimestamp().setAuthor({
        name: `${int.member.user.tag}`,
        iconURL: `${int.member.user.displayAvatarURL()}`
      })],
      ephemeral: true
    });
  }
};
