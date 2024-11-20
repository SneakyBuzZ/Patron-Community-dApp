import cuid from 'cuid';
import { Request, Response } from 'express';
import { db } from '../utils/db';
import { ApiResponse } from '../utils/ApiResponse';
import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import { getNounceByWalletAddress } from '../helpers/nounce.helper';

export const createNounce = async (req: Request, res: Response) => {
    const { walletAddress } = req.query;

    const nounce = cuid();

    try {
        await db.nounce.create({
            data: {
                walletAddress: String(walletAddress),
                nounce,
            },
        });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { nounce },
                    'Nounce generated successfully and added to database'
                )
            );
    } catch (error) {
        console.log(
            'GET WALLET ADDRESS : NOUNCE CONTROLLER : Failed to add nounce to db'
        );

        return res
            .status(500)
            .json(new ApiResponse(200, {}, 'Nounce generatation failed'));
    }
};

export const verifyNounce = async (req: Request, res: Response) => {
    const { walletAddress, signedNounce } = req.query;

    const nounce = await getNounceByWalletAddress(String(walletAddress));
    const hexNounce = bufferToHex(Buffer.from(String(nounce), 'utf-8'));

    const verifiedWalletAddress = recoverPersonalSignature({
        data: hexNounce,
        sig: String(signedNounce),
    });

    if (verifiedWalletAddress === String(walletAddress)) {
        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    message: true,
                },
                'Nounce verified successfully'
            )
        );
    } else {
        return res.status(400).json(
            new ApiResponse(
                400,
                {
                    message: false,
                },
                'Nounce verification failed'
            )
        );
    }
};

export const checkIfWalletAddressExists = async (
    req: Request,
    res: Response
) => {
    const { walletAddress } = req.query;

    try {
        const response = await db.nounce.findUnique({
            where: {
                walletAddress: String(walletAddress),
            },
        });

        if (response?.walletAddress === String(walletAddress)) {
            return res.status(200).json(
                new ApiResponse(
                    200,
                    {
                        message: true,
                    },
                    'Wallet address exists in database'
                )
            );
        } else {
            return res.status(200).json(
                new ApiResponse(
                    200,
                    {
                        message: false,
                    },
                    'Wallet address does not exist in database'
                )
            );
        }
    } catch (error) {
        console.log(
            'GET WALLET ADDRESS : NOUNCE CONTROLLER : Failed to check wallet address in db'
        );
    }
};

export const getNounceByWallet = async (req: Request, res: Response) => {
    const { walletAddress } = req.query;

    const nounce = await getNounceByWalletAddress(String(walletAddress));

    if (nounce) {
        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    nounce,
                },
                'Nounce retrieved successfully'
            )
        );
    } else {
        return res
            .status(404)
            .json(
                new ApiResponse(
                    404,
                    {},
                    'Nounce not found for the provided wallet address'
                )
            );
    }
};
