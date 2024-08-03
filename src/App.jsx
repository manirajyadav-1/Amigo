import { Navigate, Route, Routes } from "react-router-dom"
import  HomePage  from "./pages/HomePage/HomePage"
import AuthPage from "./pages/AuthPage/AuthPage"
import PageLayout from "./Layouts/PageLayout/PageLayout"
import ProfilePage from "./components/ProfilePage/ProfilePage"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase/firebase"
import LandingPage from "./pages/LandingPage/LandingPage"

function App() {
  const [authUser] = useAuthState(auth);
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <LandingPage />}/>
        <Route path="/auth" element={!authUser ? <AuthPage/> : <Navigate to="/" />}/>
        <Route path="/:username" element={<ProfilePage />}/>
      </Routes>
    </PageLayout>
  )
}

export default App
