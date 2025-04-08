import { lazy, Suspense } from "react";
const Home = lazy(() => import("./Home"));
const MapFinderLink = lazy(() => import("./MapFinderLink"));
const Search = lazy(() => import("./Search"));
const CreatePost = lazy(() => import("./CreatePost"));
const ProfileLink = lazy(() => import("./ProfileLink"));

const SidebarItems = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
      <MapFinderLink />
      <Search />
      <CreatePost />
      <ProfileLink />
    </Suspense>
  );
};

export default SidebarItems;
