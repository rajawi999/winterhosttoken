const { MessageActionRow, MessageSelectMenu, MessageEmbed, Message, Util, MessageButton, WebhookClient } = require('discord.js');
const ms = require('ms')
const humanizeDuration = require("humanize-duration");
const { Client } = require('discord.js-selfbot-v13');
const wait = require('node:timers/promises').setTimeout;
const { create, get, url } = require('sourcebin');

const Database = require('st.db');
const { stat } = require('node:fs');
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
const owners = ["828250453393014785"]


module.exports = {
    name: 'token',
    description: `price`,
    cooldown: 5,
    UserPermission: [""],
    async execute(client, interaction) {
        interaction.editReply({ content: `**Please Wait!**` })

        let gettype = interaction.options.getSubcommand()

        if (gettype === `add`) {
            if (!owners.includes(interaction.user.id)) {
                return;
            }

            let token = interaction.options.getString(`token`)
            let status = interaction.options.getString(`status`)

            tokensdb.push(`${status}`, `${token}`)

            interaction.editReply({ content: `> **Ok , Done Add This Token | ${status}**` })
            interaction.channel.send({ content: `${token}` }).then((t) => {
                setTimeout(() => {
                    t.delete()  
                }, 1000);
            })

        }

        if (gettype === `remove`) {
            if (!owners.includes(interaction.user.id)) {
                return;
            }

            let token = interaction.options.getString(`token`)
            let status = interaction.options.getString(`status`)

            tokensdb.unpush(`${status}`, `${token}`)

            interaction.editReply({ content: `> **Ok , Done Remove This Token | ${status}**` })
            interaction.channel.send({ content: `${token}` }).then((t) => {
                setTimeout(() => {
                    t.delete()
                }, 1000);
            })
        }

        if (gettype === `all`) {
            if (!owners.includes(interaction.user.id)) {
                return;
            }
            let tokenoff1 = tokensdb.get(`offline`) || ["null"]
            let tokenon1 = tokensdb.get(`online`) || ["null"]

            let tokenoff = tokenoff1.join(`\n`)
            let tokenon = tokenon1.join(`\n`)

            let urloff = await create({
                title: `Token's Mananger's`,
                description: `All Token's | Offline`,
                files: [{
                    content: `${tokenoff}`,
                    language: `text`,
                }, ],
            })
            let urlon = await create({
                title: `Token's Mananger's`,
                description: `All Token's | Online`,
                files: [{
                    content: `${tokenon}`,
                    language: `text`,
                }, ],
            },)

            interaction.editReply({ content: `> **Offline Token's <${urloff.url}>**
> **Online Token's <${urlon.url}>**` })

        }
        setTimeout(async() => {
            let aa = await interaction.fetchReply()
            let faa = aa.content;
            if (faa == `**Please Wait ..**`) {
                interaction.editReply({ content: `**Error!**` })
            }
        }, 2500)

    }
}