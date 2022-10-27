require("dotenv").config()
const { Client, MessageEmbed, Collection , Intents , Permissions , MessageActionRow , MessageButton} = require('discord.js');
const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_BANS,
      Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
      Intents.FLAGS.GUILD_INTEGRATIONS,
      Intents.FLAGS.GUILD_WEBHOOKS,
      Intents.FLAGS.GUILD_INVITES,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_PRESENCES,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_MESSAGE_TYPING,
      Intents.FLAGS.DIRECT_MESSAGES,
      Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
      Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
 restTimeOffset:0, disableMention0s: "everone"
});
const wait = require('node:timers/promises').setTimeout;
const fs = require('fs');
const humanizeDuration = require("humanize-duration");
const colors = require("colors")
const ms = require('ms')
const Database = require('st.db');
const serverdb = new Database({
    path: './data/servers.json',
    databaseInObject: true
})
const tokensdb = new Database({
    path: './data/tokens.json',
    databaseInObject: true
})


client.setMaxListeners(0)
client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
client.UserPermissions = new Collection();
const voiceCollection = new Collection()

let tokensoff = tokensdb.get(`offline`)
let tokenson = tokensdb.get(`online`)

tokensoff.forEach(tokenn => {
    const { Client } = require('discord.js-selfbot-v13');

    const newclient = new Client({
            checkUpdate: false
    })

    newclient.login(tokenn).then(() => {
        console.log(`${newclient.user.username} | Is Ready`)
        newclient.user.setPresence({ status: `invisible` })
    }).catch(() => {
        console.log(`${tokenn} | I'can start`)
    })
});

tokenson.forEach(tokenn => {
    const { Client } = require('discord.js-selfbot-v13');

    const newclient = new Client({
            checkUpdate: false
    })

    let statusall = [
        "dnd",
        "idle",
        "online"
    ]

    let statustextall = [
        "وَاتَّقُوا يَوْمًا تُرْجَعُونَ فِيهِ إِلَى اللَّهِ ۖ",
        ". عملتها قبلك",
        "Sapnu puas.",
        "None",
        "حِــنــا عَبـيّـد الــّــرب سِـيـْد المَــخّـالـيـقْ",
        "{وَلا تَحسَبَنَّ اللَّـهَ غافِلًا عَمّا يَعمَلُ الظّالِمونَ إِنَّما يُؤَخِّرُهُم لِيَومٍ تَشخَصُ فيهِ الأَبصارُ}",
        "اُلِصبُرَ لُناِ ، والِحضُ دُاَيماِ لغُيرنـاُِ",
        "خلّه يعيش بغفوته لين يعرف من فقد",
        "﴿يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا اللهَ ذِكْرًا كَثِيرًا"
    ]

    let statuss = statusall[Math.floor(Math.random() * statusall.length)]    
    let statustexts = statustextall[Math.floor(Math.random() * statustextall.length)]    

    newclient.login(tokenn).then(() => {
        console.log(`${newclient.user.username} | Is Ready`)
        newclient.user.setPresence({ status: `${statuss}`, activities: [
            {
                name: `${statustexts}`
            }
        ] })
    }).catch(() => {
        console.log(`${tokenn} | I'can start`)
    })
});

fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Event loaded : ${eventName} `);
        client.on(eventName, event.bind(null, client));

    });
    console.log(`---------------------------------------`.bold.yellow)
});

fs.readdir("./Slashcommands/", (err, files) => {
    if(err) throw err;
    files.forEach((dir) => {
        fs.readdir(`./Slashcommands/${dir}/`, (err, cmd) => {
            if(err) throw err;
            cmd.forEach(file => {
                if (!file.endsWith(".js")) return;
                let cmd2 = require(`./Slashcommands/${dir}/${file}`);
                let commandName = file.split(".")[0];
                client.commands.set(cmd2.name, cmd2);
                console.log(`(/) Command loaded: ${commandName}`.green);
            });
        });
    });
});
console.log(`---------------------------------------`.yellow)
console.log(`Start Loading Events`.yellow)

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    if (!client.commands.has(interaction.commandName)) return;
    await interaction.deferReply()

        let command = client.commands.get(interaction.commandName);
                if (!command) command = client.commands.get(client.aliases.get(interaction.commandName));
        
                if (!client.cooldowns.has(command.name)) {
                    client.cooldowns.set(command.name, new Collection());
                }
                const now = Date.now();
                const timestamps = client.cooldowns.get(command.name);
        
            
         if (!client.UserPermissions.has(command.name)) {
                    client.UserPermissions.set(command.name, new Collection());
                }
              const  UserPermission = command.UserPermission.toString();
              await client.commands.get(interaction.commandName).execute(client , interaction );
});

process.on('unhandledRejection', error => {
    console.log(error);
});
client.on('messageCreate', message => {
    if(message.content.startsWith(`senddashboard 81 56 87`)) {
        let button = new MessageButton()
        .setCustomId(`ticket`)
        .setEmoji(`🎟️`)
        .setLabel(`Create Ticket`)
        .setStyle(`SECONDARY`)

        let row = new MessageActionRow()
        .addComponents(button)

        let embed = new MessageEmbed()
        .setTitle(`> **Create Ticket**`)
        .setFields(
            {
                name: `> **PayPal**`,
                value: `**1000 Offline Members --> 1.99 $
1000 Online Members --> 5.99 $**`,
                inline: false
            },{
                name: `> **Al Rajhi Bank**`,
                value: `**1000 Offline Members --> 7.99 S.R
1000 Online Members --> 17.99 S.R**`,
                inline: false
            },{
                name: `> **Probot Credits** --> Create Ticket`,
                value: `**100 Offline Members --> 50k Credits
100 Online Members --> 100k Credits**`,
                inline: false
            }
        )
        .setDescription(`**To Create Ticket Click \`Create Ticket\`**`)
        .setImage(`https://media.discordapp.net/attachments/1018896176969416784/1018900914960093254/OUR_SERVICE.png`)
        .setColor(`GREEN`)

        message.delete()
        message.channel.send({ content: ` `,embeds: [embed], components: [row] })
    }
})

client.on('interactionCreate', async i => {
	if (i.customId === 'ticket') {
        
    await i.reply({content:`**Creating Ticket, Please wait...**` , ephemeral : true})
    
if(!i.guild.me.permissions.has("MANAGE_CHANNELS")) return i.editReply({content : `**[BOT] Missing Permissions**`});

let channelsCount = []; 
let category = client.guilds.cache.get(`${i.guild.id}`).channels.cache.find(category => category.id == `1035098627636461579`);
if(!category) return;
client.guilds.cache.get(`${i.guild.id}`).channels.cache.forEach(channel => {
  if (channel.parentId == category.id) return channelsCount.push(channel.id);
});
if(channelsCount.length == 50) {
    i.editReply({ content: `**Maximum number of channels in category reached (50)**`})
    return;
}
    if(ticketdb.get(`${i.user.id}_${i.guild.id}`) == true) return i.editReply({ content: `> **You have a ticket, you can't open another ticket**`});
i.guild.channels.create(`ticket-${i.user.username}`  , {
  permissionOverwrites : [
    {
      id : i.guild.roles.everyone,
      deny : ['VIEW_CHANNEL']
    },
    {
      id : i.user.id,
      allow : ['VIEW_CHANNEL' , 'SEND_MESSAGES' , 'READ_MESSAGE_HISTORY' , 'ATTACH_FILES'],
    },
    {
      id : `1018903874255458454`,
      allow : ['VIEW_CHANNEL' , 'SEND_MESSAGES' , 'READ_MESSAGE_HISTORY' , 'ATTACH_FILES'],
    }
   ], parent: `1018896136238542939`
}).then(async ch => {
  i.editReply({ content: `**Done Create Ticket ${ch}**`,ephemeral : true })
  let close = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setCustomId(`close`)
    .setLabel(`Close Ticket`)
    .setEmoji(`🔒`)
    .setStyle(`SECONDARY`),
  )

   let closeembed = new MessageEmbed()
   .setTitle(`> **Ticket**`)
   .setDescription(`**- ساسية الاسترجاع**
النقود والأعضاء السيرفرات المباعة لا ترد ولا تستبدل إلا في بعض الحالات :
1️⃣ إذا تعذر ادخال الاعضاء للسيرفر
2️⃣ إذا حدثت للتوكنات أي ضرر اثناء فترة الضمان تقوم بأستبدالها واذا تعذر استبدالها يتم إرجاع المبلغ

**- سياسة الاستخدام**
1️⃣ الأعضاء لزيادة عدد الاعضاء فقط وليس للمشاركة في المسابقات وغيرها
2️⃣ نحن غير مسؤولين عن التعامل خارج التذاكر
3️⃣ البوت لا يحتاج اي صلاحيات عدا 'Create Invite' ويتم طرد البوت بعد الانتهاء

**- الخطوة الاولى هي اضافة البوت الى السيرفر للتأكد من عدد التوكنات الممكن اضافتها**
https://discord.com/api/oauth2/authorize?client_id=1018119496252272670&permissions=129&scope=bot`)
   .setColor(`#232b52`)
   .setImage(`https://media.discordapp.net/attachments/1018896176969416784/1018900341477093486/BUY.png`)
   .setThumbnail(`${i.user.displayAvatarURL({ dynamic : true , size: 512})}`)
   .setFooter({ text : `Tokens Manager's`,iconURL : `${i.user.displayAvatarURL({ dynamic : true , size: 512})}`}) 

    ch.send({content : `${i.user} Welcome - <@&1018903874255458454>`  ,embeds : [closeembed], components : [close]})
    ticketdb.set(`ticket_${ch.id}`, {
      id: `${ch.id}`,
      owner: `${i.user.id}`,
      invite : null
    })
    let statusg = `false`
    client.on('guildCreate', async g => {

        const fetchedLogs = await g.fetchAuditLogs({
            limit: 1,
            type: 'BOT_ADD',
        });
        const log = fetchedLogs.entries.first();

        if(log.executor.id !== i.user.id) {
            return;
        }
        if(log.executor.id == i.user.id) {
            if(statusg == `true`) {
                return;
            }
            statusg = `true`

            ch.send({ content: `> **${g.name}**
**- الخطوة الثانية**
**قم بكتابة**
\`/price offline\` \`/price online\`
**وقم بي التحويل بعدها ويرجى انتظار اضافة التوكنات الى خادمك**` })

            let ch1 = []
            g.channels.cache.forEach((c) => {
                console.log(c.type)

                if(c.type !== "GUILD_TEXT") {
                    return;
                }
                if(c.type == "GUILD_TEXT") {
                    ch1.push(c.id)
                }
            })

            console.log(g.channels.cache.get(ch1[0]))
            let inv = await g.channels.cache.get(ch1[0]).createInvite({
                maxAge: 0,
                maxUses: 0, 
            })

            let ticdata = ticketdb.get(`ticket_${ch.id}`) 
            ticdata.invite = inv.code
            ticketdb.set(`ticket_${ch.id}`,ticdata)
            return;
        }
    })
   ticketdb.set(`${i.user.id}_${i.guild.id}`,true)
   let log = i.guild.channels.cache.get(`1018896202642763886`)
     let e = new MessageEmbed()
     .setAuthor({ name: `Create Ticket!`, iconURL: `${i.guild.iconURL({ dynamic : true , size: 512})}`})
     .setColor(`#232b52`)
     .setFields(
        { name: `Action By`, value: `${i.user}` },
        { name: `Action Time`, value: `<t:${parseInt(Date.now() / 1000)}:R>` },
        { name: `Ticket`, value: `${ch}` },
     )
     .setThumbnail(`${i.guild.iconURL({ dynamic : true , size: 512})}`)
     .setFooter({ text : `Tokens Manager's`,iconURL : `${i.guild.iconURL({ dynamic : true , size: 512})}`}) 
     if (log) {  
     log.send({embeds:[e]})
     }
})
  }
})

client.on('interactionCreate', async i => {
    if (i.customId === 'close') {
        if(!i.guild.me.permissions.has("MANAGE_CHANNELS")) return i.reply({content : `**[BOT] Missing Permissions**`});
        let ticketclosebut = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId(`yes`)
            .setLabel(`Confirm`)
            .setStyle(`SUCCESS`),
            new MessageButton()
            .setCustomId(`no`)
            .setLabel(`Cancel`)
            .setStyle(`DANGER`)
        )

        i.reply({ content : `**Are you sure to close?**` , components: [ticketclosebut]})
    }
})

client.on(`interactionCreate` , async interaction => {
if(interaction.customId == `yes`){
    if(!interaction.guild.me.permissions.has("MANAGE_CHANNELS")) return interaction.channel.send({content : `**[BOT] Missing Permissions**`});
    let log = interaction.guild.channels.cache.get(`1018896202642763886`)
    let ticket = await ticketdb.get(`ticket_${interaction.channel.id}`)
    interaction.deferUpdate()
      
    let embed = new MessageEmbed()
    .setColor("RED")
    .setDescription("**Ticket will be deleted in a few seconds**")
      interaction.channel.send({ embeds : [embed]})
      let member = client.users.cache.get(ticket.owner)
      let file = await createTranscript(interaction.channel)
      let em = new MessageEmbed()
      .setColor("RED")
      .setTitle("Ticket Close")
      .setAuthor({ name : `${interaction.guild.name}` , iconURL : `${interaction.guild.iconURL({dynamic:true})}`})
      .setThumbnail(interaction.guild.iconURL({dynamic:true}))
      .setFooter({text : `${interaction.guild.name}` , iconURL : `${interaction.guild.iconURL({dynamic:true})}`})      
      .addFields(
        { name:"**Ticket**", value:`${interaction.channel.name}` },
        { name:`**Ticket Owner**`, value:`${member}` },
        { name:`**Action by**`, value:`${interaction.user}`}
      )
       await log.send({embeds:[em] ,files : [file]})
      setTimeout(async() => {
        interaction.message.delete()
        await ticketdb.delete(`${tikcet.owner}_${interaction.guild.id}`)
        await ticketdb.delete(`ticket_${interaction.channel.id}`)
        await interaction.channel.delete()
       },4000)
}
})

client.on(`interactionCreate` , async interaction => {  
if(interaction.customId == `no`){
    interaction.deferUpdate()
    interaction.message.delete()
}
})

/*client.on('guildCreate',async (guild) =>{
  if (["1018116279120445470"].includes (guild.id)) return;
  else guild.leave();
})
client.on(`ready`, async () => {
client.guilds.cache.forEach(guild => {
if (["1018116279120445470"].includes(guild.id)) return;
else guild.leave();
});
});*/

client.login(process.env.token);