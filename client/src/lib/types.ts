import { AbiItem } from 'web3';
import { BountyType, TransactionStatus } from '@/lib/enum';

export type ChangeUserImageType = {
  address: string;
  image: string;
};

export type ChangeUserNameType = {
  name: string;
  address: string;
};

export type GroupType = {
  groupCoverImage: string;
  groupDisplayImage: string;
  groupName: string;
  groupDescription: string;
  createdAt: string | Date;
  members: any[];
  id: string;
  hasJoined?: boolean | 'owner';
};

export type createPostType = {
  postImage: string;
  postTitle: string;
  postDescription: string;
  walletAddress: string;
  groupId: string;
  bountyValue?: number | null | undefined;
  bountyType?: BountyType | null | undefined;
};

export type PostType = {
  postImage: string;
  postDescription: string;
  postTitle: string;
  createdAt: Date;
  onwner: {
    name: string;
    image: string;
  };
  bounty: {
    bountyValue: number;
    bountyType: BountyType;
  } | null;
};

export type GradientBackgroundPropType = {
  className: string;
};

export type GetContractPropType = {
  contractABI: AbiItem[];
  contractAddress: string;
};

export type UseTransferFundsResult = {
  contractMethod: (amount: string | number) => Promise<TransactionStatus>;
  status: TransactionStatus;
  error?: string;
};

export type CreateBountyType = {
  bountyValue: number;
  bountyType: BountyType;
  bountyOwnerId: string;
  postId: string;
};
