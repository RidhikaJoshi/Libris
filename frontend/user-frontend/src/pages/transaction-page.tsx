import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { format} from 'date-fns';
import { transactionInfer} from '@ridhikajoshi/libris-common'


export function TransactionPage() {
  const [transactions, setTransactions] = useState<transactionInfer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>
    {
      window.scrollTo({
        top: 0
      });
    }, []);

  // Check if the user is authenticated
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setIsAuthenticated(true);
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("https://backend.libris.workers.dev/api/v1/users/transactions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response);
        setTransactions(response.data.data);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching transactions");
      }
    };

    // Only fetch transactions if the user is authenticated
    if (isAuthenticated) {
      fetchTransactions();
    }
  }, [isAuthenticated]);

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.bookId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If user is not authenticated, this block will be skipped due to navigation

  return isAuthenticated ? (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
          Transaction History
        </h2>

        {/* Search Bar */}
        <div className="mb-6 max-w-md mx-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by Book ID or Transaction ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-200 border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-zinc-800"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-indigo-400">Transaction ID</TableHead>
                <TableHead className="text-indigo-400">Book Name</TableHead>
                <TableHead className="text-indigo-400">Issue Date</TableHead>
                <TableHead className="text-indigo-400">Return Date</TableHead>
                <TableHead className="text-indigo-400">Fine</TableHead>
                <TableHead className="text-indigo-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction:transactionInfer) => (
                <TableRow key={transaction.id} className="hover:bg-gray-700 transition-colors duration-200">
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.bookName}</TableCell>
                  <TableCell>{transaction.Issue_date ? format((transaction.Issue_date), 'yyyy-MM-dd') : 'Invalid Date'}</TableCell>
                  <TableCell>{transaction.Return_date ? format(transaction.Return_date, 'yyyy-MM-dd') : 'Invalid Date'}</TableCell>
                  <TableCell>{transaction.Fine}</TableCell>
                  <TableCell>{transaction.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  ) : null; // Render nothing if not authenticated
}
