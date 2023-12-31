////////////////////////////////////////////////////////// MYSQL Bağlantısı için gerekli bilgiler /////////////////////////////////////////////////////////////////////////////////
const mysql = require("mysql2");
const config = require("../config");
const Sequelize = require("sequelize")

///////////////////////////////////Veritabanı bağlantısı için gerekli çözüm///////////////////////////////////////////
const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'mysql',
    define: {
        timestamps: false
    }
  });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////Veritabanı bağlantısı kontrol edildi//////////////////////////////////////////////////
async function connect() {
try{
    await sequelize.authenticate();
    console.log("mysql server bağlantısı yapıldı.");
}
catch(err){
    console.log("Bağlantı Hatası", err);
}
};

connect();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////Sayfa dışarıya açıldı////////////////////////
module.exports = sequelize;
//////////////////////////////////////////////////////////////////////