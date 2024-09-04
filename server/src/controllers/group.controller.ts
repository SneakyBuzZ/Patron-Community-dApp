import { Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { db } from '../utils/db';
import { ApiResponse } from '../utils/ApiResponse';
import { uploadOnCloudinary } from '../utils/cloudinary';

export const uploadImageToCloudinary = async (req: Request, res: Response) => {
    const imageFileLocalPath = req.file?.path;
    if (!imageFileLocalPath) throw new ApiError(401, 'imageFile is missing');

    const imageFile = await uploadOnCloudinary(imageFileLocalPath);
    if (!imageFile) throw new ApiError(500, 'Failed to upload image file');

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { url: imageFile.url },
                'Image uploaded successfully'
            )
        );
};

export const createGroup = async (req: Request, res: Response) => {
    const { groupName, groupDescription, ownerId, groupCoverImage } = req.body;

    [groupDescription, groupName, ownerId].some((each) => {
        if (!each) {
            throw new ApiError(
                200,
                'CREATE GROUP : GROUP CONTROLLER : All fields are required'
            );
        }
    });

    const newGroup = await db.group.create({
        data: {
            groupCoverImage,
            groupName,
            groupDescription,
            ownerId,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    if (!newGroup) {
        return res
            .status(500)
            .json(new ApiResponse(500, {}, 'Failed to create a new Group'));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, newGroup, 'Successfully created a group'));
};

export const editGroupName = async (req: Request, res: Response) => {
    const { groupName, groupId } = req.query;

    if (!groupName) {
        throw new ApiError(
            400,
            'EDIT GROUP NAME : GROUP CONTROLLER : groupName is  required'
        );
    }

    if (!groupId) {
        throw new ApiError(
            400,
            'EDIT GROUP NAME : GROUP CONTROLLER : ownerId is  required'
        );
    }

    const editedGroup = await db.group.update({
        where: {
            id: String(groupId),
        },
        data: {
            groupName: String(groupName),
            updatedAt: new Date(),
        },
    });

    if (!editedGroup) {
        return res
            .status(500)
            .json(new ApiResponse(500, {}, 'Failed to edit groupName'));
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                editedGroup,
                'Successfully edited the groupName'
            )
        );
};

export const editGroupDescription = async (req: Request, res: Response) => {
    const { groupDescription, groupId } = req.query;

    console.log('REQ QUERY: ', req.query);

    if (!groupDescription) {
        throw new ApiError(
            400,
            'EDIT GROUP NAME : GROUP CONTROLLER : groupDescription is  required'
        );
    }

    if (!groupId) {
        throw new ApiError(
            400,
            'EDIT GROUP NAME : GROUP CONTROLLER : ownerId is  required'
        );
    }

    const editedGroup = await db.group.update({
        where: {
            id: String(groupId),
        },
        data: {
            groupDescription: String(groupDescription),
            updatedAt: new Date(),
        },
    });

    if (!editedGroup) {
        return res
            .status(500)
            .json(new ApiResponse(500, {}, 'Failed to edit groupDescription'));
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                editedGroup,
                'Successfully edited the groupDescription'
            )
        );
};

export const deletedGroup = async (req: Request, res: Response) => {
    const { groupId } = req.params;

    if (!groupId) {
        throw new ApiError(
            400,
            'DELETE GROUP : GROUP CONTROLLER : groupId is required'
        );
    }

    await db.group.delete({
        where: {
            id: groupId,
        },
    });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, 'Successfully deleted the group'));
};

export const getAllGroups = async (req: Request, res: Response) => {
    const skip = (Number(1) - 1) * Number(10);

    const allGroups = await db.group.findMany({
        skip,
        take: 10,
        select: {
            groupCoverImage: true,
            groupName: true,
            groupDescription: true,
            createdAt: true,
            members: true,
        },
    });

    if (!allGroups) {
        return res
            .status(500)
            .json(new ApiResponse(500, {}, 'Failed to get all groups'));
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                allGroups,
                'Successfully retrieved all the groups'
            )
        );
};
