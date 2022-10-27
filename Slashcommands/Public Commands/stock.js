const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton } = require('discord.js');
const ms = require('ms')
const Database = require('st.db')
const tokensdb = new Database({
    path: './data/tokens.json',
    databaseInObject: true
})

module.exports = {
	name: 'stock',
	description: `Bot Info`,
	cooldown : 5,
	UserPermission : [""],
	async execute(client , interaction ) {

await interaction.editReply({ content : `**Please Wait ..**`})
if(!interaction.guild.me.permissions.has("EMBED_LINKS")) return interaction.editReply({content : `**Missing Permissions**`});


let online = tokensdb.get(`online`)
let offline = tokensdb.get(`offline`)
let help = new MessageEmbed()
.setAuthor({ name: `Token's Stock`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 1024 })}`})
.setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true, size: 1024 })}`)
.setDescription(`
> **Online Token's**
\`${online.length}\`

> **Offline Token's**
\`${offline.length}\`
`)
.setColor(`GREEN`)

let helpmsg = await interaction.editReply({ content : `**Stock of token**`, components: [], embeds: [help] })

setTimeout(async() => {
    let aa = await interaction.fetchReply()
    let faa = aa.content;
    if(faa == `**Please Wait ..**`){
      interaction.editReply({ content : `**Error**`})
    }
} , 2500)

}
}