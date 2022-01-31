import clientConfig from "../config/clientConfig.js";
import domainList from "../domainList.js";
const checkPhish = () => {
  clientConfig.on("messageCreate", async (msg) => {
    const domainsList = await domainList();

    domainsList.map(async (ele) => {
      if (msg.content.includes(ele)) {
        try {
          await msg.channel.send(`${msg.author} has posted a suspicious link.`);
          if (msg) {
            await msg.delete();
          }
        } catch (error) {
          if (error.message !== "Unknown Message") {
            try {
              await msg.author.send(
                "The bot does not have permissions. Give it the Administrator permission"
              );
            } catch (error) {
              clientConfig.user.setActivity("=/help");
            }
          }
        }
      }
    });
  });
};
export default checkPhish;
