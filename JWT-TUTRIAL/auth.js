const jwt = require("jsonwebtoken");
const config = require("./config");

function auth(req, res, next){
    try{
        const token = req.headers.token;//headerからtoken情報取得

        const decoded = jwt.verify(token, config.jwt.secret);//jwtのverifyモジュールでtokenと鍵から元データを特定
        console.log(decoded);
        next();
    }
    catch (err) {
        return res.send(401).json({
            msg: "認証できません",
        });
    }
}

module.exports = auth;//auth関数を出力