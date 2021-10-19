const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();

// DB setting
mongoose.connect(process.env.MONGO_DB);
let db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");
});
db.on("error", (err) => {
  console.log("DB Erorr : ", err);
});

// other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// Routes
app.use("/", require("./routes/home"));
app.use("/posts", require("./routes/posts"));

// Port setting;
const port = 3000;
app.listen(port, () => {
  console.log("server on! http://localhost" + 3000);
});

/* 
  시험범위는 2,3,4,5,6,7,8 주차 내용

  프로이트/융 이론으로 문학/영화 분석
  발표일 : 11월 16일, 11월 30일, 12월 7일
  PT 발표


  조별로 발표한 문학/영화 작품의 비평문 쓰기
  제출일 : 12월 14일 자정까지
*/
