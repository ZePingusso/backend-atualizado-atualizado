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
  try {
    // Remove o campo image que está causando o erro
    const { image, coverImage, ...postData } = req.body;

    const post = await criarPost({
      ...postData,
      authorId: req.user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Erro ao criar post:", error);
    res.status(400).json({ 
      error: "Erro ao criar post" 
    });
  }
}

export async function updatePost(req, res) {
  try {
    const post = await atualizarPost(req.params.id, req.body);
    res.json(post);
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    res.status(400).json({ error: "Erro ao atualizar post" });
  }
}

export async function deletePost(req, res) {
  await deletarPost(req.params.id);

  res.status(204).send();
}