export const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    res.status(201).json({
      message: "URL encurtada com sucesso",
      originalUrl,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      error: "Erro ao criar URL",
    });
  }
};