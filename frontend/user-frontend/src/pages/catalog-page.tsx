import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Search } from "lucide-react"

export function CatalogPageComponent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Fantasy")

  const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fantasy", imageUrl: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fantasy", imageUrl: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 3, title: "1984", author: "George Orwell", category: "Fantasy", imageUrl: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", category: "Fantasy", imageUrl: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", category: "Fantasy", imageUrl: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 6, title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fantasy", imageUrl: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600" },
  ]

  const filteredBooks = books.filter(book => 
    (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     book.author.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCategory === "''" || book.category === selectedCategory)
  )

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">Books</h1>

          {/* Search and Filter Section */}
          <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-center">
            <div className="relative w-full md:w-2/3">
              <Input
                type="text"
                placeholder="Search books or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-indigo-700 bg-gray-800 text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-1/3 bg-gray-800 border-indigo-700 text-gray-100 py-3">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-indigo-700 text-gray-100">
                <SelectItem value="Classic">Classic</SelectItem>
                <SelectItem value="Fiction">Fiction</SelectItem>
                <SelectItem value="Science Fiction">Science Fiction</SelectItem>
                <SelectItem value="Romance">Romance</SelectItem>
                <SelectItem value="Fantasy">Fantasy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

function BookCard({ book }: { book: { id: number, title: string, author: string, category: string, imageUrl: string } }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 ">
      <div className="p-6 flex">
        <img src={book.imageUrl} alt={book.title} className="w-24 h-36 object-cover rounded mr-6" />
        <div className="flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-xl font-semibold text-indigo-400 mb-2">{book.title}</h3>
            <p className="text-sm text-gray-300 mb-2">{book.author}</p>
            <p className="text-xs text-indigo-300">{book.category}</p>
          </div>
          <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 px-4 rounded-md transition-colors duration-300">
            Issue Book
          </Button>
        </div>
      </div>
    </div>
  )
}