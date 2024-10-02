const loadEnv = require("../utils/loadEnv");

// 환경 변수 로드
loadEnv();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "",
    host: process.env.DB_HOST || "",
    port: process.env.DB_PORT || "3306",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "",
    host: process.env.DB_HOST || "",
    dialect: "mysql",
    port: process.env.DB_PORT || "3306",
  },
};
