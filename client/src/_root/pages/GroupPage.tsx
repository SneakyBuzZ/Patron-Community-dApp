import PostGrid from '@/components/root/PostGrid';
import NavBar from '@/components/shared/NavBar';
import { Button } from '@/components/ui/button';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
// import { generatePreSignedUrls } from '@/lib/api';
import {
  useGenerateGroupPreSignedUrl,
  useGetGroupById,
  useGetUserJoinedDate,
} from '@/lib/query/query';
import { GroupType } from '@/lib/types';
import { convertDateToDDMMYYYY } from '@/lib/utils';
import useWalletStore from '@/lib/zustand/WalletStore';
import { CalendarDays, ChevronLeft, UserPlus, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const GroupPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [group, setGroup] = useState<GroupType | null>(null);
  const [joinedDate, setjoinedDate] = useState<string | null>(null);
  const { walletAddress } = useWalletStore();

  const { mutateAsync: getGroupById } = useGetGroupById();
  const { mutateAsync: getUserJoinedDate } = useGetUserJoinedDate();
  const { mutateAsync: generatePostPreSignedUrl, isPending: isSigningUrls } =
    useGenerateGroupPreSignedUrl();

  useEffect(() => {
    if (slug) {
      getGroupById(slug).then((response) => {
        if (response) {
          generatePostPreSignedUrl(response).then((response) => {
            setGroup(response);
          });
        }
        // setGroup(response);
      });

      if (walletAddress) {
        getUserJoinedDate({
          walletAddress: walletAddress.toString(),
          groupId: slug,
        }).then((response) => {
          console.log('RESPONSE JOINED DATA: ', response);
          setjoinedDate(convertDateToDDMMYYYY(response));
        });
      }
    }
  }, []);
  return (
    <section className="w-full h-full flex flex-col">
      <NavBar showAddress />
      <div className="container flex flex-col my-5 mt-8 gap-20">
        <div className="flex flex-col w-full h-24 sm:h-32 lg:h-40 mx-auto gap-3">
          <Link
            to={'/all-groups'}
            className="text-lg gap-2 flex items-center border-b border-b-neutral-300 dark:border-b-PATRON_BLACK  hover:border-b hover:border-b-PATRON_BORDER_COLOR w-24"
          >
            <ChevronLeft color="#808080" />
            Back
          </Link>
          {isSigningUrls ? (
            <Skeleton className="h-full w-full rounded-md object-cover" />
          ) : (
            <img
              src={
                group?.groupCoverImage ||
                'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'
              }
              alt="Photo by Drew Beamer"
              className="h-full w-full rounded-md object-cover"
            />
          )}
        </div>
        <div className="w-full flex flex-col justify-start">
          <h1 className="text-xl md:text-2xl font-bold font-changa text-neutral-500 dark:text-PATRON_TEXT_WHITE_PRIMARY">
            {group?.groupName?.toUpperCase()}
          </h1>
          <p className="text-xs text-neutral-400 dark:text-PATRON_TEXT_WHITE_SECONDARY/50 my-2">
            {group?.groupDescription}
          </p>
          <div className="flex items-center gap-3 w-full justify-between my-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <CalendarDays size={15} color="#808080" />
                <span className="mx-2 text-sm text-neutral-500 dark:text-PATRON_TEXT_WHITE_SECONDARY">
                  {group?.createdAt && (() => convertDateToDDMMYYYY(group?.createdAt))()}
                </span>
              </div>
              <div className="flex items-center">
                <Users size={15} color="#808080" />
                <span className="mx-2 text-sm text-neutral-500 dark:text-PATRON_TEXT_WHITE_SECONDARY">
                  {group?.members?.length || 0}
                  {group?.members?.length! > 1 ? ' members' : ' member'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <UserPlus size={15} color="#808080" />
              <span className=" text-sm text-neutral-500 dark:text-PATRON_TEXT_WHITE_SECONDARY">
                {' Joined this channel on ' + joinedDate}
              </span>
            </div>
          </div>
        </div>
      </div>
      <DropdownMenuSeparator className=" bg-neutral-300 dark:bg-PATRON_BORDER_COLOR" />
      <div className="container flex flex-col items-center my-6">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-changa font-semibold text-neutral-400 dark:text-PATRON_TEXT_WHITE_PRIMARY">
            Posts
          </h1>
          <Button
            onClick={() => {
              navigate(`/${slug}/create-post`);
            }}
            className="rounded-md w-24 bg-PATRON_GREEN hover:bg-PATRON_GREEN/60 text-black font-semibold"
          >
            Post
          </Button>
        </div>
      </div>
      <PostGrid />
    </section>
  );
};

export default GroupPage;
