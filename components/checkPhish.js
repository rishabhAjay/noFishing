import clientConfig from "../config/clientConfig.js";
import unshort from "url-unshort";
let uu = unshort();
import domainList from "../domainList.js";
const checkPhish = () => {
  clientConfig.on("messageCreate", async (msg) => {
    const domainsList = await domainList();
    let result = msg.content.match(
      /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g
    );
    if (result) {
      result.map(async (ele) => {
        try {
          let urls = await uu.expand(ele);
          urls = urls ? new URL(urls).hostname.replace("www.", "") : "nothing";
          ele = new URL(ele).hostname.replace("www.", "");
          domainsList.map(async (ele2) => {
            if (
              urls === ele2 ||
              ele === ele2
              // msg.content.includes(ele2)
            ) {
              try {
                if (msg) {
                  await msg.delete();
                }
                return await msg.channel.send(
                  `${msg.author} has posted a suspicious link.`
                );
              } catch (error) {
                const guild = await clientConfig.guilds.fetch(msg.guildId);
                const owner = guild.members.cache
                  .filter((user) => user.id === guild.ownerId)
                  .first();
                if (error.message !== "Unknown Message") {
                  try {
                    await owner.user.send(
                      "The bot does not have permissions. Give it the Administrator permission"
                    );
                  } catch (error) {
                    clientConfig.user.setActivity(";/help");
                  }
                }
              }
            }
          });
        } catch (error) {
          console.log(error);
        }
      });
    }
  });
};
export default checkPhish;
