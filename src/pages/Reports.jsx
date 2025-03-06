 
import React from 'react';
import { books } from '../assets/assets.js'; // Replace with actual path

const Reports = () => {
  // Calculate total books
  const totalBooks = books.length;

  // Calculate total readers
  const totalReaders = books.reduce((sum, book) => sum + book.readByUsers, 0);

  // Calculate total subscriptions
  const totalSubscriptions = books.reduce((sum, book) => sum + book.subscriptions.length, 0);

  // Calculate average rating per book and overall average
  const ratingsData = books
    .filter((book) => book.ratings.length > 0)
    .map((book) => {
      const avgRating = book.ratings.reduce((sum, r) => sum + r.rating, 0) / book.ratings.length;
      return { title: book.title, avgRating };
    });
  const overallAvgRating =
    ratingsData.length > 0
      ? (ratingsData.reduce((sum, data) => sum + data.avgRating, 0) / ratingsData.length).toFixed(1)
      : 'N/A';

  // Category breakdown
  const categoryBreakdown = books.reduce((acc, book) => {
    acc[book.category] = (acc[book.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reports Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Total Books</h2>
          <p className="text-2xl font-bold text-indigo-600">{totalBooks}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Total Readers</h2>
          <p className="text-2xl font-bold text-indigo-600">{totalReaders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Total Subscriptions</h2>
          <p className="text-2xl font-bold text-indigo-600">{totalSubscriptions}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Average Rating</h2>
          <p className="text-2xl font-bold text-indigo-600">{overallAvgRating}</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Books by Category</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Category</th>
                <th className="py-2 px-4 border-b text-left">Number of Books</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(categoryBreakdown).map(([category, count], index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{category}</td>
                  <td className="py-2 px-4 border-b">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;