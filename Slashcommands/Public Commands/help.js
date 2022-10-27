const { MessageActionRow, MessageSelectMenu, WebhookClient ,MessageEmbed ,MessageButton} = require('discord.js');
const ms = require('ms')

module.exports = {
	name: 'help',
	description: `Bot Commands`,
	cooldown : 5,
	UserPermission : [""],
	async execute(client , interaction , language) {

    await interaction.editReply({ content : `**Please Wait ..**`})
if(!interaction.guild.me.permissions.has("EMBED_LINKS")) return interaction.editReply({content : `**Missing Permissions**`});

const embed = new MessageEmbed()
.setAuthor({ name : `${interaction.user.username}`, iconURL: `${interaction.user.avatarURL({dynamic : true, size: 512})}`})
.setTitle(`Volcano Voice - Public Commands`)
.setColor(`GREEN`)
.setThumbnail(`${interaction.user.avatarURL({dynamic: true})}`)
.setDescription(`> **Bot Is \`Slash Commands\`, To show help commands, choose options menu**\n > **Time Left** <t:${Math.floor((new Date().getTime() + 300000) / 1000)}:R>`)
.setFooter({ text : `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({dynamic : true, size: 512}) || interaction.user.avatarURL({dynamic : true, size: 512})}`})


let menu = new MessageSelectMenu()
.setCustomId("boost")
.setPlaceholder("Select one please")
.addOptions([
  {
    label: `Public Commands`,
    value: `public`
  },{
    label: `Voice Commands`,
    value: `voice`
  }
])

let row = new MessageActionRow()
.addComponents([menu])

let helpmsg = await interaction.editReply({ embeds: [embed] , content: ` `, components: [row]})
let filter = (user) => user.user.id === interaction.user.id;
let collector = helpmsg.createMessageComponentCollector({filter,componentType:"SELECT_MENU",time:300000})

collector.on("collect", async i => {
  let value = i.values[0]
  if (value == "public") {
    await i.deferReply({ephemeral: true});
    const publicembed = new MessageEmbed()
.setAuthor({ name : `${interaction.user.username}`, iconURL: `${interaction.user.avatarURL({dynamic : true, size: 512})}`})
.setTitle(`Volcano Voice - Public Commands`)
.setColor(`GREEN`)
.setThumbnail(`${interaction.user.avatarURL({dynamic: true})}`)
.setDescription(`
**/help** \`Bot Commands\`
**/bot** \`Bot Info\`
`)
.setFooter({ text : `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({dynamic : true, size: 512}) || interaction.user.avatarURL({dynamic : true, size: 512})}`})
    i.followUp({embeds:[publicembed], ephemeral: true})
  }
  if (value == "voice") {
    await i.deferReply({ephemeral: true});
    const publicembed = new MessageEmbed()
.setAuthor({ name : `${interaction.user.username}`, iconURL: `${interaction.user.avatarURL({dynamic : true, size: 512})}`})
.setTitle(`Volcano Voice - Public Commands`)
.setColor(`GREEN`)
.setThumbnail(`${interaction.user.avatarURL({dynamic: true})}`)
.setDescription(`
**/start** \`Start New Activity\`
**/dashboard** \`Control your own Voice Channel\`
`)
.setFooter({ text : `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({dynamic : true, size: 512}) || interaction.user.avatarURL({dynamic : true, size: 512})}`})
  i.followUp({embeds:[publicembed], ephemeral: true})
}
})

collector.on(`end`, collected => {
    helpmsg.edit({components:[new MessageActionRow(). addComponents([menu.setDisabled(true)])]})
})


setTimeout(async() => {
    let aa = await interaction.fetchReply()
    let faa = aa.content;
    if(faa == `**Please Wait ..**`){
  interaction.editReply({ content : `Error, please contact support`})
    }
} , 2500)

}
}
