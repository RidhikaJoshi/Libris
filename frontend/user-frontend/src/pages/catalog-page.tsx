import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {  Search, BookmarkIcon, Cone } from "lucide-react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { bookInfer } from '@ridhikajoshi/libris-common'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function CatalogPageComponent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allBooks, setAllBooks] = useState<bookInfer[]>([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get('https://backend.libris.workers.dev/api/v1/users/books');
        console.log(response.data.data);
        setAllBooks(response.data.data);
      } catch(error) {
        console.log(error);
        toast.error("Error fetching books");
      }
    }
    fetchAllBooks();
  }, []);

  const filteredBooks = allBooks.filter(book => 
    (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     book.author.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCategory === "All" || book.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">Explore Our Library</h1>

          {/* Search and Filter Section */}
          <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
            <div className="relative w-full sm:w-2/3">
              <Input
                type="text"
                placeholder="Search books or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg border border-indigo-700 bg-gray-800 text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-1/3 bg-gray-800 border-indigo-700 text-gray-100 py-2 sm:py-3">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-indigo-700 text-gray-100">
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="FICTIONAL">FICTIONAL</SelectItem>
                <SelectItem value="NON_FICTIONAL">NON_FICTIONAL</SelectItem>
                <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                <SelectItem value="HISTORY">HISTORY</SelectItem>
                <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                <SelectItem value="MATH">MATH</SelectItem>
                <SelectItem value="PHILOSOPHY">PHILOSOPHY</SelectItem>
                <SelectItem value="OTHER">OTHER</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {filteredBooks.map((book, index) => (
              <BookCard key={index} {...book} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

function BookCard({ title, author, description, category, totalCopies, available, publication, image }: bookInfer ) {
  const [isOpen, setIsOpen] = useState(false)
  const [books,setBooks]=useState([]);

  const handleIssue = async () => {
    try {
      const allBooks=await axios.get('https://backend.libris.workers.dev/api/v1/users/books');
      setBooks(allBooks.data.data);
      const book = allBooks.data.data.find((book: any) => book.title === title);
      if (book && book.id) {
        console.log(book.id);
      } else {
        console.log("Book or book ID not found");
      }
      const response = await axios.post(
        `https://backend.libris.workers.dev/api/v1/users/issue/${book.id}`,
        {},  // Empty object as the second parameter for request body
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if(response.status===200){
        toast.success(`Book "${title}" has been issued successfully!`);
        //console.log(response);
      }
    } catch (error) {
      toast.error("Error issuing book");
    }
    setIsOpen(false)
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 flex flex-col sm:flex-row">
      <div className="sm:w-1/3 p-4 flex items-center justify-center bg-gray-700">
        <img src={image} alt={title} className="w-32 h-48 object-cover rounded-md shadow-md" />
      </div>
      <div className="sm:w-2/3 p-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg sm:text-xl font-semibold text-indigo-400">{title}</h3>
            <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">{category}</span>
          </div>
          <p className="text-sm text-gray-300 mb-2">by {author}</p>
          <p className="text-xs text-gray-400 mb-2 line-clamp-2">{description}</p>
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Total: {totalCopies}</span>
            <span>Available: {available}</span>
          </div>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center">
              <BookmarkIcon className="w-4 h-4 mr-2" />
              Issue Book
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Confirm Book Issue</DialogTitle>
              <DialogDescription>
                Are you sure you want to issue "{title}" by {author}?
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleIssue}>Confirm Issue</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}