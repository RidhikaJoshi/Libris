import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SigninPage } from "./pages/signin-page"
import { HomePage } from "./pages/home-page"
import { AboutPage } from "./pages/about-page"
import { SignupPage } from "./pages/signup-page"
import { CatalogPageComponent } from "./pages/catalog-page"
import Header from "./pages/header"
import Footer from "./pages/footer"


function App() {
 
  return (
    <>
     <BrowserRouter>
     <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} />
         <Route path="/signin" element={<SigninPage />} />
         <Route path="/signup" element={<SignupPage />} />
         <Route path='/about' element={<AboutPage/>}/>
         <Route path='/catalog' element={<CatalogPageComponent/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
