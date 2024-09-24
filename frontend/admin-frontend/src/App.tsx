import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AdminDashboard } from './pages/admin-dashboard'
import { SigninPage } from "./pages/signin-page"
import { SignupPage } from "./pages/signup-page"
function App() {
 
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
