# Loupe - Discord Bot for Moderation and Web Dashboard

## Overview

**Loupe** is a Discord bot designed for server moderation with commands such as `kick`, `ban`, and an admin role management system. It also includes a web dashboard where you can configure the bot’s settings, including setting an admin role by Discord user ID.

**Status:**  
The bot is currently in development. The core features like moderation commands and web dashboard for setting the admin role are implemented. More features are planned for the future.

---

## Features

### ✅ Implemented Features:

- **Moderation Commands**:
  - `!kick <user>`: Kicks a user from the server (admin-only).
  - `!ban <user>`: Bans a user from the server (admin-only).
  - **Admin Role**: The bot checks for admin permissions using the user’s **Discord ID**. Only users with the correct ID can execute the moderation commands.
  
- **Web Dashboard**:
  - A web interface for configuring bot settings such as:
    - **Bot Token**
    - **Prefix**
    - **Admin ID**: Set the admin user ID via the dashboard.
    - **Owner ID**

### 🚧 Planned Features (Coming Soon):

- **Mute Command**: A command to mute a user in a voice or text channel.
- **Clear Command**: A command to delete multiple messages in a text channel.
- **Logging System**: A feature to log bot actions such as bans, kicks, and mutes to a text channel.
- **Additional Admin Controls**: More advanced control features for administrators via the web dashboard.
- **Role Management**: Functionality to manage user roles directly through bot commands.
- **Help Command**: A command that lists all available bot commands and their descriptions.

---

## Installation

### Prerequisites

Make sure you have the following installed:

- **Node.js**: [Install Node.js](https://nodejs.org/)
- **Git**: [Install Git](https://git-scm.com/downloads)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Mafe-Systems/Loupe.git
   cd loupe
   ```

2. **Install the dependencies:**

   Run the following command to install the required dependencies for the bot:

   ```bash
   npm install
   ```

3. **Create a `config.json` file:**

   In the `config` folder, create a `config.json` file with the following structure:

   ```json
   {
     "token": "YOUR_DISCORD_TOKEN",
     "prefix": "!",
     "adminID": "YOUR_ADMIN_USER_ID",
     "ownerID": "YOUR_OWNER_ID"
   }
   ```

   Replace `YOUR_DISCORD_TOKEN`, `YOUR_ADMIN_USER_ID`, and `YOUR_OWNER_ID` with actual values.  
   The **Admin User ID** is the Discord ID of the user who is allowed to run moderation commands (kick, ban).

4. **Run the bot:**

   To start the bot, run the following command:

   ```bash
   node index.js
   ```

   The bot should now be running and will appear online in your Discord server.

---

## Web Dashboard

1. **Start the dashboard server:**

   If you want to run the web dashboard (which allows you to configure bot settings), use the following command:

   ```bash
   node dashboard/server.js
   ```

2. **Access the dashboard:**

   The dashboard will be available on your local machine at `http://localhost:3000`. You can use it to update the bot configuration like the admin user ID and prefix.

---

## Usage

Once the bot is running, you can use the following commands in your Discord server:

- **`!kick <user>`**: Kicks a mentioned user from the server (admin only).
- **`!ban <user>`**: Bans a mentioned user from the server (admin only).
  
For any command, the bot checks if the user executing the command has the correct admin permissions based on the **Admin Discord ID** set in the config.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Make sure to follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push the branch (`git push origin feature/your-feature`).
5. Create a new pull request.

---

## Disclaimer

This bot is still in development. The features listed are either partially implemented or planned for future releases. Contributions are welcome!
