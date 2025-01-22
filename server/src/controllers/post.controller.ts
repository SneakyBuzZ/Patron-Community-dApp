import { Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { db } from '../utils/db';
import { ApiResponse } from '../utils/ApiResponse';

export const createPost = async (req: Request, res: Response) => {
    const {
        postImage,
        postTitle,
        postDescription,
        ownerId,
        groupId,
        bountyValue,
        bountyType,
    } = req.body;

    [postImage, , postTitle, postDescription, ownerId, groupId].some((each) => {
        if (!each) {
            throw new ApiError(
                400,
                'CREATE POST : POST CONTROLLER : All fields are required'
            );
        }
    });

    try {
        const { id } = await db.post.create({
            data: {
                postTitle,
                postDescription,
                postImage,
                ownerId,
                groupId,
            },
        });

        console.log('OKAY OKAY ID: ', id);

        if (bountyType && bountyValue) {
            const bounty = await db.bounty.create({
                data: {
                    bountyType,
                    bountyValue,
                    postId: id,
                    bountyOwnerId: ownerId,
                },
            });

            console.log('BOUNTY: ', bounty);
        }

        return res
            .status(201)
            .json(new ApiResponse(201, 'Successfully created post'));
    } catch (error) {
        console.log('ERROR: ', error);
        return res
            .status(500)
            .json(new ApiResponse(500, {}, "Couldn't create post"));
    }
};

export const deletePost = async (req: Request, res: Response) => {
    const { postId } = req.params;

    if (!postId) {
        throw new ApiError(
            400,
            'DELETE POST : POST CONTROLLER : postId is required'
        );
    }

    await db.post.delete({
        where: {
            id: postId,
        },
    });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, 'Successfully deleted post'));
};

export const getAllPostsInGroup = async (req: Request, res: Response) => {
    const { groupId } = req.query;

    const skip = 0;

    if (!groupId) {
        throw new ApiError(400, 'groupId is required');
    }

    const allPostsInGroup = await db.post.findMany({
        where: {
            groupId: String(groupId),
        },
        select: {
            postImage: true,
            postDescription: true,
            postTitle: true,
            createdAt: true,
            onwner: {
                select: {
                    name: true,
                    image: true,
                },
            },
            bounty: {
                select: {
                    bountyStatus: true,
                    bountyType: true,
                    bountyValue: true,
                },
            },
        },
        skip,
        take: Number(10),
    });

    if (!allPostsInGroup) {
        return res
            .status(500)
            .json(
                new ApiResponse(
                    500,
                    {},
                    'Failed to retriev all posts in a group'
                )
            );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                allPostsInGroup,
                'Successfully retrieved all posts in group'
            )
        );
};

export const getAllPostsOfUser = async (req: Request, res: Response) => {
    const { limit, pageNo, userId } = req.query;

    const skip = (Number(pageNo) - 1) * Number(limit);

    if (!userId) {
        throw new ApiError(400, 'userId is required');
    }

    const allPostsOfUser = await db.post.findMany({
        where: {
            ownerId: String(userId),
        },
        skip,
        take: Number(limit),
    });

    if (!allPostsOfUser) {
        return res
            .status(500)
            .json(
                new ApiResponse(
                    500,
                    {},
                    'Failed to retriev all posts in a group'
                )
            );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                allPostsOfUser,
                'Successfully retrieved all posts in group'
            )
        );
};

export const getAllPosts = async (req: Request, res: Response) => {
    const { limit = 10, pageNo = 1 } = req.query;

    const skip = (Number(pageNo) - 1) * Number(limit);

    const allPosts = await db.post.findMany({
        skip,
        take: Number(limit),
    });

    if (!allPosts) {
        return res
            .status(500)
            .json(new ApiResponse(500, {}, 'Failed to retriev all posts'));
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, allPosts, 'Successfully retrieved all posts')
        );
};
