import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, Plus, Edit, Search, BarChart, Users, Settings } from "lucide-react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

enum Category {
  FICTIONAL = "FICTIONAL",
  NON_FICTIONAL = "NON_FICTIONAL",
  BIOGRAPHY = "BIOGRAPHY",
  HISTORY = "HISTORY",
  SCIENCE = "SCIENCE",
  MATH = "MATH",
  PHILOSOPHY = "PHILOSOPHY",
  OTHER = "OTHER"
}

export function AdminDashboard() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [books, setBooks] = useState([
    { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", category: Category.FICTIONAL, totalCopies: 10, available: 5, publication: 1960, image: "/placeholder.svg" },
    { id: 2, title: "1984", author: "George Orwell", category: Category.FICTIONAL, totalCopies: 15, available: 8, publication: 1949, image: "/placeholder.svg" },
  ])
  const [transactions, setTransactions] = useState([
    { id: 1, bookId: 1, userId: 101, issueDate: "2023-06-01", returnDate: "2023-06-15", status: "Returned" },
    { id: 2, bookId: 2, userId: 102, issueDate: "2023-06-05", returnDate: null, status: "Issued" },
  ])

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSignedIn(true)
    toast.success("Signed in successfully!")
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Signed up successfully!")
  }

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Book added successfully!")
  }

  const handleEditBook = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Book updated successfully!")
  }

  const handleEditTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Transaction updated successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      
      {/* Header */}
      <header className="bg-gray-800 py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-indigo-400 mr-2" />
            <span className="text-2xl font-bold text-indigo-400">LibraryPro Admin</span>
          </div>
          {!isSignedIn ? (
            <div className="flex space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Sign In</Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 text-white">
                  <DialogHeader>
                    <DialogTitle>Sign In</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <Input type="email" placeholder="Email" className="bg-gray-700 text-white" />
                    <Input type="password" placeholder="Password" className="bg-gray-700 text-white" />
                    <Button type="submit">Sign In</Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Sign Up</Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 text-white">
                  <DialogHeader>
                    <DialogTitle>Sign Up</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <Input type="text" placeholder="Name" className="bg-gray-700 text-white" />
                    <Input type="email" placeholder="Email" className="bg-gray-700 text-white" />
                    <Input type="password" placeholder="Password" className="bg-gray-700 text-white" />
                    <Button type="submit">Sign Up</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setIsSignedIn(false)}>Sign Out</Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="bg-gray-800 w-64 min-h-screen p-4">
          <nav>
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                  <BarChart className="h-5 w-5" />
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                  <BookOpen className="h-5 w-5" />
                  <span>Books</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                  <Users className="h-5 w-5" />
                  <span>Users</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">Admin Dashboard</h1>
          
          <Tabs defaultValue="books" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">
              <TabsTrigger value="books">Books</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="add-book">Add Book</TabsTrigger>
            </TabsList>
            <TabsContent value="books" className="mt-4">
              <div className="bg-gray-800 rounded-lg shadow-lg p-4">
                <h2 className="text-2xl font-bold mb-4">All Books</h2>
                <div className="mb-4">
                  <Input placeholder="Search books..." className="bg-gray-700 text-white" />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-indigo-400">ID</TableHead>
                      <TableHead className="text-indigo-400">Title</TableHead>
                      <TableHead className="text-indigo-400">Author</TableHead>
                      <TableHead className="text-indigo-400">Category</TableHead>
                      <TableHead className="text-indigo-400">Total Copies</TableHead>
                      <TableHead className="text-indigo-400">Available</TableHead>
                      <TableHead className="text-indigo-400">Publication Year</TableHead>
                      {isSignedIn && <TableHead className="text-indigo-400">Action</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {books.map((book) => (
                      <TableRow key={book.id}>
                        <TableCell>{book.id}</TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.category}</TableCell>
                        <TableCell>{book.totalCopies}</TableCell>
                        <TableCell>{book.available}</TableCell>
                        <TableCell>{book.publication}</TableCell>
                        {isSignedIn && (
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm"><Edit className="h-4 w-4 mr-2" /> Edit</Button>
                              </DialogTrigger>
                              <DialogContent className="bg-gray-800 text-white">
                                <DialogHeader>
                                  <DialogTitle>Edit Book</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleEditBook} className="space-y-4">
                                  <Input defaultValue={book.title} placeholder="Title" className="bg-gray-700 text-white" />
                                  <Input defaultValue={book.author} placeholder="Author" className="bg-gray-700 text-white" />
                                  <Select defaultValue={book.category}>
                                    <SelectTrigger className="bg-gray-700 text-white">
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Object.values(Category).map((category) => (
                                        <SelectItem key={category} value={category}>{category}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <Input type="number" defaultValue={book.totalCopies} placeholder="Total Copies" className="bg-gray-700 text-white" />
                                  <Input type="number" defaultValue={book.available} placeholder="Available" className="bg-gray-700 text-white" />
                                  <Input type="number" defaultValue={book.publication} placeholder="Publication Year" className="bg-gray-700 text-white" />
                                  <Input defaultValue={book.image} placeholder="Image URL" className="bg-gray-700 text-white" />
                                  <Button type="submit">Update Book</Button>
                                </form>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="transactions" className="mt-4">
              <div className="bg-gray-800 rounded-lg shadow-lg p-4">
                <h2 className="text-2xl font-bold mb-4">All Transactions</h2>
                {isSignedIn ? (
                  <>
                    <div className="mb-4">
                      <Input placeholder="Search transactions..." className="bg-gray-700 text-white" />
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-indigo-400">ID</TableHead>
                          <TableHead className="text-indigo-400">Book ID</TableHead>
                          <TableHead className="text-indigo-400">User ID</TableHead>
                          <TableHead className="text-indigo-400">Issue Date</TableHead>
                          <TableHead className="text-indigo-400">Return Date</TableHead>
                          <TableHead className="text-indigo-400">Status</TableHead>
                          <TableHead className="text-indigo-400">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{transaction.id}</TableCell>
                            <TableCell>{transaction.bookId}</TableCell>
                            <TableCell>{transaction.userId}</TableCell>
                            <TableCell>{transaction.issueDate}</TableCell>
                            <TableCell>{transaction.returnDate || "'Not returned'"}</TableCell>
                            <TableCell>{transaction.status}</TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm"><Edit className="h-4 w-4 mr-2" /> Edit</Button>
                                </DialogTrigger>
                                <DialogContent className="bg-gray-800 text-white">
                                  <DialogHeader>
                                    <DialogTitle>Edit Transaction</DialogTitle>
                                  </DialogHeader>
                                  <form onSubmit={handleEditTransaction} className="space-y-4">
                                    <Input defaultValue={transaction.returnDate || "''"} placeholder="Return Date" className="bg-gray-700 text-white" />
                                    <Input defaultValue={transaction.status} placeholder="Status" className="bg-gray-700 text-white" />
                                    <Button type="submit">Update Transaction</Button>
                                  </form>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-xl">Please login to see all transactions.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="add-book" className="mt-4">
              <div className="bg-gray-800 rounded-lg shadow-lg p-4">
                <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
                <form onSubmit={handleAddBook} className="space-y-4">
                  <Input placeholder="Title" className="bg-gray-700 text-white" />
                  <Input placeholder="Author" className="bg-gray-700 text-white" />
                  <Textarea placeholder="Description" className="bg-gray-700 text-white" />
                  <Select>
                    <SelectTrigger className="bg-gray-700 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(Category).map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input type="number" placeholder="Total Copies" className="bg-gray-700 text-white" />
                  <Input type="number" placeholder="Available" className="bg-gray-700 text-white" />
                  <Input type="number" placeholder="Publication Year" className="bg-gray-700 text-white" />
                  <Input placeholder="Image URL" className="bg-gray-700 text-white" />
                  <Button type="submit">Add Book</Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}