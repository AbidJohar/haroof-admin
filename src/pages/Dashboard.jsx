import React, { useEffect, useState } from 'react';
import { books } from '../assets/assets.js'; // Adjust the import path as needed

const Dashboard = () => {
  const [topRatedBooks, setTopRatedBooks] = useState([]);
  const [topViewedBooks, setTopViewedBooks] = useState([]);

  useEffect(() => {
    // Calculate top 5 rated books based on average rating
    const ratedBooks = books
      .map((book) => {
        const totalRatings = book.ratings.reduce((sum, r) => sum + r.rating, 0);
        const averageRating = book.ratings.length > 0 ? totalRatings / book.ratings.length : 0;
        return { ...book, averageRating };
      })
      .sort((a, b) => b.averageRating - a.averageRating) // Sort descending by rating
      .slice(0, 5); // Take top 5
    setTopRatedBooks(ratedBooks);

    // Get top 5 most viewed books based on readByUsers
    const viewedBooks = [...books]
      .sort((a, b) => b.readByUsers - a.readByUsers) // Sort descending by views
      .slice(0, 5); // Take top 5
    setTopViewedBooks(viewedBooks);
  }, []);

  return (
    <div className="w-[calc(100% - 13rem)] mx-auto py-6 px-8">
      <div className="grid grid-cols-4 gap-5 mb-8">
        <div className="bg-white overflow-hidden shadow-black/30 shadow-md rounded-lg">
          <div className="px-4 py-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Books</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">{books.length}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow-black/30 shadow-md rounded-lg">
          <div className="px-4 py-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Active Authors</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">
              {new Set(books.map((b) => b.author)).size}
            </dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow-black/30 shadow-md rounded-lg">
          <div className="px-4 py-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Monthly Sales</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">$24,567</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow-black/30 shadow-md rounded-lg">
          <div className="px-4 py-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Pending Reviews</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">23</dd>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Top 5 Rated Books */}
        <div className="bg-white shadow-black/30 shadow-md rounded-lg p-5">
          <h3 className="text-lg font-medium mb-4">Top Rated Books</h3>
          <div className="space-y-4">
            {topRatedBooks.length > 0 ? (
              topRatedBooks.map((book) => (
                <div key={book.id} className="flex items-center">
                  <div className="h-16 w-12 bg-gray-500 rounded-lg overflow-hidden mr-4">
                    <img src={book?.coverImage} alt="coverImage" />
                  </div>
                  <div>
                    <p className="font-medium">{book.title}</p>
                    <p className="text-sm text-gray-500">
                      {book.author} • Rating: {book.averageRating.toFixed(1)}/5
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No rated books available.</p>
            )}
          </div>
        </div>

        {/* Top 5 Most Viewed Books */}
        <div className="bg-white shadow-black/30 shadow-md rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Most Viewed Books</h3>
          <div className="space-y-4">
            {topViewedBooks.length > 0 ? (
              topViewedBooks.map((book) => (
                <div key={book.id} className="flex items-center">
                  <div className="h-16 w-12 bg-gray-500 rounded overflow-hidden mr-4">
                    <img src={book.coverImage} alt="coverImage" />
                  </div>
                  <div>
                    <p className="font-medium">{book.title}</p>
                    <p className="text-sm text-gray-500">
                      {book.author} • Views: {book.readByUsers}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No viewed books available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;