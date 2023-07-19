/////////////////Gerekli kütüphane ve directoryler //////////////////////////////////////////////
const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");
/////////////////////////////////////////////////////////////////////////////////////////////////

///////////////Model oluşturuldu ve tüm özellikleri tanımlandı//////////////////////////////////////////
const Blog = sequelize.define("blog", {

    baslik: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    altbaslik: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    aciklama: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    resim: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    anasayfa: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

    onay: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    timestamps: true
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////Blog nesnesi ile model dışarıya açıldı/////////////////
module.exports = Blog;
/////////////////////////////////////////////////////////////////