const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const Post = require('./models/Post');

const route = Router();

route.get('/posts', async (req, res) => {
  const posts = await Post.find();

  return res.json(posts);
});

route.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
  const { originalname: name, size, key, location: url = '' } = req.file;
  
  const post = await Post.create({
    name,
    size,
    key,
    url
  })
  return res.json(post);
});

route.delete('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  await post.remove();
  
  return res.send('Deletado com sucesso');
})

module.exports = route;