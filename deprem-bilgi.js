const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name : "deprem-bilgi",
    command :  new SlashCommandBuilder().setName("deprem-bilgi").setDescription("Son depremlar hakkında bilgi alırsınız."),
    async run(client,int){
        let embeddescription = "";
        let a = await axios.get("https://api.orhanaydogdu.com.tr/deprem/live.php?limit=10");
        a = a.data.result;

        a.forEach((d,i) => {
          embeddescription += `${i + 1}. ${d.lokasyon} | ${d.mag}\n`;
        });
        
        await int.reply({
          embeds : [ new MessageEmbed().setDescription(embeddescription).setColor("RANDOM").setThumbnail("https://imgs.search.brave.com/N3uR0KiofI9Gvbhy4B7_6bTB7En9wAjx4kTWldnRp4A/rs:fit:817:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5i/MmYzY3p4b3k1bkRq/bzlxaHRZb1F3SGFF/VCZwaWQ9QXBp").setTitle("Yaşanan son depremler").setTimestamp() ],
ephemeral : true
        });  

    }
};
