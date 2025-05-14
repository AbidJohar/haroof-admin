import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ScaleLoader } from 'react-spinners';

const Books = () => {
  const [bookList, setBookList] = useState([]);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const base_url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoader(true);
        const response = await axios.get(`${base_url}/v1/books/admin/getallbooks`, {
          headers: {
            'x-admin-token': import.meta.env.VITE_ADMIN_SECRET,
          },
        });

        if (response.data.success) {
          setBookList(response.data.books || []);
        } else {
          setError(response.data.message || 'Failed to load books');
        }
        console.log(response.data.books);
        setError(null);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to load books. Please try again later.');
      } finally {
        setLoader(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="p-6">
      {loader && (
        <div className="w-full h-screen flex justify-center items-center">
          <ScaleLoader width={20} color="#013147" height={130} />
        </div>
      )}

      {!loader && (
        <>
          <h1 className="text-2xl font-bold mb-4">Books for Review</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {bookList.length === 0 && !error ? (
            <p className="text-gray-500">No books pending review.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 border-b text-left">S.No</th>
                    <th className="py-2 px-4 border-b text-left">Title</th>
                    <th className="py-2 px-4 border-b text-left">Author</th>
                    <th className="py-2 px-4 border-b text-left">Category</th>
                    <th className="py-2 px-4 border-b text-left">Readers</th>
                    <th className="py-2 px-4 border-b text-left">Likes</th>
                    <th className="py-2 px-4 border-b text-left">Dislikes</th>
                    <th className="py-2 px-4 border-b text-left">Comments</th>
                    <th className="py-2 px-4 border-b text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookList.map((book, index) => (
                     
                    <tr key={book.id || `book-${index}`} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{index + 1}</td>
                      <td className="py-2 px-4 border-b">
                        <Link
                          to={`/books/${book.id}`}
                          className="text-blue-600 underline underline-offset-1"
                        >
                          {book.title || 'Untitled'}
                        </Link>
                        {console.log(book.status)
                        }
                      </td>
                      <td className="py-2 px-4 border-b">{book.author || 'Unknown'}</td>
                      <td className="py-2 px-4 border-b">{book.category || 'N/A'}</td>
                      <td className="py-2 px-4 border-b">{book.readByUsers || 0}</td>
                      <td className="py-2 px-4 border-b">{book.likes || 0}</td>
                      <td className="py-2 px-4 border-b">{book.dislikes || 0}</td>
                      <td className="py-2 px-4 border-b">{book.comments || 0}</td>
                      <td className="py-2 px-4 border-b">
                        <span
                          className={`w-fit text-white text-sm px-3 py-[3px] rounded-full transition-colors ${
                            book.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        >
                          {book.status || 'pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Books;