import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { books } from '../assets/assets.js';

const ContentPage = () => {
  const { bookId } = useParams(); // Get the book ID from the URL
  console.log("id", bookId);

  const navigate = useNavigate(); // For redirecting after approval
  const book = books.find((b) => b.id === parseInt(bookId)); // Find the book by ID
  console.log("books:", book);

  const [isApproved, setIsApproved] = useState(false); // Track approval status

  if (!book) {
    return <div className="p-6">Book not found!</div>;
  }

  const handleApprove = () => {
    
    setIsApproved(true);
    alert(`${book.title} has been approved!`);
    setTimeout(() => navigate('/books'), 200); // Redirect after 1 second
  };

  return (
    <div className="p-5 max-w-full text-start mx-auto">
      <h1 className="text-xl font-bold mb-3">{book.title}</h1>
      <p className="text-lg space-y-1 mb-4 border-[2px] border-black/50 p-3 rounded-md">
         {book.episodes[0]?.content || 'No content available'}
      </p>
      <button
        onClick={handleApprove}
        disabled={isApproved}
        className={`px-3 py-1 rounded-full font-sm text-white ${
          isApproved
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-700 transition-colors'
        }`}
      >
        {isApproved ? 'Approved' : 'Approve'}
      </button>
    </div>
  );
};

export default ContentPage;