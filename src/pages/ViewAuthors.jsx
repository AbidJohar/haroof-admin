import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const ViewAuthors = () => {
  const { state } = useLocation();
  const base_url = import.meta.env.VITE_BASE_URL;
  const [author] = useState(state?.author || null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log('Author from state:', state?.author);

  useEffect(() => {
    if (!author || !author.authorId) {
      setError('Author data or authorId not provided');
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${base_url}/v1/books/admin/get-books-byAuthorId/${encodeURIComponent(author.authorId)}`,
          { withCredentials: true }
        );

        if (response.data.success) {
          setBooks(response.data.books);
        } else {
          setError(response.data.message || 'Failed to fetch books');
        }
      } catch (err) {
        console.error('Fetch books error:', err.response?.data);
        setError(err.response?.data?.message || 'Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [author, base_url]);

  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!author) return <div className="p-6 text-gray-500">Author not found.</div>;

  return (
    <div className=" bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className=" mx-auto bg-white   p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Author Details</h1>

        {/* Author Profile */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <img
            src={author.writerProfileImage}
            alt={author.name}
            className="w-32 h-32 rounded-full object-cover border-2 border-teal-500"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{author.name}</h2>
            {author.user && (
              <p className="text-gray-600 mb-2">Username: {author.user.username}</p>
            )}
            <p className="text-gray-600 mb-2">{author.email}</p>
            <p className="text-gray-700 mb-4">{author.bio || 'No bio available.'}</p>
            <p className="text-gray-600">
              Location: {author.city || ''}, {author.state || ''}, {author.country || ''}
            </p>
          </div>
        </div>

        {/* Book Statistics */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Book Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-teal-100 p-4 rounded-md text-center">
              <p className="text-lg font-medium text-teal-800">Total Books Submitted</p>
              <p className="text-2xl font-bold text-teal-600">{author.bookCount || 0}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-md text-center">
              <p className="text-lg font-medium text-yellow-800">Pending Books</p>
              <p className="text-2xl font-bold text-yellow-600">{author.pending || 0}</p>
            </div>
            <div className="bg-red-100 p-4 rounded-md text-center">
              <p className="text-lg font-medium text-red-800">Rejected Books</p>
              <p className="text-2xl font-bold text-red-600">{author.rejected || 0}</p>
            </div>
          </div>
        </div>

        {/* Author's Books */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Books by {author.name}</h3>
          {loading && <p className="text-gray-500">Loading books...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {!loading && books.length === 0 ? (
            <p className="text-gray-500">No books found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <div key={book.id} className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h4 className="text-lg font-semibold text-gray-800">{book.title}</h4>
                  <p className="text-gray-600 mb-2">Category: {book.category}</p>
                  <p className="text-gray-600 mb-2">Status: {book.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAuthors;