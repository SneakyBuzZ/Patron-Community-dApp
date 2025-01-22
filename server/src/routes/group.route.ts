import { Router } from 'express';
import {
    createGroup,
    deletedGroup,
    editGroupDescription,
    editGroupName,
    getAllGroups,
    getGroupById,
} from '../controllers/group.controller';

import { upload } from '../utils/multer';

export const groupRouter: Router = Router();

groupRouter.route('/create-group').post(upload.array('images', 7), createGroup);

groupRouter.route('/delete-group/:groupId').delete(deletedGroup);

groupRouter.route('/edit-groupName').patch(editGroupName);

groupRouter
    .route('/edit-groupDescription/:groupId')
    .patch(editGroupDescription);

groupRouter.route('/get-allGroup').get(getAllGroups);

groupRouter.route('/get-group').get(getGroupById);
