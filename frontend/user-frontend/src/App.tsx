import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SigninPage } from "./pages/signin-page"
import { HomePage } from "./pages/home-page"

function App() {
 
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
         <Route path="/signin" element={<SigninPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
