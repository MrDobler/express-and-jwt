const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog-controller');

router.get('/', blogController.blog_index);

router.get('/blogs/create', blogController.blog_form);

router.post('/blogs', blogController.blog_create);

router.get('/blogs/:id', blogController.blog_details);

router.delete('/blogs/:id', blogController.blog_delete);

module.exports = router;
