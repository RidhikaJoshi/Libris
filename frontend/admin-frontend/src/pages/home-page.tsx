"'use client'"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BookOpen, Loader2, Lock, Search, BookMarked, Users, BarChart, Zap, Shield } from "lucide-react"

export function HomePage() {
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-indigo-400 mr-2" />
            <span className="text-2xl font-bold">LibraryPro</span>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Button variant="ghost" className="text-white hover:text-indigo-400">Features</Button>
            <Button variant="ghost" className="text-white hover:text-indigo-400">Books</Button>
            <Button variant="ghost" className="text-white hover:text-indigo-400">About</Button>
          </nav>
          <div className="flex space-x-2">
            {/* <AuthDialog type="signin" />
            <AuthDialog type="signup" /> */}
          </div>
        </div>
      </header>

      {/* Hero Section with Banner */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Library"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              Discover Your Next Great Read
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              Explore our vast collection and embark on countless literary adventures.
            </p>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
              Start Exploring
            </Button>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-10 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search for books, authors, or genres..."
                className="w-full py-3 pl-10 pr-4 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:bg-gray-600"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            Powerful Features of LibraryPro
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Search className="h-12 w-12 text-indigo-400" />}
              title="Smart Search"
              description="Find any book instantly with our AI-powered search engine."
            />
            <FeatureCard
              icon={<BookMarked className="h-12 w-12 text-purple-400" />}
              title="Digital Catalogs"
              description="Manage your entire collection with our intuitive digital system."
            />
            <FeatureCard
              icon={<Users className="h-12 w-12 text-indigo-400" />}
              title="User Insights"
              description="Gain valuable insights into user preferences and behaviors."
            />
            <FeatureCard
              icon={<BarChart className="h-12 w-12 text-purple-400" />}
              title="Advanced Analytics"
              description="Make data-driven decisions with our comprehensive analytics."
            />
            <FeatureCard
              icon={<Zap className="h-12 w-12 text-indigo-400" />}
              title="Automated Workflows"
              description="Streamline operations with our intelligent automation tools."
            />
            <FeatureCard
              icon={<Shield className="h-12 w-12 text-purple-400" />}
              title="Secure & Reliable"
              description="Rest easy with our state-of-the-art security measures."
            />
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            Featured Books
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <BookCard
              title="The Great Gatsby"
              author="F. Scott Fitzgerald"
              imageUrl="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
            />
            <BookCard
              title="To Kill a Mockingbird"
              author="Harper Lee"
              imageUrl="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
            />
            <BookCard
              title="1984"
              author="George Orwell"
              imageUrl="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
            />
            <BookCard
              title="Pride and Prejudice"
              author="Jane Austen"
              imageUrl="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-indigo-400">About Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Team</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-indigo-400">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">eBooks</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Webinars</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-indigo-400">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-indigo-400">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">&copy; 2023 LibraryPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 border border-zinc-200 border-gray-700 hover:border-indigo-500 dark:border-zinc-800">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center text-white">{title}</h3>
      <p className="text-gray-300 text-center">{description}</p>
    </div>
  )
}

function BookCard({ title, author, imageUrl }: { title: string, author: string, imageUrl: string }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 text-white">{title}</h3>
        <p className="text-sm text-gray-400">{author}</p>
      </div>
    </div>
  )
}

function AuthDialog({ type }: { type: "'signin'" | "'signup'" }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-none">
          {type === "'signin'" ? "'Sign In'" : "'Sign Up'"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white border border-zinc-200 border-gray-700 dark:border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            {type === "'signin'" ? "'Sign In'" : "'Create an Account'"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {type === "'signup'" && (
            <div>
              <Label htmlFor="name" className="text-gray-300">Name</Label>
              <Input id="name" className="bg-gray-700 text-white border-gray-600 focus:border-indigo-500" />
            </div>
          )}
          <div>
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input id="email" type="email" className="bg-gray-700 text-white border-gray-600 focus:border-indigo-500" />
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <Input id="password" type="password" className="bg-gray-700 text-white border-gray-600 focus:border-indigo-500" />
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105">
            {type === "'signin'" ? "'Sign In'" : "'Sign Up'"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}