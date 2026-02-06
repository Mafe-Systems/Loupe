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
  - Basic CSS

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

   ⚠️ **Security Note**: Never commit `config.json` to version control as it contains sensitive data. The file is already in `.gitignore`.

4. **Set up environment variables (for dashboard):**

   Copy `.env.example` to `.env` and set a strong password:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set `DASHBOARD_PASSWORD` to a strong password.

5. **Run the bot:**

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

   The dashboard will be available on your local machine at `http://127.0.0.1:3000`. 
   
   🔒 **Authentication**: The dashboard is protected by HTTP Basic Authentication. When prompted, enter:
   - Username: (any username)
   - Password: The value you set in `DASHBOARD_PASSWORD` environment variable

   You can use the dashboard to update the bot configuration like the admin user ID and prefix.
   
   ⚠️ **Security Note**: For security reasons, the bot token cannot be viewed or modified through the web dashboard. Update it directly in `config/config.json`.

---

## Security Best Practices

This bot implements several security measures to protect your Discord server and bot:

### 🔒 Implemented Security Features:

1. **Dashboard Authentication**: HTTP Basic Authentication protects the web dashboard from unauthorized access
2. **No Token Exposure**: The Discord bot token is never displayed or transmitted through the web interface
3. **Input Validation**: All configuration inputs are validated to prevent injection attacks
4. **Permission Checks**: Commands verify user permissions and prevent privilege escalation
5. **Localhost Binding**: Dashboard server binds to 127.0.0.1 by default for local access only
6. **Security Headers**: X-Frame-Options, X-Content-Type-Options, and other security headers are set
7. **Safe File Operations**: Absolute paths are used to prevent path traversal attacks

### 🛡️ Security Recommendations:

- **Keep your bot token secret**: Never share it or commit it to version control
- **Use a strong dashboard password**: Set a complex password in the `DASHBOARD_PASSWORD` environment variable
- **Run dashboard locally**: Only expose the dashboard when needed, and use SSH tunneling for remote access
- **Regular updates**: Keep dependencies updated to patch security vulnerabilities
- **Monitor bot activity**: Review logs regularly for suspicious activity
- **Limit admin access**: Only give admin permissions to trusted users

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
