import express from 'express';
import { createPost, deletePost } from '../controllers/post.controllers.js';
import verifyToken from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', verifyToken, createPost);
router.delete('/delete/:postId', verifyToken, deletePost);

export default router;