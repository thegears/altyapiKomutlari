const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require("axios");

module.exports = {
    name : "deprem-bilgi",
    command :  new SlashCommandBuilder().setName("deprem-bilgi").setDescription("Son depremlar hakkında bilgi alırsınız."),
    async run(client,int){
        let embeddescription = "";
        let a = await axios.get("https://api.orhanaydogdu.com.tr/deprem/live.php?limit=10");
        a = a.data.result;

        a.forEach((d,i) => {
          embeddescription += `${i + 1}. ${d.lokasyon} | ${d.depth}\n`;
        });
        
        await int.reply({
          embeds : [ new MessageEmbed().setDescription(embeddescription).setColor("RANDOM") ],
ephemeral : true
        });  

    }
};
