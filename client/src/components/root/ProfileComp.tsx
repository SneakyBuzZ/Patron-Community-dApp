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
import { useState } from 'react';

const ProfileBadge = () => {
  const [profileEdit, setProfileEdit] = useState(false);
  return (
    <Dialog>
      {/** DROP DOWN */}
      {/** DROP DOWN */}
      {/** DROP DOWN */}
      <DropdownMenu>
        <DropdownMenuTrigger className="border-none outline-none">
          <img
            src="https://github.com/shadcn.png"
            alt="profile"
            className="rounded-full size-8 md:size-10 select-none pointer-events-none"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-neutral-900 border-stone-800 text-neutral-400 font-fira-code">
          <DropdownMenuLabel className="text-stone-300">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-stone-800" />

          <DropdownMenuItem className="hover:bg-neutral-800">
            <DialogTrigger>Profile</DialogTrigger>
          </DropdownMenuItem>

          <DropdownMenuItem className="hover:bg-neutral-800">Github</DropdownMenuItem>
          <DropdownMenuSeparator className="bg-stone-800" />
          <DropdownMenuItem className="hover:bg-neutral-800 text-rose-800">Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/** DIALOG */}
      {/** DIALOG */}
      {/** DIALOG */}
      <DialogContent className="bg-neutral-950 w-10/12 text-stone-400 border-stone-800 rounded-lg font-fira-code">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-audio-wide font-thin border-b border-b-stone-800 py-2">
            Your Profile
          </DialogTitle>
          <DialogDescription className="flex flex-col justify-center items-center py-8 gap-5">
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
                    className="self-end relative top-2 p-1.5 bg-stone-800 rounded-full"
                  >
                    <X size={14} color="#fff" />
                  </button>
                )}
                <Avatar className="size-20 mr-4">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>Profile</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col gap-3 mt-8">
                <div className="flex h-8 gap-2">
                  <Input className="h-full" value={'Kaushik'} />
                  <Button className="h-full text-xs">Change</Button>
                </div>
                <Input className="h-8" value={'23894374786218'} />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogTrigger>
          <Button className="w-32">Back</Button>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileBadge;
