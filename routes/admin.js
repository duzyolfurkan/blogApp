////////////////////////////////////////////////////////////// Kullanılan paketlerin entegrasyonu /////////////////////////////////////////////////////////////////////////////////
const express = require("express");
const router = express.Router();

const path = require("path");

const imageUpload = require("../helpers/image-upload");

const adminController = require("../controllers/admin");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////// Admin panelindeki silinecek blog bilgisinin getirilmesi //////////////////////////////////////////////////////////
router.get("/blog/delete/:blogid", adminController.get_blog_delete);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////// Admin panelindeki silinmesi istenen bloğun veritabanından silinmesi ///////////////////////////////////////////////////
router.post("/blog/delete/:blogid", adminController.post_blog_delete);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////// Admin panelindeki silinecek kategori bilgisinin getirilmesi //////////////////////////////////////////////////////////
router.get("/categories/delete/:categoryid", adminController.get_category_delete );
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////// Admin panelindeki silinmesi istenen bloğun veritabanından silinmesi ///////////////////////////////////////////////////
router.post("/categories/delete/:categoryid", adminController.post_category_delete );
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////// Kategorinin çokacok tablosundan silinmesi //////////////////////////////////////////////////////////////////////////////////
router.post("/categories/remove", adminController.get_category_remove);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// Veritabanına blog kaydederken sayfada görüntülenmesini istenen bilgilerin getirilmesi ////////////////////////////////////////////////////
router.get("/blog/create", adminController.get_blog_create);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////// Veritabanına blog kaydetme metodu ////////////////////////////////////////////////////////////////////////////////
router.post("/blog/create", imageUpload.upload.single("resim"), adminController.post_blog_create);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////// Veritabanına veri kaydederken kategori ekleme sayfasında görüntülenmesini istenen bilgilerin getirilmesi ////////////////////////////////////////////////////
router.get("/category/create", adminController.get_category_create);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////// Admin paneline kategori eklenmesi metodu ///////////////////////////////////////////////////
router.post("/category/create", adminController.post_category_create);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////// Veri güncellemek için blog sayfasına istenen verilerin getirilmesi  /////////////////////////////////////////////////////
router.get("/blogs/:blogid", adminController.get_blog_edit);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////// Güncellenecek blog verilerin veritabanına post edilmesi  ///////////////////////////////////////////////////////////////
router.post("/blogs/:blogid", imageUpload.upload.single("resim"), adminController.post_blog_edit);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////// Veri güncellemek için kategori sayfasına istenen verilerin getirilmesi  /////////////////////////////////////////////////////
router.get("/categories/:categoryid", adminController.get_category_edit);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////// Güncellenecek kategori verilerin veritabanına post edilmesi  ///////////////////////////////////////////////////////////////
router.post("/categories/:categoryid", adminController.post_category_edit);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////// Veritabanındaki tüm blogların listelenmesi  ///////////////////////////////////////////////////////////////////
router.get("/blogs", adminController.get_blogs);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////// Veritabanındaki tüm kategorilerin listelenmesi  ///////////////////////////////////////////////////////////////////
router.get("/categories", adminController.get_categories);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////// Verilerin dışarıya açılması  ////////////////////////////////////////////////////////////////////////////////////
module.exports = router;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////