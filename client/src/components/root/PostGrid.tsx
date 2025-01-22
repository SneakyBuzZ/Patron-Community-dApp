import { useEffect, useState } from 'react';
import { AspectRatio } from '../ui/aspect-ratio';
import { useGeneratePostPreSignedUrls, useGetAllPostsInGroup } from '@/lib/query/query';
import { useParams } from 'react-router-dom';
import { PostType } from '@/lib/types';
import { cn, convertDateToDDMMYYYY } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';
import FlexRow from '../ui/flex-row';
import ShinyButton from '@/components/magicui/shiny-button';
import { DropdownMenuSeparator } from '../ui/dropdown-menu';
import {
  Dialog,
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogTrigger,
} from '../motionui/dialog';
import { Label } from '../ui/label';
import FlexCol from '../ui/flex-col';
import { formatDistanceToNow } from 'date-fns';
import NumberTicker from '../ui/number-ticker';
import { Button } from '../ui/button';

const PostGrid = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const { mutateAsync: getPostsInGroup, isPending: isGettingPosts } = useGetAllPostsInGroup();
  const { mutateAsync: generatePostPreSignedUrls } = useGeneratePostPreSignedUrls();
  useEffect(() => {
    if (slug) {
      getPostsInGroup(slug).then((response) => {
        console.log('RESPONSE OKAY: ', response);
        generatePostPreSignedUrls(response).then((response) => {
          console.log('RESPONSE: ', response);
          setPosts(response);
        });
        // setPosts(response);
      });
    }
  }, []);
  return (
    <>
      {posts?.length === 0 && (
        <div className="w-full flex flex-col justify-center items-center p-5">
          <h4 className="text-xl font-changa font-semibold text-neutral-500 dark:text-PATRON_TEXT_WHITE_PRIMARY">
            Oops no one posted here
          </h4>
          <p className="text-md font-fira-code text-neutral-500 dark:text-PATRON_TEXT_WHITE_SECONDARY">
            Be the first one to post in this group
          </p>
        </div>
      )}
      <ul className="container grid grid-cols-1 mx-auto mt-3 text-center gap-y-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3 my-6">
        {isGettingPosts && (
          <>
            <Skeleton className="cursor-pointer flex rounded-lg bg-PATRON_DARK_GRAY flex-col items-center justify-start border border-PATRON_BORDER_COLOR">
              <Skeleton className="flex items-center w-full justify-start gap-3 my-3 px-2" />
            </Skeleton>
          </>
        )}

        {posts?.map((each) => (
          <li
            key={each.postTitle}
            className={
              'cursor-pointer flex rounded-lg bg-neutral-100 dark:bg-PATRON_DARK_GRAY flex-col items-center justify-start border border-neutral-300 dark:border-PATRON_BORDER_COLOR'
            }
          >
            <div className="flex items-center w-full justify-start gap-3 my-3 px-2">
              <FlexRow className="w-full justify-start gap-2">
                <Avatar>
                  <AvatarImage src={each.onwner.image} alt={each.onwner.name} />
                  <AvatarFallback>{each.onwner.name}</AvatarFallback>
                </Avatar>
                <FlexCol>
                  <h3 className="text-md font-changa font-semibold text-neutral-500 dark:text-PATRON_TEXT_WHITE_PRIMARY ">
                    {each.onwner.name}
                  </h3>
                  <span className="w-full text-xs text-start text-neutral-600 font-changa">
                    {formatDistanceToNow(each.createdAt, {
                      includeSeconds: true,
                    }).replace('about', '')}
                  </span>
                </FlexCol>
              </FlexRow>
              {each?.bounty && (
                <>
                  <Dialog
                    key={each.createdAt.toString()}
                    transition={{
                      type: 'spring',
                      bounce: 0.05,
                      duration: 0.25,
                    }}
                  >
                    <DialogTrigger>
                      <ShinyButton
                        textClassName="text-[10px]"
                        text={each.bounty.bountyValue.toString() + ' Eth'}
                      />
                    </DialogTrigger>
                    <DialogContainer>
                      <DialogContent
                        style={{
                          borderRadius: '10px',
                        }}
                        className={cn(
                          'pointer-events-auto relative flex h-auto flex-col overflow-hidden border bg-white dark:bg-PATRON_DARK_GRAY border-PATRON_BORDER_COLOR sm:w-[500px] font-fira-code'
                        )}
                      >
                        <h3 className="text-xl text-center font-changa font-semibold text-neutral-500 dark:text-PATRON_TEXT_WHITE_PRIMARY w-full p-3 border-b border-r-PATRON_BORDER_COLOR">
                          Bounty
                        </h3>
                        <FlexCol className="w-full py-7">
                          <img
                            src={'/bounty.png'}
                            alt="bounty"
                            className="h-60 w-60 object-contain rounded-lg mx-auto"
                          />
                          <div className="flex flex-col items-center justify-center text-lg p-3">
                            <Label className="text-xl text-center font-changa font-semibold text-neutral-500 dark:text-PATRON_TEXT_WHITE_PRIMARY w-full p-3">
                              Unleash Your Inner Bounty Hunter
                            </Label>
                            <span className="text-sm w-full text-center">
                              Claim the glory and seize the bounty. Become the ultimate bounty
                              hunter and earn your reward.
                            </span>
                          </div>
                          <div className="flex flex-col items-center justify-center p-3">
                            <Label className="text-lg text-PATRON_YELLOW">
                              {each.bounty?.bountyType}
                            </Label>
                            <p className="whitespace-pre-wrap text-5xl font-medium tracking-tighter text-black dark:text-white">
                              <NumberTicker value={each.bounty?.bountyValue} />
                              Eth
                            </p>

                            <Button className="bg-PATRON_TEXT_WHITE_PRIMARY mt-5">
                              Claim Bounty
                            </Button>
                          </div>
                        </FlexCol>
                      </DialogContent>
                      <DialogClose className="text-zinc-50" />
                    </DialogContainer>
                  </Dialog>
                </>
              )}
            </div>
            <AspectRatio ratio={16 / 9} className="w-full">
              <img
                src={
                  each.postImage ||
                  'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'
                }
                alt="hello"
                className="h-full w-full object-cover"
              />
            </AspectRatio>
            <div className="flex items-center justify-between w-full px-3">
              <h2 className=" w-full text-start text-xl font-changa font-medium py-2 mt-1 text-neutral-600 dark:text-PATRON_TEXT_WHITE_PRIMARY">
                {each.postTitle}
              </h2>
            </div>
            <DropdownMenuSeparator className="bg-neutral-300 dark:bg-PATRON_BORDER_COLOR w-full h-[0.5px]" />
            <p className="w-full text-xs text-neutral-600 dark:text-PATRON_TEXT_WHITE_SECONDARY/60 text-start p-2">
              {each.postDescription.split(' ').slice(0, 20).join(' ')}...
            </p>
            <DropdownMenuSeparator className="bg-neutral-300 dark:bg-PATRON_BORDER_COLOR h-[0.5px]" />
            <div className="w-full flex items-center p-3">
              <p className="text-xs text-neutral-600 dark:text-PATRON_TEXT_WHITE_SECONDARY/60 text-start py-2 w-full">
                {'Posted on '}
                {(() => convertDateToDDMMYYYY(each.createdAt))()}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="py-8" />
    </>
  );
};

export default PostGrid;
