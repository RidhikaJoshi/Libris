import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SigninPage } from "./pages/signin-page"
import { HomePage } from "./pages/home-page"
import { SignupPage } from "./pages/signup-page"

function App() {
 
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
         <Route path="/signin" element={<SigninPage />} />
         <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
