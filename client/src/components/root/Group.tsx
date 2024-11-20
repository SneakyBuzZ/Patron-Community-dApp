import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogImage,
  DialogSubtitle,
  DialogClose,
  DialogDescription,
  DialogContainer,
} from '@/components/motionui/dialog';
import { ExternalLink, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

import { cn } from '@/lib/utils';
import { useGeneratePresignedUrl } from '@/lib/query/query';
import { useEffect, useState } from 'react';
import FlexRow from '../ui/flex-row';

interface GroupPropType {
  groupSubtitle: string;
  link: string;
  noOfMembers: number;
  handleJoin: (groupId: string) => Promise<void>;
  groupCoverImage: string;
  groupDisplayImage: string;
  groupName: string;
  groupDescription: string;
  createdAt: string | Date;
  members: any[];
  id: string;
  hasJoined?: boolean | 'owner';
}

export function Group({
  groupSubtitle,
  link,
  noOfMembers,
  handleJoin,
  groupCoverImage,
  groupDisplayImage,
  groupName,
  groupDescription,
  members,
  id,
  hasJoined,
}: GroupPropType) {
  const { mutateAsync: generatePresignedUrl } = useGeneratePresignedUrl();
  const [groupCoverImageUrl, setGroupCoverImageUrl] = useState('');
  const [groupDisplayImageUrl, setGroupDisplayImageUrl] = useState('');

  useEffect(() => {
    generatePresignedUrl(groupCoverImage).then((response) => {
      setGroupCoverImageUrl(response);
    });

    generatePresignedUrl(groupDisplayImage).then((response) => {
      setGroupDisplayImageUrl(response);
    });
  }, []);

  return (
    <Dialog
      key={id}
      transition={{
        type: 'spring',
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <DialogTrigger
        style={{
          borderRadius: '12px',
        }}
        className="flex flex-col overflow-hidden border border-zinc-950/10 bg-neutral-50/50 dark:border-zinc-50/10 dark:bg-PATRON_DARK_GRAY"
      >
        <DialogImage
          src={groupCoverImageUrl}
          alt={groupCoverImage}
          className="h-32 w-full object-cover"
        />
        <div className="flex flex-col flex-grow items-start justify-between p-2 py-3 gap-3">
          <FlexRow className="gap-3">
            <img
              src={groupDisplayImageUrl}
              alt={groupDisplayImage}
              className="h-16 w-16 rounded-full object-cover border-2 border-neutral-200 dark:border-PATRON_BORDER_COLOR"
            />
            <div className="flex flex-col justify-center items-start">
              <DialogTitle className="text-PATRON_BLACK dark:text-zinc-50 font-changa text-lg">
                {groupName.toUpperCase()}
              </DialogTitle>
              <DialogSubtitle className="text-PATRON_TEXT_WHITE_SECONDARY dark:text-zinc-400 text-xs text-start">
                {groupSubtitle.slice(0, groupSubtitle.length / 6) + '....'}
              </DialogSubtitle>
            </div>
          </FlexRow>
          <div className="flex justify-between items-center w-full">
            <div className="flex justify-start items-center gap-2">
              <Button variant={'outline'} className="flex items-center p-2 h-6 text-[10px]">
                {hasJoined === 'owner' ? 'Owner' : hasJoined ? 'Joined' : 'Join'}
              </Button>
              <Link to={link}>
                <ExternalLink size={16} />
              </Link>
            </div>
            <div className="text-sm text-neutral-600 dark:text-PATRON_TEXT_WHITE_SECONDARY/60 text-start px-2 flex justify-center items-center gap-1">
              <span>{noOfMembers === members.length && noOfMembers} </span>
              <User size={14} />
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContainer>
        <DialogContent
          style={{
            borderRadius: '24px',
          }}
          className={cn(
            'pointer-events-auto relative flex h-auto flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px] font-fira-code'
          )}
        >
          <DialogImage
            src={groupCoverImageUrl}
            alt={groupName}
            className="h-40 w-full object-cover"
          />
          <div className="flex flex-col items-start justify-center p-6 gap-3">
            <div className="flex w-full justify-start items-center gap-3">
              <img
                src={groupDisplayImageUrl}
                alt={groupDisplayImage}
                className="h-16 w-16 rounded-full"
              />
              <div className="flex flex-col items-start justify-center gap-1 w-full">
                <DialogTitle className="text-2xl text-zinc-950 dark:text-zinc-50 font-medium font-fira-code">
                  {groupName.toUpperCase()}
                </DialogTitle>
                <div className="text-sm text-neutral-600 dark:text-PATRON_TEXT_WHITE_SECONDARY/60 text-start flex justify-center items-center gap-1">
                  <span className="text-md">{noOfMembers} </span>
                  <User size={15} />
                </div>
              </div>
            </div>
            <DialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, scale: 0.8, y: 100 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.8, y: 100 },
              }}
            >
              <p className="text-zinc-500 dark:text-zinc-500 text-sm">
                {groupSubtitle.slice(0, groupDescription.length / 2) + '....'}
              </p>
            </DialogDescription>
            <div className="flex flex-col w-full gap-2 mt-3">
              <div className="flex items-center justify-start gap-2 h-8">
                <Button
                  onClick={() => handleJoin(id)}
                  className="h-full bg-PATRON_BORDER_COLOR hover:bg-PATRON_DARK_GRAY dark:bg-PATRON_TEXT_WHITE_PRIMARY hover:to-PATRON_TEXT_WHITE_SECONDARY outline-none"
                >
                  {hasJoined ? 'Explore' : 'Join this channel'}
                </Button>
                {hasJoined && (
                  <Link
                    to={`/group/${id}`}
                    className="h-full border rounded-md flex justify-center items-center text-sm px-3"
                  >
                    Visit
                  </Link>
                )}
              </div>
              <span className="text-xs w-2/3">
                {hasJoined
                  ? 'You have already joined this community, Click explore'
                  : 'Join this channel to have fun and post your thoughts'}
              </span>
            </div>
          </div>
          <DialogClose className="text-zinc-50" />
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
}
