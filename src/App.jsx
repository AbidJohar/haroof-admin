import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Authors from "./pages/Authors";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import Layout from "./components/DashboardContent";
import ContentPage from "./pages/ContentPage";
import ViewAuthors from "./pages/ViewAuthors";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="books" element={<Books />} />
          <Route path="books/:bookId" element={<ContentPage />} />
          <Route path="authors" element={<Authors />} />
          <Route path="sales" element={<Sales />} />
          <Route path="reports" element={<Reports />} />
          <Route path="/authors/:id" element={<ViewAuthors />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
