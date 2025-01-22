// import { Button } from '@/components/ui/button';
// import { MoveRight } from 'lucide-react';
import BlurIn from '@/components/magicui/blur-in';
import NavBar from '@/components/shared/NavBar';
import Display from '@/components/public/Display';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Web3 from 'web3';
// import { getItemWithExpiry, setItemWithExpiry } from '@/lib/localStorage';
// import { useNavigate } from 'react-router-dom';
// import useWalletStore from '@/lib/zustand/WalletStore';
// import { hexlify } from 'ethers';
// import { useAddUserToDb, useGetUserByAddress } from '@/lib/query/query';
import GradientBackground from '@/components/shared/GradientBackground';
import WalletOptions from '../auth/WalletOptions';
import { useAccount, useConnect } from 'wagmi';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

// const serverUrl = import.meta.env.VITE_SERVER_URL;

// const ONE_DAY = 24 * 60 * 60 * 1000; // One day in milliseconds
// const ONE_WEEK = 7 * ONE_DAY; // One week in milliseconds

export default function HeroSection() {
  // const { toast } = useToast();
  // const [walletAddress, setWalletAddress] = useState<string>('');
  const navigate = useNavigate();
  // const { setWalletAddress: setGlobalWalletAddress } = useWalletStore();
  // const { mutateAsync: getUserByAddress } = useGetUserByAddress();
  // const [isUserNew, setIsUserNew] = useState(true);

  // useEffect(() => {
  //   const storedWalletAddress = getItemWithExpiry('walletAddress');
  //   if (storedWalletAddress) {
  //     setWalletAddress(storedWalletAddress);
  //     setGlobalWalletAddress(storedWalletAddress);
  //     getUserByAddress(storedWalletAddress)
  //       .then((response) => {
  //         if (response?.status === 204) {
  //           setIsUserNew(true);
  //         } else if (response?.status === 200) {
  //           setIsUserNew(false);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [walletAddress]);

  // const web3 = new Web3(window.ethereum);

  // const { mutateAsync: addUserToDb } = useAddUserToDb();

  // const signInWithEth = async () => {
  //   if (walletAddress && !isUserNew) {
  //     navigate('/all-groups');
  //     return;
  //   } else {
  //     if (window.ethereum) {
  //       await window.ethereum
  //         .request({ method: 'eth_requestAccounts' })
  //         .then((response) => {
  //           if (Array.isArray(response) && response.length > 0) {
  //             setWalletAddress(response[0]);
  //             setItemWithExpiry('walletAddress', response[0], ONE_DAY);
  //           }
  //         })
  //         .catch((error: any) => {
  //           console.error('Error requesting Ethereum accounts:', error);
  //         });
  //     }

  //     if (!localStorage.getItem('walletAddress')) {
  //       console.error('No wallet address found.');
  //       return;
  //     }

  //     //CREATING AND VERIFYING NOUNCE
  //     try {
  //       const { value } = JSON.parse(localStorage.getItem('walletAddress')!);

  //       const checkResponse = await axios.get(`${serverUrl}/nounce/check-walletAddress-exists`, {
  //         params: { walletAddress: value },
  //       });

  //       let nounce: String;

  //       if (!checkResponse.data.data.message) {
  //         const createResponse = await axios.get(`${serverUrl}/nounce/create-nounce`, {
  //           params: { walletAddress: value },
  //         });

  //         if (createResponse.data.data.nounce) {
  //           nounce = createResponse.data.data.nounce;
  //         }
  //       } else {
  //         const getResponse = await axios.get(`${serverUrl}/nounce/get-nounce`, {
  //           params: { walletAddress: value },
  //         });

  //         if (getResponse.data.data.nounce) {
  //           nounce = getResponse.data.data.nounce;
  //         }
  //       }

  //       if (typeof nounce! !== 'string') {
  //         console.error('Nonce is not a string:', nounce!);
  //         return;
  //       }

  //       const bytes = new TextEncoder().encode(nounce);

  //       const signedNounce = await web3.eth.personal.sign(hexlify(bytes), value, '');

  //       const verifiedResponse = await axios.get(`${serverUrl}/nounce/verify-nounce`, {
  //         params: { walletAddress: value, signedNounce },
  //       });

  //       if (verifiedResponse.data.data.message) {
  //         setGlobalWalletAddress(value);
  //         setWalletAddress(value);

  //         const userExists = await getUserByAddress(value);

  //         if (userExists && userExists.data === undefined) {
  //           const { data: newUser } = await addUserToDb(value);

  //           if (newUser) {
  //             toast({
  //               title: `Account successfully created`,
  //               description: `Account with name ${newUser.name} created successfully`,
  //               variant: 'default',
  //             });
  //           }
  //         } else {
  //           toast({
  //             title: `Welcome back!`,
  //             description: `Welcome back to Patron`,
  //             variant: 'default',
  //           });
  //         }

  //         navigate('/all-groups');
  //       } else {
  //         alert('SOMETHING WENT WRONG');
  //       }
  //     } catch (error) {
  //       alert('Server maynot be responding');
  //     }
  //   }
  // };

  const { connectors, connectAsync } = useConnect();
  const account = useAccount();

  return (
    <div className="dark:bg-PATRON_BLACK z-10">
      <NavBar showAddress className="py-2" />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <GradientBackground className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#2afff8b5] to-[#c919ff70] opacity-40 dark:opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] custom-fade-in" />
        <div className="flex flex-col w-full my-5">
          <BlurIn
            duration={1}
            className="text-4xl md:text-6xl lg:w-4/5 mx-auto font-fira-code w-full text-center font-bold bg-gradient-to-br from-neutral-500 to-neutral-700 dark:from-white dark:to-neutral-600 bg-clip-text text-transparent"
            word="BUILD YOUR COMMUNITIES, SHARE YOUR PASSIONS AND CONNECT"
          />
          <p className="w-full mt-7 text-center text-sm sm:text-xl sm:w-2/3 mx-auto">
            It's a platform designed to foster meaningful connections and spark discussions within
            groups focused on shared passions.
          </p>
          {/* <Button
            onClick={signInWithEth}
            className="cursor-pointer h-7 md:h-9 mt-4 md:mt-8 mx-auto text-black dark:text-neutral-800 bg-neutral-300"
          >
            {walletAddress && !isUserNew ? 'Make community' : 'Connect wallet'}

            <MoveRight className="h-4 ml-2" />
          </Button> */}
          {account.isConnected ? (
            <>
              <Button className="w-36 mx-auto mt-5" onClick={() => navigate('/all-groups')}>
                Explore
              </Button>
            </>
          ) : (
            <>
              <WalletOptions label={'Connect'} connectors={connectors} connect={connectAsync} />
            </>
          )}
        </div>
      </div>
      <Display />
    </div>
  );
}
