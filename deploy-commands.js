import { REST, Routes } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder JSON data from each command file
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const { default: command } = await import(`file://${filePath}`);
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    }
}

// Prepare the REST module
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// Deploy your commands globally to Discord
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // This registers the commands globally across all guilds your bot is in
        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();
