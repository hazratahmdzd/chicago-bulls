const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "tyke.db.elephantsql.com",
  username: "vrlmcelt",
  password: "w9fB3lv5IBG4nvSo3Hk7o8wT-LkCnzwK",
});
sequelize
  .authenticate()
  .then(function () {
    console.log("Connected to DB successfully");
  })
  .catch(function (err) {
    console.log("Failed to connect:" + err.message);
  });


  
module.exports = sequelize;
