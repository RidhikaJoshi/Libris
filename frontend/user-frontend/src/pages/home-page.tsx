import { useState, useEffect } from "react"
import {  Search, BookMarked, Users, BarChart, Zap, Shield } from "lucide-react"
import { Link } from "react-router-dom"
import axios from "axios"
import { bookInfer } from '@ridhikajoshi/libris-common'


export function HomePage() {
  const [allBooks, setAllBooks] = useState<bookInfer[]>([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get('https://backend.libris.workers.dev/api/v1/users/books');
        console.log(response.data.data);
        setAllBooks(response.data.data);
      } catch(error) {
        console.log(error);
      }
    }
    fetchAllBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white mx-auto p-4">
     

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
            {allBooks.slice(0, 8).map((book,index) => (
              <Link to='/catalog'><BookCard
                key={index}
                title={book.title}
                author={book.author}
                imageUrl={book.image}
              /></Link>
            ))}
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
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 p-4 shadow-gray-700">
      <img src={imageUrl} alt={title} className="w-full h-60  mb-4" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 text-white">{title}</h3>
        <p className="text-sm text-gray-400">{author}</p>
      </div>
    </div>
  ) 
}