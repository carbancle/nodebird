const path = require("path");
const dotenv = require("dotenv");

// 환경 변수를 로드하는 함수
function loadEnv() {
  // NODE_ENV 변수를 기준으로 분기처리
  const envFile = process.env.NODE_ENV === "development" ? ".env.dev" : ".env";

  // 해당 환경에 맞는 .env 파일 로드
  dotenv.config({ path: path.resolve(__dirname, `../${envFile}`) });

  console.log(
    `Loaded ${envFile} file for ${
      process.env.NODE_ENV || "production"
    } environment`
  );
}

module.exports = loadEnv;
