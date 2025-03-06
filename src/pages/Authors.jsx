import React from 'react';
import { books } from '../assets/assets';

const Authors = () => {
  
  // Extract unique authors and count their books
  const authorsMap = books.reduce((acc, book) => {
    const authorName = book.author;
    if (!acc[authorName]) {
      acc[authorName] = { name: authorName, bookCount: 0 };
    }
    acc[authorName].bookCount += 1;
    return acc;
  }, {});

  const authors = Object.values(authorsMap);

  // Placeholder function to handle viewing author books
  const handleViewBooks = (authorName) => {
    // In a real app, this could navigate to a page showing the author's books
    console.log(`Viewing books by ${authorName}`);
    // You could use React Router's useNavigate here to go to `/authors/:authorName`
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Authors Management</h1>
      {authors.length === 0 ? (
        <p className="text-gray-500">No authors found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Author Name</th>
                <th className="py-2 px-4 border-b text-left">pending</th>
                <th className="py-2 px-4 border-b text-left">Books Submitted</th>
                <th className="py-2 px-4 border-b text-left">Books rejected</th>
                <th className="py-2 px-4 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-1 px-4 border-b">{author.name}</td>
                  <td className="py-1 px-4 border-b">{author?.pending || 3} </td>
                  <td className="py-1 px-4 border-b">{author.bookCount}</td>
                  <td className="py-1 px-4 border-b">{author?.rejected || 2} </td>
                  <td className="py-1 px-4 border-b">
                    <button
                      onClick={() => handleViewBooks(author.name)}
                      className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition-colors"
                    >
                      View Books
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