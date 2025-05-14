import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ScaleLoader } from 'react-spinners';

const ContentPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const base_url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/v1/books/admin/get-content/${bookId}`, {
          headers: {
            'x-admin-token': import.meta.env.VITE_ADMIN_SECRET,
          },
        });

        if (response.data.success) {
          setBook(response.data.book);
          setContent(response.data.content || 'No content available');
        } else {
          setError(response.data.message || 'Failed to load book');
        }
      } catch (err) {
        console.error('Error fetching book:', err);
        setError('Failed to load book. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleApprove = async () => {
    try {
      const response = await axios.put(
        `${base_url}/v1/books/admin/approve/${bookId}`,
        {},
        {
          headers: {
            'x-admin-token': import.meta.env.VITE_ADMIN_SECRET,
          },
        }
      );

      if (response.data.success) {
        setBook({ ...book, status: 'approved', isPublished: true });
        alert(`${book.title} has been approved!`);
        setTimeout(() => navigate('/books'), 200);
      } else {
        setError(response.data.message || 'Failed to approve book');
      }
    } catch (err) {
      console.error('Error approving book:', err);
      setError('Failed to approve book. Please try again later.');
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.put(
        `${base_url}/v1/books/admin/reject/${bookId}`,
        {},
        {
          headers: {
            'x-admin-token': import.meta.env.VITE_ADMIN_SECRET,
          },
        }
      );

      if (response.data.success) {
        setBook({ ...book, status: 'rejected', isPublished: false });
        alert(`${book.title} has been rejected.`);
        setTimeout(() => navigate('/books'), 200);
      } else {
        setError(response.data.message || 'Failed to reject book');
      }
    } catch (err) {
      console.error('Error rejecting book:', err);
      setError('Failed to reject book. Please try again later.');
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <ScaleLoader width={20} color="#013147" height={130} />
      </div>
    );
  }

  if (error || !book) {
    return <div className="p-6">{error || 'Book not found!'}</div>;
  }

  return (
    <div className="p-5 max-w-full text-start mx-auto">
      <h1 className="text-xl font-bold mb-3">{book.title || 'Untitled'}</h1>
      <p className="text-lg space-y-1 mb-4 border-[2px] border-black/50 p-3 rounded-md">
        {content}
      </p>
      <div className="flex space-x-4">
        <button
          onClick={handleApprove}
          disabled={book.status === 'approved'}
          className={`flex items-center px-5 py-2 rounded-full font-sm text-white ${
            book.status === 'approved'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-700 transition-colors'
          }`}
        >
          {book.status === 'approved' ? 'Approved' : 'Approve'}
        </button>
        <button
          onClick={handleReject}
          disabled={book.status === 'rejected'}
          className={`flex items-center px-5 py-2 rounded-full font-sm text-white ${
            book.status === 'rejected'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-700 transition-colors'
          }`}
        >
          {book.status === 'rejected' ? 'Rejected' : 'Reject'}
        </button>
      </div>
    </div>
  );
};

export default ContentPage;