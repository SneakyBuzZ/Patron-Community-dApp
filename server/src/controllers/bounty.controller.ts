import { Request, Response } from 'express';
import { db } from '../utils/db';
import { ApiResponse } from '../utils/ApiResponse';

export const getAllBounties = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const bounties = await db.bounty.findMany();
        res.status(200).json(
            new ApiResponse(201, { bounties }, 'Bounties fetched successfully')
        );
    } catch (error) {
        res.status(500).json(new ApiResponse(500, 'Error fetching bounties'));
    }
};

export const getBountyById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { bountyId } = req.params;
        if (!bountyId) {
            res.status(400).json(new ApiResponse(400, 'Bounty ID is required'));
        }
        const bounty = await db.bounty.findUnique({
            where: { id: String(bountyId) },
        });
        if (!bounty) {
            res.status(404).json(new ApiResponse(404, 'Bounty not found'));
            return;
        }
        res.status(200).json(
            new ApiResponse(200, { bounty }, 'Bounty fetched successfully')
        );
    } catch (error) {
        res.status(500).json(new ApiResponse(500, 'Error fetching bounty'));
    }
};

export const createBounty = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { bountyValue, bountyType, bountyOwnerId, postId } = req.body;

        if (!bountyValue || !bountyType || !bountyOwnerId || !postId) {
            res.status(400).json(
                new ApiResponse(400, 'All fields are required')
            );
        }

        await db.bounty.create({
            data: {
                bountyValue,
                bountyType,
                bountyOwnerId,
                postId,
            },
        });

        res.status(201).json(
            new ApiResponse(201, 'Bounty created successfully')
        );
    } catch (error) {
        res.status(500).json(new ApiResponse(500, 'Error creating bounty'));
    }
};

export const deleteBounty = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { bountyId } = req.params;

        if (!bountyId) {
            res.status(400).json(new ApiResponse(400, 'Bounty ID is required'));
        }

        await db.bounty.delete({
            where: { id: String(bountyId) },
        });

        res.status(200).json(
            new ApiResponse(200, 'Bounty deleted successfully')
        );
    } catch (error) {
        res.status(500).json(new ApiResponse(500, 'Error deleting bounty'));
    }
};

export const changeBountyStatus = async (req: Request, res: Response) => {
    try {
        const { bountyId, bountyStatus } = req.body;

        if (!bountyId || !bountyStatus) {
            res.status(400).json(
                new ApiResponse(400, 'Bounty ID and status are required')
            );
        }

        await db.bounty.update({
            where: { id: String(bountyId) },
            data: {
                bountyStatus,
            },
        });

        res.status(200).json(
            new ApiResponse(200, 'Bounty status changed successfully')
        );
    } catch (error) {
        res.status(500).json(
            new ApiResponse(500, 'Error changing bounty status')
        );
    }
};
