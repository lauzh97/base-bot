# Discord Slash Command Bot Framework

A minimal, dynamic command loading framework for building Discord bots using **Discord.js v14+**.

## Features

-  Dynamic command loading from the `commands/` directory
-  Built-in error handling with ephemeral replies
-  Minimal intent requirements (only `Guilds`)
-  Easy to extend and customize

## Prerequisites

- Node.js 16+ 
- Discord Bot Token (from [Discord Developer Portal](https://discord.com/developers/applications))

## Installation

```bash
npm install discord.js dotenv
```

## Setup

1. **Get your bot token**: Create a Discord application at the [Developer Portal](https://discord.com/developers/applications) and copy the Bot Token.

2. **Configure environment variables**: Create a `.env` file in the project root:
   ```env
   DISCORD_TOKEN=your_bot_token_here
   CLIENT_ID=your_client_id_here
   ```

3. **Add slash commands**: Place your command files in the `commands/` directory. Each file must export an object with `data` and `execute`:
   
   Example (`commands/hello.js`):
   ```js
   const { SlashCommandBuilder } = require('discord.js');

   exports.data = new SlashCommandBuilder()
     .setName('hello')
     .setDescription('Says hello!');

   exports.execute = async (interaction) => {
     await interaction.reply({ content: 'Hello there!', ephemeral: true });
   };
   ```

4. **Register slash commands**: Before starting the bot, deploy your commands to Discord using the `deploy-commands.js` script:
   
   ```bash
   node deploy-commands.js
   ```

5. **Run the bot**:
   ```bash
   node index.js
   ```

## Project Structure

```
├── .env                 # Discord token/Client ID
├── commands/            # Slash command files (.js)
│   ├── hello.js
│   └── ...
└── index.js             # Main entry point
```

## License

MIT