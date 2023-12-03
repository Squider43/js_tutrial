require("dotenv").config()

module.exports = {
    jwt: {
        secret: process.env.SECRETKEY,//実行中のプロセスの環境変数にアクセス
        options: {
            algorithm: "HS256",
            expiresIn: "1d"
        },
    },
};
/*
つまり、config.js内にて、jwtという関数を定義している
config.jsをモジュールとして取得するには、require(./config.js)が必要になる。
これで読み込んだとき(今回ならconfigとして)config.jwt.secret(=process.env.SECRETKEY)のように読み込める
*/