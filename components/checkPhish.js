import clientConfig from "../config/clientConfig.js";
import domainList from "../domainList.js";
const checkPhish = () => {
  clientConfig.on("messageCreate", async (msg) => {
    const domainsList = await domainList();

    domainsList.map((ele) => {
      if (msg.content.includes(ele)) {
        msg.channel.send(`${msg.author} has posted a suspicious link.`);
        msg.delete();
      }
    });
  });
};
export default checkPhish;
