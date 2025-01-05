import NavBar from '@/components/shared/NavBar';
import SidebarComp from '@/components/root/SideBarComp';
import { Navigate, Outlet } from 'react-router-dom';
import { useAccount } from 'wagmi';

const RootLayout = () => {
  const { isConnected } = useAccount();
  return (
    <>
      {isConnected ? (
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
