import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AdminDashboard } from './pages/admin-dashboard'
function App() {
 
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
