import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ScaleLoader } from 'react-spinners';

const Authors = () => {
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_BASE_URL;
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch authors from backend
  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${base_url}/v1/books/admin/get-all-writers`, {
          withCredentials: true, // Send admin token
        });

        if (response.data.success) {
          setAuthors(response.data.writers);
          console.log('Writers:', response.data.writers);
        } else {
          setError(response.data.message || 'Failed to fetch authors');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch authors');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, [base_url]);

  // Handle viewing author details
  const handleViewAuthor = (author) => {
    navigate(`/authors/${encodeURIComponent(author.name)}`, { state: { author } });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Authors Management</h1>

        {/* Loading State */}
      {loading && (
        <div className="w-full h-screen flex justify-center items-center">
          <ScaleLoader width={20} color="#013147" height={130} />
        </div>
      )}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && authors.length === 0 ? (
        <p className="text-gray-500">No authors found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Author Name</th>
                <th className="py-2 px-4 border-b text-left">Total Books Submitted</th>
                <th className="py-2 px-4 border-b text-left">Pending Books</th>
                <th className="py-2 px-4 border-b text-left">Rejected Books</th>
                <th className="py-2 px-4 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-1 px-4 border-b">{author.name}</td>
                  <td className="py-1 px-4 border-b">{author.bookCount || 0}</td>
                  <td className="py-1 px-4 border-b">{author.pending || 0}</td>
                  <td className="py-1 px-4 border-b">{author.rejected || 0}</td>
                  <td className="py-1 px-4 border-b">
                    <button
                      onClick={() => handleViewAuthor(author)}
                      className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition-colors"
                    >
                      View Author
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Authors;