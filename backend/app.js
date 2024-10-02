const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookie = require("cookie-parser");
const morgan = require("morgan");
const db = require("./models");
const helmet = require("helmet");
const hpp = require("hpp");

const loadEnv = require("./utils/loadEnv");

// 환경 변수 로드
loadEnv();

const port = process.env.NODE_ENV === "production" ? 8080 : 8081;

const passportConfig = require("./passport");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const hashtagRouter = require("./routes/hashtag");

const app = express();

db.sequelize.sync();
passportConfig();

if (port == 8080) {
  app.use(helmet());
  app.use(hpp());
  app.use(morgan("combined"));
  app.use(
    cors({
      origin: "http://carbancle.kr",
      credentials: true,
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: "http://localhost:9000",
      credentials: true,
    })
  );
}
app.use("/", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie("cookiesecret"));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "cookiesecret",
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.status(200).send("제로초 강의를 참고하여 oracle cloud로 연결");
});

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/hashtag", hashtagRouter);

app.post("/post", (req, res) => {
  if (req.isAuthenticated()) {
  }
});

app.listen(port, () => {
  console.log(`백엔드 서버 ${port}번 포트에서 작동중.`);
});
