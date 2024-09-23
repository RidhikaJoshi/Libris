import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Header(){
  
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsAuthenticated(localStorage.getItem('isLoggedIn') === 'true');
      }, []);
    
      const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate("/");
      };
    return (
        <>
     {/* Header */}
     <header className="bg-gray-800 py-4 sticky top-0 z-10">
     <div className="container mx-auto px-4 flex justify-between items-center">
       <Link to="/"><div className="flex items-center">
         <BookOpen className="h-8 w-8 text-indigo-400 mr-2" />
         <span className="text-2xl font-bold text-white ">Libris</span>
       </div></Link>
       <nav className="hidden md:flex space-x-4">
       <Link to="/"><Button variant="ghost" className="text-white hover:text-indigo-400">Home</Button></Link>
         <Link to="/catalog"><Button variant="ghost" className="text-white hover:text-indigo-400">Books</Button></Link>
         <Link to="/transaction"><Button variant="ghost" className="text-white hover:text-indigo-400">Transactions</Button></Link>
         <Link to="/about"><Button variant="ghost" className="text-white hover:text-indigo-400">About</Button></Link>
       </nav>
       <div className="flex space-x-2">
         {isAuthenticated ? (
           <Button 
             onClick={handleLogout}
             className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
           >
             Logout
           </Button>
         ) : (
           <>
             <Link to="/signin">
               <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
                 Sign In
               </Button>
             </Link>
             <Link to="/signup">
               <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
                 Sign Up
               </Button>
             </Link>
           </>
         )}
       </div>
     </div>
   </header>
   </>
    )
}