////////////////////////////////////////////////////////////// Kullanılan modellerin entegrasyonu /////////////////////////////////////////////////////////////////////////////////
const Blog = require("../models/blog");
const Category = require("../models/category");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////// Kullanılan paketlerin entegrasyonu /////////////////////////////////////////////////////////////////////////////////
const fs = require("fs");
const { Op } = require("sequelize");

const sequelize = require("../data/db");
const slugField = require("../helpers/slugfield");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////// Admin panelindeki silinecek blog bilgisinin getirilmesi //////////////////////////////////////////////////////////
exports.get_blog_delete = async function (req, res) {
    const blogid = req.params.blogid;

    try {
        const blog = await Blog.findByPk(blogid);

        if (blog) {
            return res.render("admin/blog-delete", {
                title: "delete blog",
                blog: blog
            });
        }
        res.redirect("/admin/blogs");
    }
    catch (err) {
        console.log(err);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////// Admin panelindeki silinmesi istenen bloğun veritabanından silinmesi ///////////////////////////////////////////////////
exports.post_blog_delete = async function (req, res) {
    const blogid = req.body.blogid;

    try {
        const blog = await Blog.findByPk(blogid);
        if (blog) {
            await blog.destroy();
            return res.redirect("/admin/blogs?action=delete");
        }
        res.redirect("/admin/blogs");
    }
    catch (err) {
        console.log(err);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////// Admin panelindeki silinecek kategori bilgisinin getirilmesi //////////////////////////////////////////////////////////
exports.get_category_delete = async function (req, res) {
    const categoryid = req.params.categoryid;

    try {
        const category = await Category.findByPk(categoryid);

        if (category) {
            return res.render("admin/category-delete", {
                title: "delete category",
                category: category
            });
        }
        res.redirect("/admin/categories");

    }
    catch (err) {
        console.log(err);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////// Admin panelindeki silinmesi istenen bloğun veritabanından silinmesi ///////////////////////////////////////////////////
exports.post_category_delete = async function (req, res) {
    const categoryid = req.body.categoryid;

    try {
        const category = await Category.findByPk(categoryid);

        if(category)
        {
            await category.destroy();
            return res.redirect("/admin/categories?action=delete");
        }
        res.redirect("/admin/categories");

    }
    catch (err) {
        console.log(err);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// Veritabanına blog kaydederken sayfada görüntülenmesini istenen bilgilerin getirilmesi ////////////////////////////////////////////////////
exports.get_blog_create = async function (req, res) {

    try {
        const categories = await Category.findAll();
        res.render("admin/blog-create", {
            title: "add blog",
            categories: categories
        });
    }
    catch (err) {
        console.log(err);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////// Veritabanına blog kaydetme metodu ////////////////////////////////////////////////////////////////////////////////
exports.post_blog_create = async function (req, res) {
    const baslik = req.body.baslik;
    const altbaslik = req.body.altbaslik;
    const aciklama = req.body.aciklama;
    const resim = req.file.filename;
    const anasayfa = req.body.anasayfa == "on" ? 1 : 0;
    const onay = req.body.onay == "on" ? 1 : 0;

    try {
        await Blog.create({
            baslik: baslik,
            url: slugField(baslik),
            altbaslik: altbaslik,
            aciklama: aciklama,
            resim: resim,
            anasayfa: anasayfa,
            onay: onay
        });
        res.redirect("/admin/blogs?action=create");
    }
    catch (err) {
        console.log(err);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////// Veritabanına veri kaydederken kategori ekleme sayfasında görüntülenmesini istenen bilgilerin getirilmesi ////////////////////////////////////////////////////
exports.get_category_create = async function (req, res) {

    try {
        res.render("admin/category-create", {
            title: "add category",
        });
    }
    catch (err) {
        console.log(err);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////// Admin paneline kategori eklenmesi metodu ///////////////////////////////////////////////////
exports.post_category_create = async function (req, res) {
    const name = req.body.name;

    try {
        await Category.create({ name: name });
        res.redirect("/admin/categories?action=create");
    }
    catch (err) {
        console.log(err);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////// Veri güncellemek için blog sayfasına istenen verilerin getirilmesi  /////////////////////////////////////////////////////
exports.get_blog_edit = async function (req, res) {
    const blogid = req.params.blogid;

    try {
        const blog = await Blog.findOne({
            where: {
                id: blogid
            },
            include: {
                model: Category,
                attributes: ["id"]
            }
        });
        const categories = await Category.findAll();

        if(blog) {
            return res.render("admin/blog-edit", {
                title: blog.dataValues.baslik,
                blog: blog.dataValues,
                categories: categories
            });
        }

        res.redirect("admin/blogs");
    }
    catch(err) {
        console.log(err);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////// Güncellenecek blog verilerin veritabanına post edilmesi  ///////////////////////////////////////////////////////////////
exports.post_blog_edit = async function (req, res) {
    const blogid = req.body.blogid;
    const baslik = req.body.baslik;
    const altbaslik = req.body.altbaslik;
    const aciklama = req.body.aciklama;
    const kategoriIds = req.body.categories;
    const url = req.body.url;

    //Eğer bilgi girilmezse veritabanındaki normal resim tekrar kullanılır.
    let resim = req.body.resim;
    //Eğer resim bilgisi girildiyse requestteki bilgiyi alması için verildi.
    if (req.file) {
        resim = req.file.filename;
        //Eski resmi silmek için kullanıldı.
        fs.unlink("./public/images/" + req.body.resim, err => {
            console.log(err);
        });
    }

    const anasayfa = req.body.anasayfa == "on" ? 1 : 0;
    const onay = req.body.onay == "on" ? 1 : 0;

    try {
        const blog = await Blog.findOne({
            where: {
                id: blogid
            },
            include: {
                model: Category,
                attributes: ["id"]
            }
        });

        if (blog) {
            blog.baslik = baslik;
            blog.altbaslik = altbaslik;
            blog.aciklama = aciklama;
            blog.resim = resim;
            blog.anasayfa = anasayfa;
            blog.onay = onay;
            blog.url = url;


            if(kategoriIds == undefined)
            {
                await blog.removeCategories(blog.categories);
            }

            else
            {
                await blog.removeCategories(blog.categories);
                const selectedCategories = await Category.findAll({
                    where: {
                        id: {
                            [Op.in]: kategoriIds
                        }
                    }
                });
                await blog.addCategories(selectedCategories);
            }

            await blog.save();
            res.redirect("/admin/blogs?action=edit&blogid=" + blogid);
        }
        res.redirect("/admin/blogs");
    }
    catch (err) {
        console.log(err);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////// Kategorinin çokacok tablosundan silinmesi///////////////////////////////////////////////////////////////////////////////////////////////
exports.get_category_remove = async function (req, res){
    const blogid = req.body.blogid;
    const categoryid = req.body.categoryid;

    await sequelize.query(`delete from blogCategories where blogId=${blogid} and categoryId=${categoryid}`);
    res.redirect("/admin/categories/" + categoryid);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////// Veri güncellemek için kategori sayfasına istenen verilerin getirilmesi  /////////////////////////////////////////////////////
exports.get_category_edit = async function (req, res) {
    const categoryid = req.params.categoryid;

    try {
        const category = await Category.findByPk(categoryid);
        //Lazy Loading
        const blogs = await category.getBlogs();
        const countBlog = await category.countBlogs();

        if (category) {
            return res.render("admin/category-edit", {
                tittle: category.dataValues.name,
                category: category.dataValues,
                blogs: blogs,
                countBlog: countBlog
            });
        }
        res.redirect("admin/categories");
    }
    catch (err) {
        console.log(err);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////// Güncellenecek kategori verilerin veritabanına post edilmesi  ///////////////////////////////////////////////////////////////
exports.post_category_edit = async function (req, res) {
    const categoryid = req.body.categoryid;
    const name = req.body.name;

    try {
        const category = await Category.findByPk(categoryid);

        if (category) {
            category.name = name;
            await category.save();

            res.redirect("/admin/categories?action=edit&categoryid=" + categoryid);
        }
        res.redirect("/admin/categories");

    }
    catch (err) {
        console.log(err);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////// Veritabanındaki tüm blogların listelenmesi  ///////////////////////////////////////////////////////////////////
exports.get_blogs = async function (req, res) {
    try {
        const blogs = await Blog.findAll({
            attributes: ["id", "baslik", "altbaslik", "resim"],
            //Eager Loading
            include: {
                model: Category,
                attributes: ["name"]
            }
        });

        res.render("admin/blog-list", {
            title: "Blog List",
            blogs: blogs,
            action: req.query.action,
            blogid: req.query.blogid
        });
    }
    catch (err) {
        console.log(err);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////// Veritabanındaki tüm kategorilerin listelenmesi  ///////////////////////////////////////////////////////////////////
exports.get_categories = async function (req, res) {
    try {
        const categories = await Category.findAll();
        res.render("admin/category-list", {
            title: "Category List ",
            categories: categories,
            action: req.query.action,
            categoryId: req.query.categoryid
        });
    }
    catch (err) {
        console.log(err);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



