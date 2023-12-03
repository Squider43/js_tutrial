const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("./config");
const auth = require("./auth");



const app = express();
const PORT = 3000;

app.use(express.json());//json形式のやりとりを使うことを明記
app.listen(PORT, console.log("server runnning"));//3000でサーバー立てる+ログ

//登録
app.post("/register", (req, res) => {// /registerにpostされたときの(req,res)
    const payload = {//これを暗号化
        username: req.body.username,
        email: req.body.email,
    };

    const token = jwt.sign(payload, config.jwt.secret, config.jwt.options);//toke生成
    /*
    config.jwt.options...{ algorithm: 'HS256', expiresIn: '1d' }
    config.jwt.secret...{SECRETKEY}
    */

    const body = {
        username: req.body.username,
        email: req.body.email,
        token: token,
    };
    console.log(req.body);//ここに情報が格納
    //console.log(res.status(200))

    res.status(200).json(body);
});

//ログイン
app.get("/login", auth, (req, res) => { /*endpoint, その時の実行関数→(req,res)で動くことを示している
                                        auth内のnext()で次の段階に進むことを通知する*/
    res.status(200).json({ //クライアント側がサーバー通信状況を管理するためのstatusのこと,statusの一部としてjson形式を送信している
    msg: "承認に成功しました",
    });
});