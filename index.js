import dotenv from "dotenv";
import checkPhish from "./components/checkPhish.js";
import createInvite from "./components/createInvite.js";
import help from "./components/help.js";
dotenv.config(); //initialize dotenv

import clientConfig from "./config/clientConfig.js";
checkPhish();
createInvite();
help();
clientConfig.on("ready", () => {
  console.log(`Logged in as ${clientConfig.user.tag}!`);
  clientConfig.user.setActivity(";/help");
});

//make sure this line is the last line
clientConfig.login(process.env.CLIENT_TOKEN); //login bot using token
