export const createPost = async (req, res) => {
  try {
    const { title, content, excerpt } = req.body;

    res.status(201).json({
      message: "Post criado com sucesso",
      post: {
        title,
        content,
        excerpt,
      },
      author: req.user,
    });
  } catch (error) {
    res.status(500).json({
      error: "Erro ao criar post",
    });
  }
};