const Blog = require('../models/blog');

const blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'Home', blogs: result });
    })
    .catch((err) => console.log('Blog find error: ', err));
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => res.render('details', { title: 'Blog Details', blog: result }))
    .catch((err) => console.log('Blog edit error: ', err));
};

const blog_create = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then((result) => res.redirect('/'))
    .catch((err) => console.log('Blog create error: ', err));
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => res.json({
      status: 200,
      redirect: '/'
    }))
    .catch((err) => console.log('Blog delete error: ', err));
};

const blog_form = (req, res) => {
  res.render('create', { title: 'Create new blog' });
};

module.exports = {
  blog_index,
  blog_details,
  blog_create,
  blog_delete,
  blog_form
};
