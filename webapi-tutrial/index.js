function encodeBase64 (buffer) {
    return buffer.toString('base64')
    .replace(/\+/g, `-`)
    .replace(/\//g, `-`)
    .replace(/=+$/g, ``)
}

function decodeBase64Url(base64url) {
    const base64 = base64url
      .replace(/-/g, '+')
      .replace(/_/g, '/')
  
    return Buffer.from(base64, 'base64')
}


const express = require("express");
const app = express();
app.use(express.json());

app.listen(3000, console.log("サーバーが開始されました"));

app.get("/",(req,res) => {
    console.log("get/");
    res.status(404).send();
    console.log("-----end this programm-----");
});

const users = [
    {
        user_id: "TaroYamada",
        password: "PaSSwd4TY",
        nickname: "たろー",
        comment: "僕は元気です",
    }
];

app.get("/users/:user_id", (req, res) => {
    console.log("get/users/:user_id");
    console.log(req.headers.authorization);
    if (req.headers.authorization == undefined) {
        var res_data = { message: "Authentication Failed"};
        res.status(401).send(res_data);
    }
    else{
      
        const buffer = req.headers.authorization.split(" ")[1];
        //console.log("buffer is ...");
        //console.log(buffer);
        const bufferAry = decodeBase64Url(buffer).toString().split(":");
        console.log("bufferAry is ...");
        console.log(bufferAry);
        const user_id =  bufferAry[0];
        const password =  bufferAry[1];
        const user = users.find((c) => c.user_id === req.params.user_id);//customersの中からreqされたidパラメータを確認して、その２を返す、cはcustomersの各要素
        if (user == undefined) {
            console.log("user is undefined");
        }
        if (user.nickname == undefined) {
            user.nickname = user.user_id;
        }
        const user_data = {
            user_id: user.user_id,
            nickname: user.nickname,
        };
        console.log("users");
        console.log(users);
        console.log("ヘッダーのpass:"+password);
        console.log("見つかったユーザー");
        console.log(user);
        var res_data = { message: "User details by user_id", user: user_data};
        res.status(200).send(res_data);
        if (user == undefined) {
            //console.log("res.sendStatus(404)")
            var res_data = { message: "No User found"};
            res.status(404).send(res_data);
        }
    }
    console.log("-----end this programm-----");
});


//データを送信(作成)してみよう(POSTメソッド)
app.post("/signup", (req, res) => {
    console.log("post/signup");
    const user = {
        user_id: req.body.user_id,
        password: req.body.password,
    };
    if (req.body.user_id != undefined) {
    var res_data = { message: "Account successfully created", user: user,};
    res.status(200).send(res_data);
    users.push(user);
    }
    else {
    var res_data = { message: "Account creation failed", cause: "required user_id and password",};
    res.status(400).send(res_data);
    }
    console.log("-----end this programm-----");
});


app.post("/close", (req, res) => {
    console.log("close");
    console.log(req.headers.authorization);
    if (req.headers.authorization == undefined) {
        var res_data = { message: "Authentication Failed"};
        res.status(401).send(res_data);
    }
    else{
      
        const buffer = req.headers.authorization.split(" ")[1];
        //console.log("buffer is ...");
        //console.log(buffer);
        const bufferAry = decodeBase64Url(buffer).toString().split(":");
        console.log("bufferAry is ...");
        console.log(bufferAry);
        const user_id =  bufferAry[0];
        const password =  bufferAry[1];
        const user = users.find((c) => c.user_id === req.params.user_id);//customersの中からreqされたidパラメータを確認して、その２を返す、cはcustomersの各要素
        /*
        console.log("users");
        console.log(users);
        console.log("ヘッダーのpass:"+password);
        console.log("見つかったユーザー");
        console.log(user);
        */

        const index = users.indexOf(user);
        users.splice(index, 1); 
        var res_data = { message: "Account and user successfully removed"};
        res.status(200).send(res_data);
    }
    console.log("-----end this programm-----");
});


//データを更新してみよう(PUTメソッド)
app.patch("/users/:user_id", (req, res) => {
    console.log("patch");
    //console.log(req.headers.authorization);
    if (req.headers.authorization == undefined) {
        var res_data = { message: "Authentication Failed"};
        res.status(401).send(res_data);
    }
    else{
      
        const buffer = req.headers.authorization.split(" ")[1];
        //console.log("buffer is ...");
        //console.log(buffer);
        const bufferAry = decodeBase64Url(buffer).toString().split(":");
        console.log("bufferAry is ...");
        console.log(bufferAry);
        const user_id =  bufferAry[0];
        const password =  bufferAry[1];
        const user = users.find((c) => c.user_id === req.params.user_id);//customersの中からreqされたidパラメータを確認して、その２を返す、cはcustomersの各要素
        if (user == undefined) {
            console.log("user is undefined");
        }
        if (user.nickname == undefined) {
            user.nickname = user.user_id;
        }
        const user_data = {
            user_id: user.user_id,
            nickname: user.nickname,
        };
        console.log("users");
        console.log(users);
        console.log("ヘッダーのpass:"+password);
        console.log("見つかったユーザー");
        console.log(user);
        //console.log("リスト内のpass:"+user.password);
        //console.log("得られたuserデータ");
        //console.log(user_data);
        if (password != user.password) {
            var res_data = { message: "No Permission for Update"};
            res.status(403).send(res_data);
        }
        else if (req.params.user_id != user_id) {
            var res_data = { message: "No Permission for Update"};
            res.status(400).send(res_data);
        }
        else if (req.body.user_id != undefined || req.body.password != undefined) {
            var res_data = { message: "User updation failed", cause: "not updatable user_id and password"};
            res.status(400).send(res_data);
        }
        else if (req.body.nickname == undefined || req.body.comment == undefined) {
            var res_data = { message: "User updation failed", cause: "required nickname or comment"};
            res.status(400).send(res_data);
        }
        else {
            user.nickname = req.body.nickname;
            user.comment = req.body.comment;
            var res_data = { message: "User successfully updated", recipe: [user_data]};
            res.status(200).send(res_data);
        }
    }
    console.log("-----end this programm-----");
});