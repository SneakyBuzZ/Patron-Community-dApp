import ProfileBadge from '@/components/shared/ProfileBadge';
import { getItemWithExpiry } from '@/lib/localStorage';
import { Link } from 'react-router-dom';
import AddressBadge from '@/components/shared/AddressBadge';
import { ToggleTheme } from '@/components/shared/ToggleTheme';
import { cn } from '@/lib/utils';

interface NavBarType {
  showAddress?: boolean;
  className?: string;
}

const NavBar = ({ showAddress = false, className }: NavBarType) => {
  const localStorageAddress = getItemWithExpiry('walletAddress');

  return (
    <nav
      className={cn(
        'flex glassmorphism sticky top-0 items-center justify-between w-full border-b border-neutral-300 dark:border-b-PATRON_BORDER_COLOR px-10 h-[8%]',
        className
      )}
    >
      <div className="flex justify-center items-center gap-2">
        <Link to={'/'} className="flex justify-start items-center gap-2">
          <img className="h-5 invert dark:invert-0" src="/logo.svg" alt="logo" />
          <h1 className="text-xl font-audio-wide text-black dark:text-white">Patron</h1>
        </Link>

        {localStorageAddress !== null && localStorageAddress?.length > 0 && showAddress && (
          <AddressBadge address={localStorageAddress} />
        )}
      </div>
      <div className="flex items-center gap-4">
        <ToggleTheme />
        {localStorageAddress !== null && localStorageAddress?.length > 0 && showAddress && (
          <ProfileBadge />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
