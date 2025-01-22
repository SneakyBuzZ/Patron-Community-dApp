import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Config, Connector, CreateConnectorFn } from 'wagmi';
import { ConnectMutate } from 'wagmi/query';

interface WalletOptionsProps {
  label: String;
  connectors: readonly Connector<CreateConnectorFn>[];
  connect: ConnectMutate<Config, unknown>;
}

const WalletOptions = ({ label, connectors, connect }: WalletOptionsProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  async function handleConnect(connector: Connector<CreateConnectorFn>) {
    await connect({ connector });
    navigate('/home');

    toast({
      title: 'Wallet Connected',
      description: `You have successfully connected your ${connector.name} wallet.`,
    });
  }

  return (
    <Dialog>
      <DialogTrigger className="flex justify-center items-center cursor-pointer md:h-9 mt-4 md:mt-8 mx-auto text-smdark:text-neutral-600 bg-neutral-800 dark:bg-neutral-400 text-neutral-200 dark:text-neutral-800 rounded-md px-5">
        {label}
        <ArrowRight size={15} width={40} />
      </DialogTrigger>
      <DialogContent className="flex flex-col w-full justify-center items-center max-w-[26rem]">
        <DialogHeader className="flex flex-col w-full justify-center items-center">
          <div className="flex justify-start items-center gap-3 my-3 mb-8">
            <img
              src="/logo.svg"
              alt="logo"
              className="h-9 w-9 select-none pointer-events-none invert dark:invert-0"
            />
            <h3 className="font-audio-wide text-4xl dark:text-white text-neutral-800">Patron</h3>
          </div>
          <DialogTitle className="text-2xl text-neutral-700">Connect Wallet</DialogTitle>
          <DialogDescription className="w-full text-center text-neutral-500">
            Connect your wallet to Patron to get started. Patron supports multiple wallets.
          </DialogDescription>
        </DialogHeader>
        <ul className="w-full flex flex-col gap-1 justify-center items-center mt-6">
          {connectors.map((each) => (
            <li
              key={each.uid}
              onClick={async () => await handleConnect(each)}
              className={`w-full cursor-pointer p-3 rounded-md border border-neutral-300 dark:border-PATRON_BORDER_COLOR flex justify-between items-center gap-3 ${each.name === 'Injected' ? 'hidden' : ''} dark:bg-neutral-800/30`}
            >
              <div className="flex justify-start items-center gap-2">
                <img
                  src={each.icon}
                  alt={each.name}
                  className={`h-9 w-9 rounded-md ${each.name === 'MetaMask' ? 'bg-white h-8 w-8 p-1 px-2' : ''}`}
                />
                <h4 className="text-md text-neutral-400">{each.name}</h4>
              </div>
              <h4 className="text-sm text-neutral-600">Detected</h4>
            </li>
          ))}
        </ul>
        <p className="w-full flex justify-start items-center my-5 text-neutral-500 text-xs text-center">
          By connecting a wallet, you agree to Uniswap Labs’ Terms of Service and consent to its
          Privacy Policy.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default WalletOptions;
