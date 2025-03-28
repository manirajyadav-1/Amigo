import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const AuthPage = lazy(() => import("./pages/AuthPage/AuthPage"));
const PageLayout = lazy(() => import("./Layouts/PageLayout/PageLayout"));
const ProfilePage = lazy(() => import("./components/ProfilePage/ProfilePage"));
const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"));
const MapFinder = lazy(() => import("./components/Sidebar/MapFinder"));

function App() {
  const [authUser] = useAuthState(auth);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageLayout>
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <LandingPage />} />
          <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to="/" />} />
          <Route path="/:username" element={<ProfilePage />} />
          <Route path="/mapfinder" element={<MapFinder />} />
        </Routes>
      </PageLayout>
    </Suspense>
  );
}

export default App;