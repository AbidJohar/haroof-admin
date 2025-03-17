import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { books } from '../assets/assets.js';
import { FaThumbsUp, FaThumbsDown, FaUsers } from 'react-icons/fa'; // Added FaUsers

const ContentPage = () => {
  const { bookId } = useParams();
  console.log("id", bookId);

  const navigate = useNavigate();
  const book = books.find((b) => b.id === parseInt(bookId));
  console.log("books:", book);

  const [isApproved, setIsApproved] = useState(false);
  const [likes, setLikes] = useState(book?.ratings.rating || 0);
  const [dislikes, setDislikes] = useState(0);

  if (!book) {
    return <div className="p-6">Book not found!</div>;
  }

  const handleApprove = () => {
    setIsApproved(true);
    alert(`${book.title} has been approved!`);
    setTimeout(() => navigate('/books'), 200);
  };


  return (
    <div className="p-5 max-w-full text-start mx-auto">
      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-1">
          <FaUsers className='text-2xl'  /> 
          {book.readByUsers}
        </div>
        <div className="flex items-center gap-2">
          
            <FaThumbsUp /> {likes}
         
           
            <FaThumbsDown /> {dislikes}
         
        </div>
      </div>
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