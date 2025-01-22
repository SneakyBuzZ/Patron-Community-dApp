import { Address } from 'ethereumjs-util';
import * as z from 'zod';

export const createPostSchema = z.object({
    description: z.string(),
    title: z.string(),
});

export const getPreSignedUrlToUploadSchema = z.object({
    fileName: z.string(),
    contentType: z.string(),
});

// user

export const addUserToDbSchema = z.object({
    address: z.string(),
});

export const retrieveUserByAddressToSchema = z.object({
    address: z.string(),
});

export const changeProfileImageSchema = z.object({
    address: z.string(),
    image: z.string(),
});
export const changeProfileNameSchema = z.object({
    address: z.string(),
    name: z.string(),
});

export const checkIfUserExistsToSchema = z.object({
    address: z.string(),
});

export const getUserIdByAddressToSchema = z.object({
    address: z.string(),
});

export const createPostToSchema = z.object({
    postImage: z.string(),
    postTitle: z.string(),
    postDescription: z.string(),
    ownerId: z.string(),
    groupId: z.string(),
});

export const togglePostSolvedToSchema = z.object({
    whoSolvedId: z.string(),
    postId: z.string(),
});

export const getAllPostsInGroupToSchema = z.object({
    groupId: z.string(),
});

export const getAllPostsOfUserToSchema = z.object({
    userId: z.string(),
    limit: z.number(),
    pageNo: z.number(),
});

export const getAllUnSolvedPostsInGroupToSchema = z.object({
    groupId: z.string(),
    limit: z.number(),
    pageNo: z.number(),
});

export const createNounceToSchema = z.object({
    walletAddress: z.string(),
});

export const verifyNounceToSchema = z.object({
    walletAddress: z.string(),
    signedNounce: z.string(),
});

export const checkIfWalletAddressExistsToSchema = z.object({
    walletAddress: z.string(),
});

export const getNounceByWalletToSchema = z.object({
    walletAddress: z.string(),
});

export const addUserToGroupToSchema = z.object({
    walletAddress: z.string(),
    groupId: z.string(),
});

export const removeUserFromGroupToSchema = z.object({
    userId: z.string(),
    groupId: z.string(),
});

export const getAllGroupUsersToSchema = z.object({
    limit: z.number(),
    pageNo: z.number(),
    groupId: z.string(),
});

export const getUserJoinedDateToSchema = z.object({
    userId: z.string(),
    groupId: z.string(),
});

export const createGroupToSchema = z.object({
    groupName: z.string(),
    groupDescription: z.string(),
    ownerId: z.string(),
    groupCoverImage: z.string(),
});

export const editGroupNameToSchema = z.object({
    groupName: z.string(),
    groupId: z.string(),
});
export const editGroupDescriptionToSchema = z.object({
    groupDescription: z.string(),
    groupId: z.string(),
});

export const deletedGroupToSchema = z.object({
    groupId: z.string(),
});

export const getGroupByIdToSchema = z.object({
    groupId: z.string(),
});

export const getPreSignedUrlFromBucketToSchema = z.object({
    fileName: z.string(),
});
