import {
  listarPosts,
  buscarPostPorId,
  criarPost,
  atualizarPost,
  deletarPost,
} from "../models/postModel.js";

export async function getPosts(req, res) {
  const posts = await listarPosts();
  res.json(posts);
}

export async function getPostById(req, res) {
  const post = await buscarPostPorId(req.params.id);

  if (!post) {
    return res.status(404).json({
      error: "Post não encontrado",
    });
  }

  res.json(post);
}

export async function createPost(req, res) {
  const post = await criarPost({
    ...req.body,
    authorId: req.user.id,
  });

  res.status(201).json(post);
}

export async function updatePost(req, res) {
  const post = await atualizarPost(
    req.params.id,
    req.body
  );

  res.json(post);
}

export async function deletePost(req, res) {
  await deletarPost(req.params.id);

  res.status(204).send();
}