/////Paketlerin entegrasyonu///////////////////
const multer = require("multer");
const path = require("path");
//////////////////////////////////////////////

//Storage fonksiyonu destination ve filename belirtilerek tanımlandı
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./public/images");
    },
    filename: function(req, file, cb){
        cb(null, path.parse(file.originalname).name + "-" + Date.now() + path.extname(file.originalname))
    }
})
////////////////////////////////////////////////////////

//Storage dosyası multer içerisinde tanımladı//////
const upload = multer({
    storage: storage,
}
);
/////////////////////////////////////////////

//Dosya dışarıya açıldı////
module.exports.upload = upload;
///////////////////////////////////