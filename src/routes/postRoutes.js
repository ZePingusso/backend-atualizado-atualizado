import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";

import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPostById);

router.post("/", requireAuth, createPost);
router.put("/:id", requireAuth, updatePost);
router.delete("/:id", requireAuth, deletePost);

export default router;