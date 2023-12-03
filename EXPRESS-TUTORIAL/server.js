const express = require("express");
const app = express();
const PORT = 3000;
const userRouter = require("./routes/user");//routesフォルダのuser.jsから

app.use(logger);

//app.use(express.static("public"));//publicフォルダの中の静的ファイルにアクセスできるようにするもの
app.set("view engine", "ejs");//テンプレートエンジンの指定 ejsを使うと宣言
/*
app.set(key, value): Express.jsアプリケーションの設定を行うメソッドです。key には設定の名前（キー）、value にはその設定の値が指定されます。
*/
app.get("/", (req, res) => {
    //console.log("Hello Express");
    //res.send("<h1>こんにちは</h1>");
    //res.sendStatus(400);
    /*res.status(500).json({
        msg: "エラーです。"
    })
    */
    res.render("index", { text: "NodejsとExpress"}); //textに変数を代入、expressはデフォルトでviews dirを参照する
});

app.use("/user", userRouter);

//ミドルウェア
function logger(req, res, next) {
    console.log(req.originalUrl);//reqがきたらそのURLを返す
    next(); //続くことを明記
};


app.listen(PORT, () => console.log("server runnning!"));