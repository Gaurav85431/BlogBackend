const authMiddleware = require('../Middleware/authMiddleware');
const Blog = require('../Model/blogModels')

const createBlog = async (req, res) => {

  if (req.user.role !== 'admin') {

    return res.status(403).send('Access denied');
  }
  const { title, content, media, description } = req.body;
  const blog = new Blog({
    title,
    content,
    media,
    description,
    createdBy: req.user.userId
  });
  await blog.save();
  res.send('Blog added');
};


const updateBlog = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(400).send('Access denied');
  }
  const { title, content, media, description } = req.body;
  await Blog.findByIdAndUpdate(req.params.id, { title, content, media, description });
  res.status(200).send('Blog updated');
};



const deleteBlog = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('Access denied');

  }
  await Blog.findByIdAndDelete(req.params.id);
  res.send('Blog deleted');
};


const viewBlog = async (req, res) => {
  const blogs = await Blog.find().populate('createdBy', 'username');
  res.status(200).json(blogs);
}



const likeBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog.likes.includes(req.user.userId)) {
    blog.likes.push(req.user.userId);
    await blog.save();
  }
  res.send('Blog liked');
};


const commentBlog = async (req, res) => {
  const { text } = req.body;
  const blog = await Blog.findById(req.params.id);
  blog.comments.push({ user: req.user.userId, text });
  await blog.save();
  res.send('Comment added');
};




module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  viewBlog,
  likeBlog,
  commentBlog
};
