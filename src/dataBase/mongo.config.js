const { connect } = require("mongoose");
// const { DB_HOST, DB_PORT, DB_CNN, DB_NAME } = require("../config/config");

const DB_HOST = "localhost";
const DB_PORT = 27027;
const DB_NAME = "ecommerce-DB";
let DB_CNN;

const configConnection = {
  url: `mongodb://localhost:27017/${DB_NAME}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

const mongoDBconnection = async () => {
  try {
    await connect(configConnection.url, configConnection.options);
    console.log(`=================================`);
    console.log(
      `======= URL: ${configConnection.url.substring(0, 20)} =======`
    );
    console.log(`=================================`);
  } catch (error) {
    console.log(
      "🚀 ~ file: mongo.config.js:23 ~ mongoDBconnection ~ error:",
      error.message
    );
    // throw new Error(error);
  }
};

module.exports = {
  configConnection,
  mongoDBconnection,
};