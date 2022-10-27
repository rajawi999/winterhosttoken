const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton } = require('discord.js');
const ms = require('ms')

module.exports = {
	name: 'bot',
	description: `Bot Info`,
	cooldown : 5,
	UserPermission : [""],
	async execute(client , interaction ) {

await interaction.editReply({ content : `**Please Wait ..**`})
if(!interaction.guild.me.permissions.has("EMBED_LINKS")) return interaction.editReply({content : `**Missing Permissions**`});


let help = new MessageEmbed()
.setAuthor({ name: `Bot Info`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 1024 })}`})
.setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true, size: 1024 })}`)
.setDescription(`**Ping :**
\`${client.ws.ping}\`
**UpTime :**
\`${ms(client.uptime , { round : true})}\`
**CreatedAt :**
\`${client.user.createdAt.toLocaleString()}\`
**Ram :**
\`${(process.memoryUsage().rss / 1048576).toFixed()} MB\`
`)
.setColor(`GREEN`)

let helpmsg = await interaction.editReply({ content : `**Bot Info**`, components: [], embeds: [help] })

setTimeout(async() => {
    let aa = await interaction.fetchReply()
    let faa = aa.content;
    if(faa == `**Please Wait ..**`){
      interaction.editReply({ content : `**Error**`})
    }
} , 2500)

}
}