import { IRouter, Router } from 'express';
import {
    changeBountyStatus,
    createBounty,
    getAllBounties,
    getBountyById,
} from '../controllers/bounty.controller';

export const bountyRouter: IRouter = Router();

bountyRouter.route('').get(getAllBounties);

bountyRouter.route('').post(createBounty);

bountyRouter.route('/:bountyId').get(getBountyById);

bountyRouter.route('/status/:bountyId').put(changeBountyStatus);
