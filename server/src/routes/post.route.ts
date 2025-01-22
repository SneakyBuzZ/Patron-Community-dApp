import { Router } from 'express';
import {
    createPost,
    getAllPosts,
    getAllPostsInGroup,
} from '../controllers/post.controller';

export const postRouter = Router();

postRouter.route('/create').post(createPost);

postRouter.route('/get-groupPosts').get(getAllPostsInGroup);

postRouter.route('/get-all').get(getAllPosts);
