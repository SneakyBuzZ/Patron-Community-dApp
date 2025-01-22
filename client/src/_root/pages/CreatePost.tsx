import { Button } from '@/components/ui/button';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createPostSchema } from '@/lib/schema/schema';

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
import { useCreatePost } from '@/lib/query/query';
import useWalletStore from '@/lib/zustand/WalletStore';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import FlexCol from '@/components/ui/flex-col';
import FlexRow from '@/components/ui/flex-row';
import { ImageDown, Settings } from 'lucide-react';
import { uploadImageToS3 } from '@/lib/api';
import { MoonLoader } from 'react-spinners';
import { useTransferFunds } from '@/hooks/use-transfer-funds';
import { BountyType, TransactionStatus } from '@/lib/enum';

const CreatePost = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const { mutateAsync: createPost, isPaused: isCreating } = useCreatePost();
  const { walletAddress } = useWalletStore();
  const [bounty, setBounty] = useState<number | null>(null);
  const [setPostImageUrl, setsetPostImageUrl] = useState<string | null>(null);
  const { contractMethod, status } = useTransferFunds();

  const handlePostImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);

    if (selectedFile) {
      setsetPostImageUrl(URL.createObjectURL(selectedFile));
    } else {
      setsetPostImageUrl(null);
    }
  };

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      description: '',
      title: '',
    },
  });

  async function onSubmit(values: z.infer<typeof createPostSchema>) {
    if (bounty && bounty > 0) {
      const transactionStatus = await contractMethod(bounty);

      if (transactionStatus === TransactionStatus.Sending) {
        toast({ title: 'Transaction is processing...' });
        return;
      }

      if (transactionStatus === TransactionStatus.Failed) {
        toast({ title: 'Transaction failed' });
        return;
      }

      console.log('TRANSACTION STATUS: ', transactionStatus);
      if (transactionStatus === TransactionStatus.Confirmed && file && walletAddress && slug) {
        await uploadImageToS3(file);
        const response = await createPost({
          postImage: file?.name,
          postTitle: values.title,
          postDescription: values.description,
          walletAddress: walletAddress.toString(),
          groupId: slug,
          bountyType: BountyType.DESIGN,
          bountyValue: bounty,
        });

        if (Number(response) === 201) {
          toast({
            title: 'Post created with bounty successfully',
          });
          form.reset();

          setFile(null);
          navigate(`/group/${slug}`);
        } else {
          toast({
            title: 'Failed to create post with bounty',
          });
        }
      }

      return;
    }

    if (file && walletAddress && slug) {
      await uploadImageToS3(file);

      const response = await createPost({
        postImage: file?.name,
        postTitle: values.title,
        postDescription: values.description,
        walletAddress: walletAddress.toString(),
        groupId: slug,
      });

      if (Number(response) === 201) {
        toast({
          title: 'Post created successfully',
        });
        form.reset();

        setFile(null);
        navigate(`/group/${slug}`);
      } else {
        toast({
          title: 'Failed to create post',
        });
      }
    }
  }

  const handleBountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setBounty(Number(e.target.value));
    } else {
      setBounty(null);
    }
  };

  return (
    <div className="flex flex-col h-full items-start justify-start w-full">
      <div className="w-full px-7 py-2 border-b border-b-PATRON_BORDER_COLOR">
        <h1 className="text-2xl font-changa font-semibold ">Create Post</h1>
      </div>
      <FlexRow className="w-full items-start h-full">
        <FlexCol className="w-full py-5 gap-4">
          <div className="w-full flex flex-col items-start gap-3 px-7">
            <Label htmlFor="picture">Your channel's coverpage</Label>
            <Input onChange={handlePostImageChange} id="picture" type="file" className="" />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full px-7">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post's Title</FormLabel>
                    <FormControl>
                      <Input placeholder="title" className="" {...field} />
                    </FormControl>
                    <FormDescription>Share your ideas in the group</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post's Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="description..." className="min-h-40" {...field} />
                    </FormControl>
                    <FormDescription>Share your ideas in the group</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant={'patron'}
                type="submit"
                className="h-10 w-28 bg-neutral-600 dark:bg-neutral-200 text-white dark:text-black"
              >
                {status === TransactionStatus.Sending ? (
                  <MoonLoader size={14} color="#000" />
                ) : isCreating ? (
                  <MoonLoader size={14} color="#000" />
                ) : (
                  'Create Post'
                )}
              </Button>
            </form>
          </Form>

          <p className="text-sm w-full px-7 text-PATRON_TEXT_WHITE_SECONDARY">
            You can create a post in this group by uploading a picture and writing a description
          </p>
        </FlexCol>
        <FlexCol className="w-[45%] justify-start h-full border-l border-l-PATRON_BORDER_COLOR">
          <FlexCol className="border-b w-full p-5 items-start">
            {setPostImageUrl ? (
              <img
                src={setPostImageUrl}
                alt="post"
                className="w-full h-60 object-cover rounded-md"
              />
            ) : (
              <FlexCol className="h-60 w-full bg-neutral-300 dark:bg-PATRON_DARK_GRAY rounded-md gap-1">
                <ImageDown size={40} color="#3e3e3e" />
              </FlexCol>
            )}
          </FlexCol>

          <FlexCol className="items-start w-full p-3 gap-3 py-4">
            <FlexRow className="gap-1">
              <Settings size={15} />
              <h1 className="text-lg font-sans font-medium">Settings</h1>
            </FlexRow>

            <FlexCol className="items-start gap-1">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-PATRON_TEXT_WHITE_PRIMARY">
                Set Bounty
              </h4>
              <span className="text-start text-xs text-neutral-500">
                Set a bounty for this post to incentivize the creator
              </span>
              <FlexRow className="w-full gap-1 mt-1">
                <Input
                  value={bounty ? bounty : 0.0}
                  onChange={handleBountChange}
                  className="h-8 dark:bg-PATRON_LIGHT_GRAY border w-2/5"
                  type="number"
                  step="0.001"
                />
                <Button className="w-3/5 h-8" variant={'patron'}>
                  Set {bounty ? bounty + ' Eth' : ''}
                </Button>
              </FlexRow>
            </FlexCol>

            <span className="text-sm text-neutral-500">
              These settings can be changed later by the creator by paying{' '}
              <span className="text-neutral-600 font-semibold">0.05</span> Eth
            </span>
          </FlexCol>
        </FlexCol>
      </FlexRow>
    </div>
  );
};

export default CreatePost;
