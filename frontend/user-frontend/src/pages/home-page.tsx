import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {  Search, BookMarked, Users, BarChart, Zap, Shield } from "lucide-react"
import { Link } from "react-router-dom"

export function HomePage() {

  return (
    <div className="min-h-screen bg-gray-900 text-white">
     

      {/* Hero Section with Banner */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-2">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-white bg-gradient-to-r from-indigo-500 to-purple-600">
            Unlock Knowledge, Borrow Stories, Explore Worlds
            </h1>
            <p className="text-xl mb-8 text-gray-400">
              Explore our vast collection and embark on countless literary adventures.
            </p>
            <Link to="/catalog">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
                Start Exploring
              </Button>
            </Link>
          </div>
        </div>
        {/* Tilted lines */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-0 left-0 w-full h-64 bg-indigo-500 opacity-10 transform -skew-y-6"></div>
          <div className="absolute bottom-0 right-0 w-full h-64 bg-indigo-700 opacity-10 transform skew-y-6"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            Powerful Features of Libris
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Search className="h-12 w-12 text-indigo-400" />}
              title="Smart Search"
              description="Instantly find books with our optimized search capabilities."
            />
            <FeatureCard
              icon={<BookMarked className="h-12 w-12 text-purple-400" />}
              title="Digital Catalogs"
              description="Manage your entire collection with our intuitive digital system."
            />
            <FeatureCard
              icon={<Users className="h-12 w-12 text-indigo-400" />}
              title="User Tracking"
              description="Track borrowings, returns, and transactions in real-time."
            />
            <FeatureCard
              icon={<BarChart className="h-12 w-12 text-purple-400" />}
              title="Overdue Management"
              description="Automatically calculate fines for overdue books to ensure smooth operations."
            />
            <FeatureCard
              icon={<Zap className="h-12 w-12 text-indigo-400" />}
              title="Efficient Management"
              description="Seamlessly handle book availability and transactions."
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