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
    const { groupDescription, groupName, isPrivate, isCrypto, ownerId } =
        req.body;

    [groupDescription, groupName, ownerId, isPrivate, isCrypto].some((each) => {
        if (!each) {
            throw new ApiError(
                200,
                'CREATE GROUP : GROUP CONTROLLER : All fields are required'
            );
        }
    });

    if (!req.files || req.files.length === 0) {
        throw new ApiError(
            400,
            'CREATE GROUP : GROUP CONTROLLER : File is required'
        );
    }

    const files = req.files as Express.Multer.File[];

    const groupCoverImage = files[0].originalname;
    const groupDisplayImage = files[1].originalname;

    const newGroup = await db.group.create({
        data: {
            groupCoverImage,
            groupName,
            groupDescription,
            ownerId,
            createdAt: new Date(),
            updatedAt: new Date(),
            groupDisplayImage,
            isPrivate: isPrivate === 'true' ? true : false,
            isCrypto: isCrypto === 'true' ? true : false,
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

export const getAllGroups = async (_req: Request, res: Response) => {
    const skip = (Number(1) - 1) * Number(10);

    const allGroups = await db.group.findMany({
        skip,
        take: 10,
        select: {
            groupDisplayImage: true,
            groupCoverImage: true,
            groupName: true,
            groupDescription: true,
            createdAt: true,
            members: true,
            id: true,
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

export const getGroupById = async (req: Request, res: Response) => {
    const { groupId } = req.query;

    if (!groupId) {
        throw new ApiError(
            400,
            'GET GROUP BY ID : GROUP CONTROLLER : groupId is required'
        );
    }

    const group = await db.group.findUnique({
        where: {
            id: String(groupId),
        },
        select: {
            groupDisplayImage: true,
            groupCoverImage: true,
            groupName: true,
            groupDescription: true,
            createdAt: true,
            members: true,
            id: true,
        },
    });

    if (!group) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, 'Group not found'));
    } else {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    group,
                    'Successfully retrieved the group by id'
                )
            );
    }
};
