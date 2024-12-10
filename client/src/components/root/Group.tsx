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

interface GroupPropType {
  id: string;
  imgSrc: string;
  title: string;
  subtitle: string;
  description: string;
  link: string;
  members: number;
  hasJoined: boolean;
  handleJoin: (groupId: string) => Promise<void>;
}

export function Group({
  id,
  imgSrc,
  title,
  subtitle,
  description,
  link,
  members,
  hasJoined,
  handleJoin,
}: GroupPropType) {
  return (
    <Dialog
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
        <DialogImage src={imgSrc} alt={title} className="h-32 w-full object-cover" />
        <div className="flex flex-col flex-grow items-start justify-between p-2 py-3">
          <div className="flex flex-col justify-center items-start">
            <DialogTitle className="text-PATRON_BLACK dark:text-zinc-50">{title}</DialogTitle>
            <DialogSubtitle className="text-PATRON_TEXT_WHITE_SECONDARY dark:text-zinc-400 text-xs text-start">
              {subtitle.slice(0, subtitle.length / 4) + '....'}
            </DialogSubtitle>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="flex justify-start items-center gap-2">
              <Button variant={'outline'} className="flex items-center p-2 h-6 text-[10px]">
                {hasJoined ? 'Joined' : 'Join'}
              </Button>
              <Link to={link}>
                <ExternalLink size={16} />
              </Link>
            </div>
            <div className="text-sm text-neutral-600 dark:text-PATRON_TEXT_WHITE_SECONDARY/60 text-start px-2 flex justify-center items-center gap-1">
              <span>{members} </span>
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
            'pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px] font-fira-code'
          )}
        >
          <DialogImage src={imgSrc} alt={title} className="h-72 w-full object-cover" />
          <div className="flex flex-col items-start justify-center p-6 gap-3">
            <div className="flex items-center justify-between gap-2 w-full">
              <DialogTitle className="text-2xl text-zinc-950 dark:text-zinc-50 font-medium font-fira-code">
                {title.toUpperCase()}
              </DialogTitle>
              <div className="text-sm text-neutral-600 dark:text-PATRON_TEXT_WHITE_SECONDARY/60 text-start px-2 flex justify-center items-center gap-1">
                <span>{members} </span>
                <User size={14} />
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
              <p className="text-zinc-500 dark:text-zinc-500 text-sm">{description}</p>
            </DialogDescription>
            <div className="flex flex-col w-full gap-2 mt-3">
              <div className="flex items-center justify-start gap-2 h-8">
                <Button
                  onClick={() => handleJoin(id)}
                  className="h-full bg-PATRON_BORDER_COLOR hover:bg-PATRON_DARK_GRAY outline-none"
                >
                  {hasJoined ? 'Explore' : 'Join this channel'}
                </Button>
                {!hasJoined && (
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
