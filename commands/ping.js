import { SlashCommandBuilder } from 'discord.js';

export default {
    // 1. Define the slash command configuration
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
        
    // 2. Define the execution logic
    async execute(interaction) {
        // Slash commands use interaction.reply instead of message.channel.send
        await interaction.reply('Pong!');
    }
};
