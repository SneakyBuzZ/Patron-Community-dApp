import { Route, Routes } from 'react-router-dom';
import AuthLayout from '@/_auth/AuthLayout';
import RootLayout from '@/_root/RootLayout';
import Web3Auth from '@/_auth/pages/Web3Auth';
import LandingPage from '@/_public/pages/LandingPage';
import PublicLayout from '@/_public/PublicLayout';
import NotFoundPage from '@/_public/pages/NotFoundPage';
import HomePage from '@/_root/pages/HomePage';
import AllGroups from '@/_root/pages/AllGroups';
import CreateGroup from '@/_root/pages/CreateGroup';
import { QueryProvider } from '@/lib/query/QueryProvider';
import Profile from '@/_root/pages/Profile';
import { Toaster } from '@/components/ui/toaster';
import GroupPage from '@/_root/pages/GroupPage';
import CreatePost from '@/_root/pages/CreatePost';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import AllGames from './_root/pages/AllGames';

function App() {
  return (
    <>
      <QueryProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <section className="w-full min-h-screen flex flex-col justify-start items-center font-fira-code">
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<LandingPage />} />
              </Route>
              <Route element={<AuthLayout />}>
                <Route index path="/auth" element={<Web3Auth />} />
              </Route>
              <Route element={<RootLayout />}>
                <Route path="/all-groups" element={<AllGroups />} />
                <Route path="/create-group" element={<CreateGroup />} />
                <Route path={`/group/:slug`} element={<GroupPage />} />
                <Route path={`/:slug/create-post`} element={<CreatePost />} />
                <Route path={`/games`} element={<AllGames />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Toaster />
          </section>
        </ThemeProvider>
      </QueryProvider>
    </>
  );
}

export default App;
