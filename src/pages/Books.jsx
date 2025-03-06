import React, { useEffect, useState } from 'react';
import { books } from '../assets/assets.js';
import { Link } from 'react-router-dom';

const Books = () => {
  // Simulate fetched books with a status field (pending/approved)
  const [bookList, setBookList] = useState([]);

 useEffect(()=>{
      setBookList(books)
 },[])

  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Books for Review</h1>
      {bookList.length === 0 ? (
        <p className="text-gray-500">No books pending review.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">S.No
                  
                </th>
                <th className="py-2 px-4 border-b text-left">Title</th>
                <th className="py-2 px-4 border-b text-left">Author</th>
                <th className="py-2 px-4 border-b text-left">Category</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookList.map((book) => (
                <tr key={book.id} className="hover:bg-gray-200">
                  <td className="py-2 px-4 border-b">{book.id}</td>
                  <Link to={`/books/${book.id}`}>
                  <td className="py-2 px-4 border-b text-blue-600 underline underline-offset-1">{book.title}</td>
                  </Link>
                  <td className="py-2 px-4 border-b">{book.author}</td>
                  <td className="py-2 px-4 border-b">{book.category}</td>
                  <td className="py-2 px-4 border-b">
                    <p
                      className={` ${book.id%2 === 0? 'bg-green-500': 'bg-red-500'}  w-fit text-white font-sm px-3 py-[3px] rounded-full transition-colors`}
                    >
                { book.id % 2 === 0? 'approved' : 'pending'}
                    </p>
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

export default Books;