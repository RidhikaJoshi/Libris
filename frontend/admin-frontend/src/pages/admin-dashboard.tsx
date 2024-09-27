import { useState,useEffect } from "react"
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
import axios from 'axios'
import {bookInfer, transactionInfer} from '@ridhikajoshi/libris-common'
import { Label } from "@radix-ui/react-label"
import { format,parseISO, set} from 'date-fns';

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

enum Status {
  ISSUED = "ISSUED",
  RETURNED = "RETURNED",  
  LOST = "LOST",    
  TAKEN = "TAKEN"
}

export function AdminDashboard() {
  const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem('isUserLogged')=='true');
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [name,setName]=useState("");
  const [books,setBooks]=useState([]);
  const [transactions, setTransactions] = useState([]);

  const [bookTitle,setBookTitle]=useState("");
  const [bookAuthor,setBookAuthor]=useState("");
  const [desc,setDesc]=useState("");
  const [bookCategory,setBookCategory]=useState("FICTIONAL");
  const [bookTotalCopies,setBookTotalCopies]=useState("");
  const [bookAvailable,setBookAvailable]=useState("");
  const [bookPublication,setBookPublication]=useState("");
  const [bookName,setBookName]=useState("");
  const [file, setFile] = useState<File | undefined>(undefined);

  const [transactionStatus,setTransactionStatus]=useState("ISSUED");

  const [bookChanged,setBookChanged]=useState(false);
  const [transactionChanged,setTransactionChanged]=useState(false);
 

  useEffect(() => {
    const fetchBooksAndTransactions = async () => {
      try {
        const booksResponse = await axios.get('https://backend.libris.workers.dev/api/v1/admin/books');
        if (!booksResponse) {
          toast.error('Error occurred while fetching books!');
        } else {
          setBooks(booksResponse.data.data);
        }

        if (isSignedIn) {
          const transactionsResponse = await axios.get('https://backend.libris.workers.dev/api/v1/admin/transactions', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          if (transactionsResponse && transactionsResponse.data) {
            setTransactions(transactionsResponse.data.data);
          }
        }
      } catch (error) {
        toast.error('Error occurred while fetching data!');
      }
    };

    fetchBooksAndTransactions();
  }, [isSignedIn,bookChanged,transactionChanged]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try
    {
      const response=await axios.post('https://backend.libris.workers.dev/api/v1/admin/signin',
        {
          email:email,
          password:password
        }
      );
      if(!response)
      {
        toast.error('Invalid credentials');
      }
      localStorage.setItem('token',response.data.data);
      localStorage.setItem('isUserLogged','true');
      setIsSignedIn(true)
      toast.success("Signed in successfully!")
    }catch(error)
    {
      toast.error('Error occurred try again!');
    }
    setEmail("");
    setPassword("");
  }

  const handleSignUp = async(e: React.FormEvent) => {
    e.preventDefault();
    try{
      const response=await axios.post('https://backend.libris.workers.dev/api/v1/admin/signup',
        {
          email,password,
          fullName:name
        }
      );
      if(!response)
      {
        toast.error('Invalid credentials or user already exists');
      }
      localStorage.setItem('token',response.data.data);
      localStorage.setItem('isUserLogged','true');
      setIsSignedIn(true);
      toast.success("Signed up successfully!");

    }catch(error)
    {
      toast.error('Error occurred try again!');
    }
    setEmail("");
    setPassword("");
    setName("");
   
  }

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const formData = new FormData();
      formData.append('title', bookTitle);
      formData.append('author', bookAuthor);
      formData.append('description', desc);
      formData.append('category', bookCategory);
      formData.append('totalCopies', bookTotalCopies.toString());
      formData.append('available', bookAvailable.toString());
      formData.append('publication', bookPublication.toString());
      formData.append('image', file as Blob);
      const response=await axios.post('https://backend.libris.workers.dev/api/v1/admin/books',
        formData,
        {
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      console.log(response);
      setBookChanged(true);
      toast.success("Book added successfully!")
    }catch(error)
    {
      toast.error('Error occurred try again!');
    }
    setBookAuthor("");
    setBookTitle("");
    setBookAvailable("");
    setBookCategory("FICTIONAL");
    setBookPublication("");
    setBookTotalCopies("");
    setDesc("");
   
  }

  const handleEditBook = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log(bookTitle);
    console.log(bookAuthor);
    console.log(bookAvailable);
    console.log(bookCategory);
    console.log(bookPublication);
    console.log(bookTotalCopies);

    try{
      const bookId:any=await books.find((book:bookInfer)=>book.title==bookName);
      //console.log(bookId?.id);

      const response=await axios.put(`https://backend.libris.workers.dev/api/v1/admin/books/editDetails/${bookId.id}`,
        {
          title: bookTitle,
          author: bookAuthor,
          category: bookCategory,
          totalCopies: bookTotalCopies.toString(), // convert to string if required by the schema
          available: bookAvailable.toString(),     // convert to string if required by the schema
          publication: bookPublication.toString(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if(!response)
      {
        toast.error('Error occurred try again!');
      }
      console.log("backend respone is",response);
      setBookChanged(true);
      toast.success("Book updated successfully!");
    }catch(error)
    {
      toast.error('Error occurred try again!');
    }
    
  }

  const handleEditTransaction = (transactionId: string) => (e: React.FormEvent) => {
    e.preventDefault();
    try{
        console.log(transactionStatus);
        const response=axios.put(`https://backend.libris.workers.dev/api/v1/admin/return/${transactionId}`,
        {
          status: transactionStatus
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if(!response)
      {
        toast.error('Error occurred try again!');
      }
      else
      {
        console.log("backend respone is",response);
        setTransactionChanged(true);
        toast.success("Transaction updated successfully!")
        setTransactionStatus("ISSUED");
      }
    }
    catch(error)
    {
      toast.error('Error occurred try again!');
    }
   
    toast.success("Transaction updated successfully!")
  }
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBookCategory(event.target.value);
  };


   const handleSignOut=()=>
    {
      localStorage.removeItem('token');
      localStorage.removeItem('isUserLogged');
      setIsSignedIn(false);
      toast.success("Signed out successfully!");
    }


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      
      {/* Header */}
      <header className="bg-gray-800 py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-indigo-400 mr-2" />
            <span className="text-2xl font-bold text-indigo-400">Libris</span>
          </div>
          {!isSignedIn ? (
            <div className="flex space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className='text-black font-bold' variant="outline">Sign In</Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 text-white">
                  <DialogHeader>
                    <DialogTitle>Sign In</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <Input type="email" placeholder="Email" className="bg-gray-700 text-white" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <Input type="password" placeholder="Password" className="bg-gray-700 text-white" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <Button type="submit">Sign In</Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className='text-black font-bold' variant="outline">Sign Up</Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 text-white">
                  <DialogHeader>
                    <DialogTitle>Sign Up</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <Input type="text" placeholder="Name" className="bg-gray-700 text-white" value={name} onChange={(e)=>setName(e.target.value)}/>
                    <Input type="email" placeholder="Email" className="bg-gray-700 text-white" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <Input type="password" placeholder="Password" className="bg-gray-700 text-white" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <Button type="submit">Sign Up</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <Button className='text-black font-bold' variant="outline" onClick={handleSignOut}>Sign Out</Button>
          )}
        </div>
      </header> 

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="bg-gray-800 w-36 min-h-screen p-4 md:block hidden ">
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
                    {books.map((book:bookInfer,index) => 
                    (
                      <TableRow key={index}>
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
                              <Button className='text-black' variant="outline" size="sm" onClick={() => {
                              setBookTitle(book.title);
                              setBookAuthor(book.author);
                              setBookCategory(book.category);
                              setBookTotalCopies(book.totalCopies.toString());
                              setBookAvailable(book.available.toString());
                              setBookPublication(book.publication.toString());
                              setBookName(book.title);
                            }}><Edit className="h-4 w-4 mr-2 " /> Edit</Button>
                              </DialogTrigger>
                              <DialogContent className="bg-gray-800 text-white">
                              <DialogHeader>
                                <DialogTitle>Edit Book</DialogTitle>
                              </DialogHeader>
                              <form onSubmit={handleEditBook} className="space-y-2">
                                <Label htmlFor="title" >Title</Label>
                                <Input id="title" value={bookTitle} placeholder="Title" 
                                className="bg-gray-700 text-white"  onChange={(e)=>setBookTitle(e.target.value)}/>
                                
                                <Label htmlFor="author">Author</Label>
                                <Input id="author" value={bookAuthor} placeholder="Author" 
                                className="bg-gray-700 text-white"  onChange={(e)=> setBookAuthor(e.target.value)}/>
                                
                                <Label htmlFor="category">Category</Label>
                                <Select value={bookCategory}  disabled>
                                <SelectTrigger id="category" className="bg-gray-700 text-white">
                                <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                {Object.values(Category).map((category) => (
                                <SelectItem key={category} value={category}>{category}</SelectItem>
                                ))}
                                </SelectContent>
                                </Select>
                                
                                <Label htmlFor="totalCopies">Total Copies</Label>
                                <Input 
                                id="totalCopies" 
                                type="text" 
                                value={bookTotalCopies} 
                                placeholder="Total Copies" 
                                className="bg-gray-700 text-white" 
                                onChange={(e) => setBookTotalCopies((e.target.value))} 
                                />
                                
                                <Label htmlFor="available">Available</Label>
                                <Input 
                                id="available" 
                                type="text" 
                                value={bookAvailable} 
                                placeholder="Available" 
                                className="bg-gray-700 text-white" 
                                onChange={(e) => setBookAvailable((e.target.value))} 
                                />
                                
                                <Label htmlFor="publication">Publication Year</Label>
                                <Input 
                                id="publication" 
                                type="text" 
                                value={bookPublication} 
                                placeholder="Publication Year" 
                                className="bg-gray-700 text-white" 
                                onChange={(e) => setBookPublication((e.target.value))} 
                                />
                                
                                <Label htmlFor="image">Image URL</Label>
                                <Input 
                                id="image" 
                                defaultValue={book.image} 
                                placeholder="Image URL" 
                                className="bg-gray-700 text-white" 
                                disabled
                                />
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
                          <TableHead className="text-indigo-400">Fine</TableHead>
                          <TableHead className="text-indigo-400">Status</TableHead>
                          <TableHead className="text-indigo-400">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactions.map((transaction:transactionInfer) => {
                          // console.log(transaction);
                          return (
                          <TableRow key={transaction.id}>
                            <TableCell>{transaction.id}</TableCell>
                            <TableCell>{transaction.bookId}</TableCell>
                            <TableCell>{transaction.userId}</TableCell>
                            <TableCell>  {transaction.issueDate ? format(transaction.issueDate, 'yyyy-MM-dd') : 'Invalid Date'}</TableCell>
                            <TableCell>{transaction.returnDate ? format(transaction.returnDate, 'yyyy-MM-dd') : 'Invalid Date'}</TableCell>
                            <TableCell>{transaction.Fine}</TableCell>
                            <TableCell>{transaction.status}</TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="text-black"><Edit className="h-4 w-4 mr-2" /> Edit</Button>
                                </DialogTrigger>
                                <DialogContent className="bg-gray-800 text-white">
                                  <DialogHeader>
                                    <DialogTitle>Edit Transaction</DialogTitle>
                                  </DialogHeader>
                                  <form onSubmit={handleEditTransaction(transaction.id.toString())} className="space-y-4">
                                  <Select value={transactionStatus} onValueChange={setTransactionStatus}> 
                                    <SelectTrigger>{transactionStatus}</SelectTrigger>
                                    <SelectContent>
                                      {Object.values(Status).map((status) => (
                                        <SelectItem key={status} value={status}>
                                          {status}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                    
                                    <Button type="submit">Update Transaction</Button>
                                  </form>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        )})}
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
                {isSignedIn ? (
               
                <form onSubmit={handleAddBook} className="space-y-4">
                  <Input placeholder="Title" className="bg-gray-700 text-white" value={bookTitle} onChange={(e)=>setBookTitle(e.target.value)}/>
                  <Input placeholder="Author" className="bg-gray-700 text-white" value={bookAuthor} onChange={(e)=>setBookAuthor(e.target.value)}/>
                  <Textarea placeholder="Description" className="bg-gray-700 text-white" value={desc} onChange={(e)=>setDesc(e.target.value)}/>
                  <Select value={bookCategory} onValueChange={setBookCategory}>
                    <SelectTrigger>{bookCategory}</SelectTrigger>
                    <SelectContent>
                      {Object.values(Category).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input type="text" placeholder="Total Copies" className="bg-gray-700 text-white" value={bookTotalCopies} onChange={(e)=>setBookTotalCopies((e.target.value))} />
                  <Input type="text" placeholder="Available" className="bg-gray-700 text-white" value={bookAvailable} onChange={(e)=>setBookAvailable((e.target.value))}/>
                  <Input type="text" placeholder="Publication Year" className="bg-gray-700 text-white" value={bookPublication} onChange={(e) => setBookPublication((e.target.value))} />
                  <Input type="file" accept="image/*" placeholder="Image URL" className="bg-gray-700 text-white" onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setFile(e.target.files[0]);
                    }
                  }} />
                  <Button type="submit">Add Book</Button>
                </form>) : (
                  <div className="text-center py-8">
                    <p className="text-xl">Please login to add New Books.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}