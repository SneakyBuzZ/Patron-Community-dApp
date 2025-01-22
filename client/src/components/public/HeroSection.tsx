import BlurIn from '@/components/magicui/blur-in';
import NavBar from '@/components/shared/NavBar';
import Display from '@/components/public/Display';
import GradientBackground from '@/components/shared/GradientBackground';
import WalletOptions from '../auth/WalletOptions';
import { useAccount, useConnect } from 'wagmi';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  const { connectors, connectAsync } = useConnect();
  const account = useAccount();

  return (
    <div className="dark:bg-PATRON_BLACK z-10">
      <NavBar showAddress className="py-2" />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <GradientBackground className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#2afff8b5] to-[#c919ff70] opacity-40 dark:opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] custom-fade-in" />
        <div className="flex flex-col w-full my-5">
          <div className="flex flex-col justify-center items-center mb-4">
            <BlurIn duration={1} className="" word="BUILD YOUR COMMUNITIES" />
            <h3 className="text-5xl font-fira-code mx-auto text-neutral-600/70 dark:text-neutral-500 font-semibold">
              SHARE YOUR PASSIONS AND CONNECT
            </h3>
          </div>
          <p className="w-full mt-7 text-center text-sm sm:text-lg md:w-2/3 mx-auto text-neutral-500">
            It's a platform designed to foster meaningful connections and spark discussions within
            groups focused on shared passions.
          </p>
          {account.isConnected ? (
            <>
              <Button
                className="mx-auto mt-5 dark:bg-neutral-400 dark:text-neutral-900 bg-neutral-800 text-neutral-100"
                onClick={() => navigate('/home')}
              >
                Explore Community
              </Button>
            </>
          ) : (
            <>
              <WalletOptions
                label={'Connect Wallet'}
                connectors={connectors}
                connect={connectAsync}
              />
            </>
          )}
        </div>
      </div>
      <Display />
    </div>
  );
}
