import clientConfig from "../config/clientConfig.js";

const help = () => {
  clientConfig.on("messageCreate", async (msg) => {
    if (msg.author.bot) return false;
    if (
      msg.content.includes("@here") ||
      msg.content.includes("@everyone") ||
      msg.type == "REPLY"
    ) {
      return false;
    }
    if (
      msg.mentions.has(clientConfig.user.id) ||
      msg.content.startsWith(";/help")
    ) {
      try {
        await msg.channel.send({
          embeds: [
            {
              description: "**__Just add the bot and watch it in action.__**",
              title:
                "No Fishing is a bot that deletes phishing links. You have to provide Administrator privilages to it for the bot to work.",
              fields: [
                {
                  value: "Generates an invite link to the support server.",
                  name: "```;/invite```",
                },
                {
                  value:
                    "https://discord.com/api/oauth2/authorize?client_id=936654551245795339&permissions=76800&scope=bot",
                  name: "**Invite this Bot**",
                },
              ],
            },
          ],
        });
      } catch (error) {
        try {
          await msg.author.send(
            "The bot does not have permissions. Give it the Administrator permission"
          );
        } catch (error) {
          clientConfig.user.setActivity(";/help");
        }
      }
      //embed text for help
    }
  });
};

export default help;
