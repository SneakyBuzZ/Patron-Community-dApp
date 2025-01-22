import { useMutation } from '@tanstack/react-query';
import {
  addUserToDb,
  addUserToGroup,
  changeUserImage,
  changeUserName,
  createBounty,
  createGroup,
  createPost,
  displayImageOnPreview,
  generateGroupPreSignedUrl,
  generateGroupPreSignedUrls,
  generatePostPreSignedUrls,
  generatePresignedUrl,
  getAllGroups,
  getGroupById,
  getHasJoined,
  getPostsInGroup,
  getUrlFromS3ByName,
  getUserByAddress,
  getUserJoinedDate,
  UserToDbReturnType,
} from '@/lib/api';
import {
  ChangeUserImageType,
  ChangeUserNameType,
  CreateBountyType,
  createPostType,
  GroupType,
  PostType,
} from '@/lib/types';

// * AWS S3

export const useGeneratePresignedUrl = () => {
  return useMutation({
    mutationFn: (name: string) => generatePresignedUrl(name),
  });
};

export const useGetUrlFromS3 = () => {
  return useMutation({
    mutationFn: (name: string) => getUrlFromS3ByName(name),
  });
};

export const useDisplayImageOnPreview = () => {
  return useMutation({
    mutationFn: (file: File) => displayImageOnPreview(file),
  });
};

export const useGenerateGroupPreSignedUrls = () => {
  return useMutation({
    mutationFn: (groups: GroupType[]) => generateGroupPreSignedUrls(groups),
  });
};

export const useGeneratePostPreSignedUrls = () => {
  return useMutation({
    mutationFn: (posts: PostType[]) => generatePostPreSignedUrls(posts),
  });
};

export const useGenerateGroupPreSignedUrl = () => {
  return useMutation({
    mutationFn: (group: GroupType) => generateGroupPreSignedUrl(group),
  });
};

// * USER

export const useAddUserToDb = () => {
  return useMutation({
    mutationFn: (walletAddress: string) => addUserToDb(walletAddress),
  });
};

export const useGetUserByAddress = () => {
  return useMutation({
    mutationFn: (walletAddress: string): Promise<UserToDbReturnType | void> =>
      getUserByAddress(walletAddress),
  });
};

export const useChangeUserProfileImage = () => {
  return useMutation({
    mutationFn: (userObject: ChangeUserImageType) => changeUserImage(userObject),
  });
};

export const useChangeUserName = () => {
  return useMutation({
    mutationFn: (userObject: ChangeUserNameType) => changeUserName(userObject),
  });
};

// * GROUP QUERIES

export const useCreateGroup = () => {
  return useMutation({
    mutationFn: (formData: FormData) => createGroup(formData),
  });
};

export const useGetAllGroups = () => {
  return useMutation({
    mutationFn: () => getAllGroups(),
  });
};

export const useAddUserToGroup = () => {
  return useMutation({
    mutationFn: ({ groupId, walletAddress }: { groupId: string; walletAddress: string }) =>
      addUserToGroup({ groupId, walletAddress }),
  });
};

export const useGetGroupById = () => {
  return useMutation({
    mutationFn: (groupId: string) => getGroupById(groupId),
  });
};

export const useGetUserJoinedDate = () => {
  return useMutation({
    mutationFn: ({ walletAddress, groupId }: { walletAddress: string; groupId: string }) =>
      getUserJoinedDate({ walletAddress, groupId }),
  });
};

export const useGetHasUserJoined = () => {
  return useMutation({
    mutationFn: ({ walletAddress, groupId }: { walletAddress: string; groupId: string }) =>
      getHasJoined({ walletAddress, groupId }),
  });
};

// *POST

export const useCreatePost = () => {
  return useMutation({
    mutationFn: ({
      postImage,
      postTitle,
      postDescription,
      walletAddress,
      groupId,
      bountyType,
      bountyValue,
    }: createPostType) =>
      createPost({
        postImage,
        postTitle,
        postDescription,
        walletAddress,
        groupId,
        bountyType,
        bountyValue,
      }),
  });
};

export const useGetAllPostsInGroup = () => {
  return useMutation({
    mutationFn: (groupId: string) => getPostsInGroup(groupId),
  });
};

// *BOUNTY

export const useCreateBounty = () => {
  return useMutation({
    mutationFn: (bounty: CreateBountyType) => createBounty(bounty),
  });
};
