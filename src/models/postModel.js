import { prisma } from "../lib/prisma.js";

export async function listarPosts() {
  return prisma.post.findMany({
    include: {
      author: true,
      categories: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function buscarPostPorId(id) {
  return prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
      categories: true,
      comments: true,
    },
  });
}

export async function criarPost(data) {
  const slug = data.title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");

  return prisma.post.create({
    data: {
      ...data,
      slug,
    },
  });
}

export async function atualizarPost(id, data) {
  return prisma.post.update({
    where: { id },
    data,
  });
}

export async function deletarPost(id) {
  return prisma.post.delete({
    where: { id },
  });
}