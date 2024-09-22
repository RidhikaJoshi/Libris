import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, Loader2, Lock, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SigninPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [testLoading,setTestLoading]=useState(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true);

    // console.log(email, password);

    try{
        const response=await axios.post('https://backend.libris.workers.dev/api/v1/users/signin',
          {
            email,
            password
          }
        )
        //console.log(response);
      localStorage.setItem('token', response.data.data);
      localStorage.setItem('isLoggedIn', 'true');
      toast.success('Signed in successfully');
      navigate('/');
    }catch(error)
    {
      console.log(error);
      toast.error('Invalid email or password');
      setIsLoading(false);
      setEmail('');
      setPassword('');
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }
  const handleTestUserLogin = async () => {
    setTestLoading(true);
    setEmail('test@gmail.com');
    setPassword('123456');
    try{
      const response=await axios.post('https://backend.libris.workers.dev/api/v1/users/signin',
        {
          email:'test@gmail.com',
          password:'123456'        }
      )
      //console.log(response);
    localStorage.setItem('token', response.data.data);
    localStorage.setItem('isLoggedIn', 'true');
    toast.success('Signed in successfully');
    navigate('/');
  }catch(error)
  {
    console.log(error);
    toast.error('Invalid email or password');
    setIsLoading(false);
    setEmail('');
    setPassword('');
    setTestLoading(false);
  }   
  setTimeout(() => {
    setTestLoading(false)
  }, 3000)
  }







  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
      <div className="flex flex-row items-center justify-start gap-0">
            <ArrowLeft  className="font-medium text-indigo-400 hover:text-indigo-300" />
            <Link to="/" className="font-medium text-indigo-400 hover:text-indigo-300 ">
              Back to Home Page
            </Link>
        </div>
        <div>
          <BookOpen className="mx-auto h-12 w-12 text-indigo-400" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Access the library management system
          </p>
        </div>
        <form className="mt-8 space-y-6 gap-4" onSubmit={onSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Label htmlFor="email-address" className="sr-only">
                Email address
              </Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-zinc-200 border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:border-zinc-800"
                placeholder="Email address"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-zinc-200 border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:border-zinc-800"
                placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-zinc-200 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-zinc-800"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              ) : (
                <Lock className="absolute left-0 inset-y-0 flex items-center pl-3 h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              )}
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
        <Button className="group relative w-full flex justify-center py-2 px-4 border border-zinc-200 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none  dark:border-zinc-800" onClick={handleTestUserLogin} disabled={testLoading}>{testLoading ? "Signing in..." : "Login as a Test user"}</Button>
        <p className="mt-2 text-center text-sm text-gray-400 ">
          Don't have an account? 
          <Link to="/signup" className="mx-2 font-medium text-indigo-400 hover:text-indigo-300">Sign Up
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  )
}