import NavBar from '@/components/shared/NavBar';
import SidebarComp from '@/components/root/SideBarComp';
import { getItemWithExpiry } from '@/lib/localStorage';
import { Navigate, Outlet } from 'react-router-dom';

const RootLayout = () => {
  const localStorageAddress = getItemWithExpiry('walletAddress');
  return (
    <>
      {localStorageAddress ? (
        <>
          <div className="w-full h-screen overflow-auto scrollbar-hide">
            <NavBar showAddress />
            <div className="w-full h-[92%] flex justify-start items-start">
              <SidebarComp />
              <div
                className="w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide
               flex justify-center items-start border-l border-r-PATRON_BORDER_COLOR"
              >
                <Outlet />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RootLayout;
