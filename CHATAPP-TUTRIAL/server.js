const express = require("express");
const app = express();
const http = require("http");//httpサーバーを用いるモジュール
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html"); //dir/index.htmlを送信
});

io.on("connection", (socket) => { //connectionを引数socketで実行 socketは送受信するデータ(連携用io())のこと
    console.log("ユーザーが接続しました"); //接続した時

    socket.on("chat message", (msg)=> {//(イベント名,コールバック関数(ユーザーの情報))
        console.log("メッセージ：" + msg);//受け取ると出力
        io.emit("chat message", msg);//クライアントに送信///サーバー側の管理
    });
});
//ioがサーバー側の管理、socketがやりとり用のioデータ



server.listen(PORT, () => {
    console.log("listening on 3000");
});