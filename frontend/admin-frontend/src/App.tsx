import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { SigninPage } from "./pages/signin-page"
import { SignupPage } from "./pages/signup-page"
function App() {
 
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
