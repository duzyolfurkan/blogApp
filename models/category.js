/////////////////Gerekli kütüphane ve directoryler //////////////////////////////////////////////
const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");
/////////////////////////////////////////////////////////////////////////////////////////////////

///////////////Model oluşturuldu ve tüm özellikleri tanımlandı//////////////////////////////////////////
const Category = sequelize.define("category", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////Category nesnesi ile model dışarıya açıldı/////////////////
module.exports = Category;
/////////////////////////////////////////////////////////////////