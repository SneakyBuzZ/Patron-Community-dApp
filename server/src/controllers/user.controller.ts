import { Request, Response } from 'express';
import { GetDataMethodType } from '../utils/types';
import { ApiError } from '../utils/ApiError';
import { db } from '../utils/db';
import { getUserByAddress, getUserById } from '../helpers/user.helper';
import { ApiResponse } from '../utils/ApiResponse';
import { generateUsername } from '../utils/generateUsername';

export const addUserToDb = async (req: Request, res: Response) => {
    const { address } = req.query;

    if (!address) {
        throw new ApiError(
            400,
            'ADD USER TO DB : USER CONTROLLER : Address is required'
        );
    }

    const { message }: GetDataMethodType = await getUserByAddress(
        String(address)
    );

    if (message == true) {
        throw new ApiError(
            400,
            'ADD USER TO DB : USER CONTROLLER : User already exists'
        );
    } else {
        const username = generateUsername();
        const newUser = await db.user.create({
            data: {
                address: String(address),
                name: String(username),
                createdAt: new Date(),
            },
            select: {
                name: true,
                address: true,
                createdAt: true,
                image: true,
            },
        });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    newUser,
                    'User is successfully created and added to database'
                )
            );
    }
};

export const removeUserFromDb = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    if (!userId) {
        throw new ApiError(
            400,
            'REMOVE USER FROM DB : USER CONTROLLER : userId is required '
        );
    }

    const { message }: GetDataMethodType = await getUserById(userId);

    if (message == true) {
        await db.user.delete({
            where: {
                id: userId,
            },
        });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {},
                    'User deleted from database successfully'
                )
            );
    } else {
        return res
            .status(400)
            .json(
                new ApiResponse(
                    400,
                    {},
                    'User with provided address doesnot exist'
                )
            );
    }
};

export const retrieveUserByAddress = async (req: Request, res: Response) => {
    const { address } = req.query;

    if (!address) {
        throw new ApiError(
            400,
            'RETRIEVE USER BY ADDRESS : USER CONTROLLER : Address is required'
        );
    }

    const user = await db.user.findUnique({
        where: {
            address: String(address),
        },
        select: {
            name: true,
            address: true,
            createdAt: true,
            image: true,
        },
    });

    if (!user) {
        return res
            .status(204)
            .json(
                new ApiResponse(
                    204,
                    {},
                    'User with provided address doesnot exist'
                )
            );
    } else {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    user,
                    'User details retrieved successfully'
                )
            );
    }
};

export const changeProfileImage = async (req: Request, res: Response) => {
    const { image, address } = req.body;

    if (!image || !address) {
        throw new ApiError(
            400,
            'CHANGE PROFILE IMAGE : USER CONTROLLER : Image or Address is required'
        );
    }

    const newImage = await db.user.update({
        where: {
            address: String(address),
        },
        data: {
            image: String(image),
        },
        select: {
            image: true,
        },
    });

    if (!newImage) {
        throw new ApiError(
            400,
            'CHANGE PROFILE IMAGE : USER CONTROLLER : User with provided address does not exist'
        );
    } else {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    newImage,
                    'Profile image updated successfully'
                )
            );
    }
};

export const changeProfileName = async (req: Request, res: Response) => {
    const { name, address } = req.body;

    if (!name || !address) {
        throw new ApiError(
            400,
            'CHANGE PROFILE NAME : USER CONTROLLER : Name or Address is required'
        );
    }

    const newName = await db.user.update({
        where: {
            address: String(address),
        },
        data: {
            name: String(name),
        },
        select: {
            name: true,
        },
    });

    if (!newName) {
        throw new ApiError(
            400,
            'CHANGE PROFILE NAME : USER CONTROLLER : User with provided address does not exist'
        );
    } else {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    newName,
                    'Profile name updated successfully'
                )
            );
    }
};

export const checkIfUserExists = async (req: Request, res: Response) => {
    const { address } = req.query;

    if (!address) {
        throw new ApiError(
            400,
            'CHECK IF USER EXISTS : USER CONTROLLER : Address is required'
        );
    }

    const userByAddress = await getUserByAddress(String(address));

    if (userByAddress) {
        return res
            .status(200)
            .json(new ApiResponse(200, true, 'User exists in the database'));
    } else {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    404,
                    false,
                    'User does not exist in the database'
                )
            );
    }
};

export const getUserIdByAddress = async (req: Request, res: Response) => {
    const { address } = req.query;

    if (!address) {
        throw new ApiError(
            400,
            'GET USER ID BY ADDRESS : USER CONTROLLER : Address is required'
        );
    }

    const userId = await db.user.findFirst({
        where: {
            address: String(address),
        },
        select: {
            id: true,
        },
    });

    if (!userId) {
        throw new ApiError(
            404,
            'GET USER ID BY ADDRESS : USER CONTROLLER : User does not exist in the database'
        );
    } else {
        return res
            .status(200)
            .json(
                new ApiResponse(200, userId, 'User ID retrieved successfully')
            );
    }
};
