const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogRouter = require('./Routes/blogRoutes');
const router = require('./Routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/user', router)
app.use('/api/blog', blogRouter)

mongoose.connect('mongodb://127.0.0.1:27017/enthusia-mern-blog');

app.listen(5000, () => {
  console.log('Server running on port 5000')
});
