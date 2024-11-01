import { createGroupSchema } from '@/lib/schema/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useCreateGroup } from '@/lib/query/query';
import { MoonLoader } from 'react-spinners';
import useWalletStore from '@/lib/zustand/WalletStore';
import { useToast } from '@/hooks/use-toast';
import GradientBackground from '@/components/shared/GradientBackground';
import { useTransferFunds } from '@/hooks/use-transfer-funds';
import { TransactionStatus } from '@/lib/enum';
import PreviewDrawer from '@/components/root/PreviewDrawer';
import { ImageDown, Settings, UserPen } from 'lucide-react';
import FlexRow from '@/components/ui/flex-row';
import FlexCol from '@/components/ui/flex-col';
import { Switch } from '@/components/ui/switch';

const CreateGroup = () => {
  const { toast } = useToast();
  const [cover, setCover] = useState<File | null>(null);
  const [_, setProfile] = useState<File | null>(null);
  const { contractMethod, status } = useTransferFunds();
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
  const [profilePreviewUrl, setprofilePreviewUrl] = useState<string | null>(null);

  const [allowAnyone, setAllowAnyone] = useState(true);
  const [isCryptoGroup, setIsCryptoGroup] = useState(false);

  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');

  const handleCoverChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    image: 'cover' | 'profile'
  ) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (image === 'cover' && selectedFile) {
      setCover(selectedFile);
      setCoverPreviewUrl(URL.createObjectURL(selectedFile));
    } else if (image === 'profile' && selectedFile) {
      setProfile(selectedFile);
      setprofilePreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setCoverPreviewUrl(null);
      setprofilePreviewUrl(null);
    }
  };

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof createGroupSchema>>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      groupName: '',
      groupDescription: '',
    },
  });

  const { mutateAsync: createGroup, isPending: isCreating } = useCreateGroup();
  const { walletAddress } = useWalletStore();

  async function onSubmit(values: z.infer<typeof createGroupSchema>) {
    const transactionStatus = await contractMethod('0.01');

    if (transactionStatus === TransactionStatus.Failed) {
      toast({ title: 'Transaction failed' });
      return;
    }

    const coverImage = cover?.name;

    const response = await createGroup({
      groupName: values.groupName,
      groupDescription: values.groupDescription,
      groupCoverImage: coverImage || '',
      walletAddress: walletAddress?.toString() || '',
    });

    if (response?.status === 200) {
      navigate('/all-groups');
      toast({ title: 'Group created successfully' });
    } else {
      toast({ title: 'Failed to create group' });
    }
  }

  return (
    <section className="w-full min-h-screen border-l">
      <GradientBackground className="opacity-5 relative aspect-[1155/678] w-[36.125rem] bg-gradient-to-tr from-[#9011ffd8] to-[#e9ff1f4d] sm:w-[72.1875rem] custom-fade-in" />
      <div className="w-full flex flex-row justify-center items-start">
        <div className="w-[62%] min-h-screen flex flex-col justify-start items-start border-r">
          <h1 className="text-xl w-full py-2 pt-3 px-7 font-audio-wide border-b dark:border-b-PATRON_BORDER_COLOR">
            Create your own channel
          </h1>
          <div className="flex flex-col justify-center items-center gap-5 py-10 px-7 w-full">
            <FlexRow className="w-full gap-3">
              <div className="w-full flex flex-col items-start gap-3">
                <Label htmlFor="picture">Your channel's coverpage</Label>
                <Input
                  onChange={(e) => handleCoverChange(e, 'cover')}
                  id="picture"
                  type="file"
                  className=""
                />
              </div>
              <div className="w-full flex flex-col items-start gap-3">
                <Label htmlFor="picture">Your channel's Profile</Label>
                <Input
                  onChange={(e) => handleCoverChange(e, 'profile')}
                  id="picture"
                  type="file"
                  className=""
                />
              </div>
            </FlexRow>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full md:pb-10">
                <FormField
                  control={form.control}
                  name="groupName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Community's Name</FormLabel>
                      <FormControl>
                        <Input
                          className="py-5"
                          placeholder="Unleash your creativity!"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setCommunityName(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormDescription className="text-neutral-600">
                        Craft a captivating name that reflects your group's essence.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="groupDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your channel's Story</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-36"
                          placeholder="Share your passion!"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setCommunityDescription(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormDescription className="text-neutral-600">
                        Describe your channel's purpose and what makes it special.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-start items-center gap-4 h-10">
                  <Button variant={'patron'} type="submit" className="text-purple-500">
                    {status === TransactionStatus.Sending ? (
                      <div className="flex gap-2">
                        <MoonLoader size={14} color="#fff" />
                        <span> Transaction Taking Place</span>
                      </div>
                    ) : isCreating ? (
                      <MoonLoader size={14} color="#fff" />
                    ) : (
                      'Create Your Community'
                    )}
                  </Button>
                  <PreviewDrawer className="text-PATRON_TEXT_WHITE_SECONDARY border h-full rounded-md p-2 px-3">
                    Get Preview
                  </PreviewDrawer>
                </div>
              </form>
            </Form>
          </div>
        </div>

        <FlexCol className="w-[38%] h-full">
          <FlexCol className="border-b w-full p-3 items-start">
            <FlexCol className="w-full items-start">
              {coverPreviewUrl !== null ? (
                <img
                  src={coverPreviewUrl}
                  alt="Cover Page"
                  className="h-32 w-full object-cover outline outline-1 outline-neutral-300 rounded-md"
                />
              ) : (
                <FlexCol className="h-32 w-full bg-neutral-300 dark:bg-PATRON_DARK_GRAY rounded-md gap-1">
                  <ImageDown size={40} color="#3e3e3e" />
                  {/* <h1 className="text-xs text-neutral-500 dark:text-PATRON_TEXT_WHITE_PRIMARY">
                    Choose a Cover Page
                  </h1> */}
                </FlexCol>
              )}
              {profilePreviewUrl !== null ? (
                <img
                  src={profilePreviewUrl}
                  alt="Cover Page"
                  className="h-24 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-full transform -translate-y-11 translate-x-5 object-cover outline outline-neutral-300"
                />
              ) : (
                <FlexCol className="h-24 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-full transform -translate-y-11 translate-x-5">
                  <UserPen size={40} color="#3e3e3e" />
                </FlexCol>
              )}
            </FlexCol>
            <FlexCol className="items-start gap-2 px-5 transform -translate-y-6">
              <h1 className="text-xl">{communityName || 'Community Name'}</h1>
              <p className="text-sm">{communityDescription || 'Community Description'}</p>
            </FlexCol>
          </FlexCol>

          <FlexCol className="items-start w-full p-3 gap-3 py-4">
            <FlexRow className="gap-1">
              <Settings size={15} />
              <h1 className="text-lg font-sans font-medium">Settings</h1>
            </FlexRow>

            <FlexRow className="w-full border rounded-md py-3">
              <FlexCol className="w-5/6 items-start">
                <h4 className="text-sm font-medium text-neutral-700 dark:text-PATRON_TEXT_WHITE_PRIMARY">
                  Public Access
                </h4>
                <span className="text-start text-xs w-4/5 text-neutral-500">
                  {allowAnyone
                    ? 'Anyone can join this community.'
                    : 'Only invited members can join this community.'}
                </span>
              </FlexCol>
              <Switch
                checked={allowAnyone}
                onCheckedChange={() => setAllowAnyone(!allowAnyone)}
                className=""
              />
            </FlexRow>

            <FlexRow className="w-full border rounded-md py-3">
              <FlexCol className="w-5/6 items-start">
                <h4 className="text-sm font-medium text-neutral-700 dark:text-PATRON_TEXT_WHITE_PRIMARY">
                  Crypto Group
                </h4>
                <span className="text-start text-xs w-4/5 text-neutral-500">
                  {isCryptoGroup
                    ? 'Members must pay in crypto to participate.'
                    : 'No crypto payments required for participation.'}
                </span>
              </FlexCol>
              <Switch
                checked={isCryptoGroup}
                onCheckedChange={() => setIsCryptoGroup(!isCryptoGroup)}
                className="ml-2"
              />
            </FlexRow>
            <span className="text-sm text-neutral-500">
              These settings can be changed later by the creator by paying{' '}
              <span className="text-neutral-600 font-semibold">0.05</span> Eth
            </span>
          </FlexCol>
        </FlexCol>
      </div>
    </section>
  );
};

export default CreateGroup;
