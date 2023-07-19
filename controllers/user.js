////////////////////////////////////////////////////////////// Kullanılan modellerin entegrasyonu /////////////////////////////////////////////////////////////////////////////////
const Blog = require("../models/blog");
const Category = require("../models/category");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { Op } = require("sequelize");

/////////////////////////////////////////////////////////// Blogların detaylarının getirilmesi metodu /////////////////////////////////////////////////////////////////////////////
exports.blogs_details = async function (req, res) {
    const slug = req.params.slug;

    try {
        const blog = await Blog.findOne({
            where: {
                url: slug
            },
            raw: true
        });

        if (blog) {
            return res.render("users/blog-details", {
                title: blog.baslik,
                blog: blog
            });
        }
        res.redirect("/");
    }
    catch (err) {
        console.log(err);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////// Tüm blogların listelenmesi metodu ///////////////////////////////////////////////////////////////////////////////////
exports.blog_list = async function (req, res) {
    const size = 3;
    const { page = 0 } = req.query;
    const slug = req.params.slug;

    try {
        const { rows, count } = await Blog.findAndCountAll({ 
            where: { onay: {[Op.eq]: true } },
            raw: true,
            include: slug ? { model: Category, where: { url: slug } } : null,
            limit: size,
            offset: page * size 
        });

        const categories = await Category.findAll({ raw: true });

        res.render("users/blogs", {
            title: "Tüm Kurslar",
            blogs: rows,
            totalItems: count,
            totalPages: Math.ceil(count / size),
            currentPage: page,
            categories: categories,
            selectedCategory: slug
        })
    }
    catch(err) {
        console.log(err);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////// Yalnızca anasayfada görüntülenmesi istenen blogların listelenme metodu //////////////////////////////////////////////////////////////
exports.index = async function (req, res) {

    try {
        const blogs = await Blog.findAll({
            where: {
                onay: true,
                anasayfa: true
            },
            raw: true
        });

        const categories = await Category.findAll({ raw: true });

        console.log(blogs);
        console.log(categories);

        res.render("users/index", {
            title: "Popüler Kurslar",
            blogs: blogs,
            categories: categories,
            selectedCategory: null
        });
    }
    catch (err) {
        console.log(err);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
