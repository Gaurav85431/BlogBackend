const express = require('express');
const blogRouter = express.Router();

const blogController = require('../Controller/blogController')
const authMiddleware = require('../Middleware/authMiddleware')

blogRouter.post('/blogs', authMiddleware, blogController.createBlog);


blogRouter.put('/blogs/:id', authMiddleware, blogController.updateBlog);

blogRouter.delete('/blogs/:id', authMiddleware, blogController.deleteBlog);


blogRouter.get('/blogs', blogController.viewBlog);

blogRouter.post('/blogs/:id/like', authMiddleware, blogController.likeBlog);

blogRouter.post('/blogs/:id/comment', authMiddleware, blogController.commentBlog)

module.exports = blogRouter;
