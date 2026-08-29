import { Router } from 'express';
import { createPost, getPosts, updatePost, deletePost } from '../controllers/post.controllers.js';

const router = Router();

router.route('/create').post(createPost);        // Create posts 
router.route('/getPosts').get(getPosts);         // Get posts
router.route('/update/:id').patch(updatePost);   // Update a post (patch update some date, put update all data)
router.route('/delete/:id').delete(deletePost);  // Delete a post 

export default router;