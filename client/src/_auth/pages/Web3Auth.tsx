'use client';
import { MagicCard } from '@/components/magicui/magic-card';
import useWalletStore from '@/lib/zustand/WalletStore';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const Web3Auth = () => {
  const navigate = useNavigate();
  const { setWalletAddress } = useWalletStore();
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request!({
          method: 'eth_requestAccounts',
        });

        if (Array.isArray(accounts) && accounts.length > 0) {
          const account = accounts[0];
          setWalletAddress(account);
          navigate('/explore');
          console.log('CLICKED');
        }
      }
    } catch (error) {
      alert('PLEASE INSTALL META MASK');
    }
  };
  return (
    <>
      <div className="border gap-5 flex flex-col justify-center items-center h-screen w-full">
        <div className="flex items-center justify-center gap-2">
          <img className="h-8 select-none pointer-events-none" src="/logo.svg" alt="logo" />
          <h1 className=" font-audio-wide text-white text-3xl">Patron</h1>
        </div>
        <MagicCard
          className="cursor-pointer border border-PATRON_BORDER_COLOR w-[16rem] h-[20rem] bg-PATRON_DARK_GRAY flex flex-col items-center justify-center shadow-2xl"
          gradientColor={'#131313'}
        >
          <div className="h-full flex flex-col justify-center items-center gap-8">
            <h1 className="text-PATRON_TEXT_WHITE_PRIMARY  text-lg font-fira-code">
              Connect your wallet
            </h1>
            <div className="flex gap-4 flex-wrap">
              <MagicCard
                className="cursor-pointer h-16 w-16 mx-auto border border-PATRON_BORDER_COLOR  bg-PATRON_LIGHT_GRAY flex-col items-center justify-center shadow-2xl"
                gradientColor={'#131313'}
              >
                <button onClick={connectWallet}>
                  <img
                    className="h-10 select-none pointer-events-none"
                    src="/meta-mask.svg"
                    alt="meta-mask"
                  />
                </button>
              </MagicCard>
              <MagicCard
                className="cursor-pointer h-16 w-16 mx-auto border border-PATRON_BORDER_COLOR  bg-PATRON_LIGHT_GRAY flex-col items-center justify-center shadow-2xl"
                gradientColor={'#131313'}
              >
                <button>
                  <img
                    className="h-12 select-none pointer-events-none"
                    src="/wallet-connect.svg"
                    alt="meta-mask"
                  />
                </button>
              </MagicCard>
            </div>
          </div>
        </MagicCard>
      </div>
    </>
  );
};

export default Web3Auth;
