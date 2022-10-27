require('dotenv').config()
const { connect } = require('mongoose');
const { Client } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Database } = require("quickmongo")
const fs = require('fs');
//const setup = new Database(process.env.setup)

/**
 * 
 * @param {Client} client 
 */
module.exports = async(client) => {
    console.log(`Ready | ${client.user.tag}`.green);
    setInterval(() => {
        client.user.setPresence({
            status: `online`,
            activities: [{
                name: `Token's Manger's`,
                type: `COMPETING`
            }],
        })
    }, 5000);
    fs.readdir("./Slashcommands/", (err, files) => {
        if (err) throw err;
        files.forEach((dir) => {
            fs.readdir(`./Slashcommands/${dir}/`, (err, cmd) => {
                if (err) throw err;
                cmd.forEach(file => {
                    if (!file.endsWith(".js")) return;
                    let cmd2 = require(`../Slashcommands/${dir}/${file}`);
                    let commandName = file.split(".")[0];
                    client.commands.set(cmd2.name, cmd2);
                    console.log(`(/) Command Stars: ${commandName}`.green);
                });
            });
        });


    });

    const commands = [
        /*{
            name: `boost`,
            description: `Boost calculator`,
            cooldown: 10,
            options: [
                {
                    name: `year`,
                    description: `Please write the year`,
                    type: 10,
                    required: true
                },{
                    name: `month`,
                    description: `Please write the month`,
                    type: 10,
                    required: true
                },{
                    name: `day`,
                    description: `Please write the day`,
                    type: 10,
                    required: true
                }
            ]
        },{
            name: `help`,
            description: `Bot Commands`
        },{
            name: `bot`,
            description: `Bot Info`
        },{
            name: `settings`,
            description: `settings`,
            options: [
                {
                    name: `thanks`,
                    description: `Set Message Boost Thanks`,
                    type:1,
                    options: [
                        {
                            name: `message`,
                            description: `The Message`,
                            type: 3,
                            required: true
                        }
                    ]
                }
            ]
        }*/
        {
            name: `price`,
            description: `price`,
            options: [{
                name: `online`,
                description: `Price Online Member's`,
                type: 1,
                options: [{
                    name: `count`,
                    description: `Count?`,
                    type: 10,
                    required: true
                }]
            }, {
                name: `offline`,
                description: `Price Offline Member's`,
                type: 1,
                options: [{
                    name: `count`,
                    description: `Count?`,
                    type: 10,
                    required: true
                }]
            }]
        }, {
            name: `token`,
            description: `token`,
            options: [{
                name: `all`,
                description: `Get all tokens`,
                type: 1,
            }, {
                name: `add`,
                description: `Add New Token`,
                type: 1,
                options: [{
                    name: `token`,
                    description: `Token?`,
                    type: 3,
                    required: true
                }, {
                    name: `status`,
                    description: `Status | online , offline`,
                    type: 3,
                    required: true,
                    choices: [{
                        name: `online`,
                        value: `online`,
                    }, {
                        name: `offline`,
                        value: `offline`
                    }]
                }]
            }, {
                name: `remove`,
                description: `Remove Token`,
                type: 1,
                options: [{
                    name: `token`,
                    description: `Token?`,
                    type: 3,
                    required: true
                }, {
                    name: `status`,
                    description: `Status | online , offline`,
                    type: 3,
                    required: true,
                    choices: [{
                        name: `online`,
                        value: `online`,
                    }, {
                        name: `offline`,
                        value: `offline`
                    }]
                }]
            }]
        }, {
            name: `stock`,
            description: `Stock Of Tokens`
        }
    ]

    const rest = new REST({ version: '9' }).setToken(process.env.token);

    (async() => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id), { body: commands },
            );

        } catch (error) {
            console.error(error);
        }
    })();
}