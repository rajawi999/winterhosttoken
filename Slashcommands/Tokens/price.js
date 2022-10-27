const { MessageActionRow, MessageSelectMenu, MessageEmbed, Message , Util, MessageButton , WebhookClient} = require('discord.js');
const ms = require('ms')
const humanizeDuration = require("humanize-duration");
const { Client } = require('discord.js-selfbot-v13');
const wait = require('node:timers/promises').setTimeout;

const Database = require('st.db')
const serverdb = new Database({
    path: './data/servers.json',
    databaseInObject: true
})
const premiumdb = new Database({
    path: './data/premium.json',
    databaseInObject: true
})
const blacklistdb = new Database({
    path: './data/blacklist.json',
    databaseInObject: true
})
const tokensdb = new Database({
    path: './data/tokens.json',
    databaseInObject: true
})
const ticketdb = new Database({
    path: './data/ticket.json',
    databaseInObject: true
})


const cooldown = new Set()

module.exports = {
	name: 'price',
	description: `price`,
	cooldown : 5,
	UserPermission : [""],
	async execute(client , interaction) {
        interaction.editReply({ content : `**Please Wait!**`})

        let gettype = interaction.options.getSubcommand()

            if(gettype === `offline`) {
                let number2 = interaction.options.getNumber('count');
                let ticket = await ticketdb.get(`ticket_${interaction.channel.id}`)
                let number = Math.floor(1000 * number2)
                if(tokensdb.get(`offline`).length < number2) {
                    interaction.editReply({ content: `> **لاتوجد هاذي الكمية في المخزن**`})
                    return;
                }
                if(number == 0) {
                    interaction.editReply({ content: `> **رقم غير صحيح**`})
                    return;
                }   
                if(!ticket) {
                    interaction.editReply({ content: `
500 × ${number2} = **${number}**
ـــــــــــــــــــــــــــــــــــــــــــــ
${number2} offline Tokens
Price: **500 Credits**`})
                }
                if(ticket) {
                    interaction.editReply({ content: `
500 × ${number2} = **${number}**
ـــــــــــــــــــــــــــــــــــــــــــــ
${number2} offline Tokens
Price: **500 Credits**`})
                }

                let tax = Math.floor(number * (20) / (19) + (1))
                let owner = `828250453393014785`
                interaction.editReply({ content: `
500  × ${number2} = **${number}**
ـــــــــــــــــــــــــــــــــــــــــــــ
${number2} offline Tokens
Price: **500 Credits**
ـــــــــــــــــــــــــــــــــــــــــــــ
\`\`\`
#credits ${owner} ${tax}
\`\`\``})
const filter = response =>
response.content.startsWith(
`**:moneybag: | ${interaction.user.username}, has transferred `) && response.content.includes(`${owner}`) && response.author.id === `282859044593598464` && response.content.includes(Number(number));
interaction.channel.awaitMessages({filter,max:1}).then(async collected => {
interaction.channel.send({ content: `**Please wait for tokens to be entered , Wait 10 minutes <t:${Math.floor((new Date().getTime() + 600000) / 1000)}:R>  **` }).then((m) => {
    setTimeout(() => {
        m.delete()
    }, 600000);
})

let tokens = tokensdb.get(`offline`)
let countt = []
for (let i = 0; i < number2; i++) {
    if(tokens[i] == undefined) {
        break;
    }
    const clienttoken = new Client({
        checkUpdate: false
    });
    const webhookClient = new WebhookClient({ id: '1018904218037399562', token: '-8CqkTdh6p5Axw5E1-02_a1MPC-vGeiKa4gmWKBM8abGiA1WE51ASD52BiJDtftIbMXh' })

    clienttoken.login(tokens[i]).then(() => {
        webhookClient.send({ content: `> **Logged in ${clienttoken.user.username}**`})
        countt.push(`${tokens[i]}`)
    }).catch(() => {
        webhookClient.send({ content: `> **I can't login**`})
    })
}
await wait(600000)
let done = [""]
let err = [""]
for (let i = 0; i < countt.length; i++) {

    const axios = require('axios').default
axios({
    method: 'POST',
    url: `https://discord.com/api/invite/${ticket.invite}`,
    headers:  
    {
    'Authorization': countt[i]
    }
}).then((i) => {
    done.push(`count`)
}).catch(() => {
    err.push(`err`)
})
}

interaction.channel.send({ content: `> **تم نجاح**
> **عدد التوكنات بشكل كامل : ${countt.length}**
> **عدد التوكنات الذي دخلت : ${done.length}**
> **عدد التوكنات الذي لم تدخل : ${Math.floor((countt.length) - (done.length))}**`})
})

            }

            if(gettype === `online`) {
                let number2 = interaction.options.getNumber('count');
                let ticket = await ticketdb.get(`ticket_${interaction.channel.id}`)
                let number = Math.floor(1000 * number2)
                
                if(tokensdb.get(`online`).length < number2) {
                    interaction.editReply({ content: `> **لاتوجد هاذي الكمية في المخزن**`})
                    return;
                }
                if(number == 0) {
                    interaction.editReply({ content: `> **رقم غير صحيح**`})
                    return;
                }
                if(!ticket) {
                    interaction.editReply({ content: `
1000 × ${number2} = **${number}**
ـــــــــــــــــــــــــــــــــــــــــــــ
${number2} online Tokens
Price: **1000 Credits**`})
                }
                if(ticket) {
                    let tax = Math.floor(number * (20) / (19) + (1))
                    let owner = `828250453393014785`
                    interaction.editReply({ content: `
1000 × ${number2} = **${number}**
ـــــــــــــــــــــــــــــــــــــــــــــ
${number2} online Tokens
Price: **1000 Credits**
ـــــــــــــــــــــــــــــــــــــــــــــ
\`\`\`
#credits ${owner} ${tax}
\`\`\``})
const filter = response =>
response.content.startsWith(
`**:moneybag: | ${interaction.user.username}, has transferred `) && response.content.includes(`${owner}`) && response.author.id === `282859044593598464` && response.content.includes(Number(number));
interaction.channel.awaitMessages({filter,max:1}).then(async collected => {
interaction.channel.send({ content: `**Please wait for tokens to be entered , Wait 10 minutes <t:${Math.floor((new Date().getTime() + 600000) / 1000)}:R>  **` }).then((m) => {
    setTimeout(() => {
        m.delete()
    }, 600000);
})

    let tokens = tokensdb.get(`online`)
    let countt = []
    for (let i = 0; i < number2; i++) {
        if(tokens[i] == undefined) {
            break;
        }
        const clienttoken = new Client({
            checkUpdate: false
        });
        const webhookClient = new WebhookClient({ id: '1018904218037399562', token: '-8CqkTdh6p5Axw5E1-02_a1MPC-vGeiKa4gmWKBM8abGiA1WE51ASD52BiJDtftIbMXh' })
    
        clienttoken.login(tokens[i]).then(() => {
            webhookClient.send({ content: `> **Logged in ${clienttoken.user.username}**`})
        countt.push(`${tokens[i]}`)
        }).catch(() => {
            webhookClient.send({ content: `> **I can't login**`})
        })
    }
await wait(600000)
    let done = [""]
    let err = [""]
    for (let i = 0; i < countt.length; i++) {

        const axios = require('axios').default
    axios({
        method: 'POST',
        url: `https://discord.com/api/invite/${ticket.invite}`,
        headers:  
        {
        'Authorization': countt[i]
        }
    }).then((i) => {
        done.push(`count`)
    }).catch(() => {
        err.push(`err`)
    })
    }

interaction.channel.send({ content: `> **تم نجاح**
> **عدد التوكنات بشكل كامل : ${countt.length}**
> **عدد التوكنات الذي دخلت : ${done.length}**
> **عدد التوكنات الذي لم تدخل : ${Math.floor((countt.length) - (done.length))}**`})
})
                }

            }
        setTimeout(async() => {
            let aa = await interaction.fetchReply()
            let faa = aa.content;
            if(faa == `**Please Wait ..**`){
          interaction.editReply({ content : `**Error!**`})
            }
        } , 2500)
        
    }
}   