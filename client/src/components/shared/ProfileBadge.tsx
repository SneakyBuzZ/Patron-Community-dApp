import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  useChangeUserName,
  useChangeUserProfileImage,
  useGetUserByAddress,
} from '@/lib/query/query';
import useWalletStore from '@/lib/zustand/WalletStore';
import AddressBadge from '@/components/shared/AddressBadge';
import { Skeleton } from '@/components/ui/skeleton';
import { AvatarList } from '@/lib/lists';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { MoonLoader } from 'react-spinners';
import { removeItem } from '@/lib/localStorage';
import { useNavigate } from 'react-router-dom';

type UserDbType = {
  address: string;
  name: string;
  createdAt: string | Date;
  image: string;
};

const ProfileBadge = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [profileEdit, setProfileEdit] = useState(false);
  const [nameEdit, setNameEdit] = useState(false);
  const [user, setUser] = useState<null | UserDbType>(null);
  const [isUserNew, setIsUserNew] = useState(true);
  const [currentProfile, setCurrentProfile] = useState<null | string>(null);
  const [name, setName] = useState<string>('');
  const [didNameChangeHappended, setDidNameChangeHappended] = useState(false);
  const [didImageChangeHappended, setDidImageChangeHappended] = useState(false);

  const { walletAddress } = useWalletStore();

  const { mutateAsync: getUserByAddress, isPending: isLoading } = useGetUserByAddress();

  useEffect(() => {
    getUserByAddress(String(walletAddress)).then((response) => {
      if (response?.status === 204) {
        setIsUserNew(true);
        toast({
          title: 'Are you new here ?',
          description: 'Connect wallet & explore our platform',
        });
        return;
      } else if (response?.status === 200) {
        setIsUserNew(false);
        if (response?.data) {
          setUser(response.data);
          setCurrentProfile(response.data.image || '');
          setName(response.data.name || '');
          setDidImageChangeHappended(false);
        }
      }
      // if (response.data?.name || response.data?.image) {
      //   setUser(response.data);
      //   setCurrentProfile(response.data.image || '');
      //   setName(response.data.name || '');
      //   setDidImageChangeHappended(false);
      //   setDidNameChangeHappended(false);
      // }
    });
  }, [setName, setCurrentProfile, didNameChangeHappended, didImageChangeHappended]);

  const { mutateAsync: changeUserImage, isPending: isImageChanging } = useChangeUserProfileImage();
  const { mutateAsync: changeUserName, isPending: isNameChanging } = useChangeUserName();

  const handleProfileChange = async () => {
    try {
      if (user?.image !== currentProfile && walletAddress && currentProfile) {
        const newProfileImage = await changeUserImage({
          address: String(walletAddress),
          image: currentProfile,
        });

        if (newProfileImage) {
          setUser({
            ...user,
            image: newProfileImage,
          } as UserDbType);

          setCurrentProfile(newProfileImage);
          setDidImageChangeHappended(true);

          toast({
            title: 'Image updated successfully',
          });
        } else {
          toast({
            title: 'Failed to change profile',
          });
        }
      }
    } catch (error) {
      console.error('Failed to update profile image', error);
    } finally {
      setProfileEdit(false);
    }
  };

  const handleNameChange = async () => {
    try {
      if (user?.name !== name && walletAddress && name) {
        const newProfileName = await changeUserName({
          address: String(walletAddress),
          name: String(name),
        });

        if (newProfileName) {
          setUser({
            ...user,
            name: newProfileName,
          } as UserDbType);

          setName(newProfileName);
          setDidNameChangeHappended(true);

          toast({
            title: 'Name updated successfully',
          });
        } else {
          toast({
            title: 'Failed to change profile',
          });
        }
      }
    } catch (error) {
      console.error('Failed to update profile image', error);
    } finally {
      setNameEdit(false);
    }
  };

  const handleLogout = async () => {
    const response = removeItem('walletAddress');

    if (response) {
      navigate('/');
      toast({
        title: 'Logged out successfully',
      });
    }
  };

  return (
    <Dialog>
      {/** DROP DOWN */}
      {/** DROP DOWN */}
      {/** DROP DOWN */}
      <DropdownMenu>
        <DropdownMenuTrigger className="border-none outline-none">
          {!isUserNew && (
            <img
              src={currentProfile || user?.image || 'https://github.com/shadcn.png'}
              alt="profile"
              className="rounded-full size-8 md:size-9"
            />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="dark:bg-neutral-900 dark:border-stone-800 dark:text-neutral-400 font-fira-code mr-10">
          <DropdownMenuLabel className="dark:text-stone-300">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="dark:bg-stone-800" />

          <DropdownMenuItem className="dark:hover:bg-transparent">
            <DialogTrigger className="dark:hover:text-white">Profile</DialogTrigger>
          </DropdownMenuItem>

          <DropdownMenuItem className="dark:hover:text-white">Github</DropdownMenuItem>
          <DropdownMenuSeparator className="dark:bg-stone-800" />
          <DropdownMenuItem
            className="hover:text-red-400 text-rose-700 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/** DIALOG */}
      {/** DIALOG */}
      {/** DIALOG */}
      <DialogContent className="dark:bg-neutral-950 w-10/12 text-neutral-600 dark:text-stone-400 border-stone-800 rounded-lg font-fira-code">
        <DialogHeader>
          <DialogTitle className="dark:text-white text-xl font-audio-wide font-thin border-b dark:border-b-stone-800 py-2">
            Your Profile
          </DialogTitle>
          <DialogDescription></DialogDescription>

          <div className="flex flex-col gap-5 items-center justify-center">
            {isLoading ? (
              <>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-[200px]" />
                    <Skeleton className="h-8 w-[250px]" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center gap-5">
                  <div className="flex flex-col">
                    {!profileEdit ? (
                      <button
                        onClick={() => setProfileEdit((prev) => !prev)}
                        className="self-end relative top-2 p-1.5 bg-stone-800 rounded-full"
                      >
                        <Pencil size={14} color="#fff" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setProfileEdit((prev) => !prev)}
                        className="self-end relative top-2 p-1.5 dark:bg-stone-800 rounded-full"
                      >
                        <X size={14} color="#fff" />
                      </button>
                    )}
                    <Avatar className="size-20 mr-4">
                      <AvatarImage
                        src={currentProfile || user?.image || 'https://github.com/shadcn.png'}
                      />
                      <AvatarFallback>Kaushik</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex flex-col gap-3 mt-8">
                    <div className="flex h-8 gap-2">
                      <Input
                        value={name}
                        onChange={(e) => {
                          if (nameEdit) {
                            setName(e.target.value);
                          }
                        }}
                      />
                      {!nameEdit ? (
                        <Button
                          className="h-8 text-xs"
                          onClick={() => setNameEdit((prev) => !prev)}
                        >
                          Edit
                        </Button>
                      ) : (
                        <Button className="h-8 text-xs" onClick={() => handleNameChange()}>
                          {isNameChanging ? <MoonLoader size={24} color={'#fff'} /> : 'Save'}
                        </Button>
                      )}
                    </div>
                    <AddressBadge
                      address={user?.address || ''}
                      from={15}
                      className="h-8 ml-0 border-none text-neutral-500"
                    />
                  </div>
                </div>
                {profileEdit && (
                  <div className="grid max-w-4xl lg:max-w-6xl grid-cols-4 mx-auto mt-8 text-center gap-y-4 sm:gap-x-8 sm:grid-cols-6 gap-4 animate-in">
                    {AvatarList.map((each) => (
                      <Avatar
                        key={each.id}
                        className={cn(
                          'h-12 w-12',
                          currentProfile === each.image
                            ? 'outline outline-neutral-300 shadow-lg shadow-neutral-700 p-[1px]'
                            : ''
                        )}
                        onClick={() => setCurrentProfile(each.image)}
                      >
                        <AvatarImage src={each.image} alt="@shadcn" className="rounded-full" />
                        <AvatarFallback>{each.name}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </DialogHeader>

        {!profileEdit ? (
          <DialogTrigger className="w-24 border border-neutral-600 mx-auto mt-10 mb-5 p-1 rounded-md text-sm">
            Back
          </DialogTrigger>
        ) : (
          <Button
            onClick={() => handleProfileChange()}
            className="w-24 border border-neutral-600 mx-auto mt-10 mb-5 p-1 rounded-md text-sm"
          >
            {isImageChanging ? (
              <>
                <MoonLoader size={24} color={'#fff'} />
              </>
            ) : (
              'Select'
            )}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileBadge;
