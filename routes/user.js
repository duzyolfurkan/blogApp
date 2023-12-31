////////////////////////////////////////////////////////////// Kullanılan paketlerin entegrasyonu /////////////////////////////////////////////////////////////////////////////////
const express = require("express");
const router = express.Router();
const path = require("path");
const userController = require("../controllers/user")
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////// Kategoriye göre blogların listelenmesi metodu /////////////////////////////////////////////////////////////////////////
router.get("/blogs/category/:slug", userController.blog_list);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////// Blogların detaylarının getirilmesi metodu /////////////////////////////////////////////////////////////////////////////
router.get("/blogs/:slug", userController.blogs_details);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////// Tüm blogların listelenmesi metodu ///////////////////////////////////////////////////////////////////////////////////
router.get("/blogs", userController.blog_list);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////// Yalnızca anasayfada görüntülenmesi istenen blogların listelenme metodu //////////////////////////////////////////////////////////////
router.get("/", userController.index);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////// Verilerin dışarıya açılması  ////////////////////////////////////////////////////////////////////////////////////
module.exports = router;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
