import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScaleLoader } from "react-spinners";

const Dashboard = () => {
  const [topLikedBooks, setTopLikedBooks] = useState([]);
  const [topViewedBooks, setTopViewedBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [activeAuthors, setActiveAuthors] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const base_url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${base_url}/v1/books/admin/getallbooks`, {
          headers: {
            "x-admin-token": import.meta.env.VITE_ADMIN_SECRET,
          },
        });

        console.log("API Response:", response.data);

        if (response.data.success) {
          const books = response.data.books || [];

          // Calculate total books
          setTotalBooks(books.length);

          // Calculate active authors (unique author names)
          const uniqueAuthors = new Set(books.map((b) => b.author)).size;
          setActiveAuthors(uniqueAuthors);

          // Get top 5 liked books based on likes
          const likedBooks = books
            .sort((a, b) => (b.likes || 0) - (a.likes || 0))
            .slice(0, 5);

          console.log("Top Liked Books:", likedBooks);
          setTopLikedBooks(likedBooks);

          // Get top 5 most viewed books based on readByUsers
          const viewedBooks = books
            .sort((a, b) => (b.readByUsers || 0) - (a.readByUsers || 0))
            .slice(0, 5);

          console.log("Top Viewed Books:", viewedBooks);
          setTopViewedBooks(viewedBooks);
        } else {
          setError(response.data.message || "Failed to fetch dashboard data");
          console.log("API Error Message:", response.data.message);
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          "Failed to fetch dashboard data. Please try again.";
        setError(errorMessage);
        console.error("Error in Dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="w-[calc(100% - 13rem)] mx-auto py-6 px-8">
      {/* Loading State */}
      {loading && (
        <div className="w-full h-screen flex justify-center items-center">
          <ScaleLoader width={20} color="#013147" height={130} />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Dashboard Content */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-3 gap-5 mb-8">
            <div className="bg-white overflow-hidden shadow-black/30 shadow-md rounded-lg">
              <div className="px-4 py-5">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Books
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">
                  {totalBooks}
                </dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow-black/30 shadow-md rounded-lg">
              <div className="px-4 py-5">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Active Authors
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">
                  {activeAuthors}
                </dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow-black/30 shadow-md rounded-lg">
              <div className="px-4 py-5">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Monthly Sales
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">
                  Rs.0
                </dd>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {/* Top 5 Liked Books */}
            <div className="bg-white shadow-black/30 shadow-md rounded-lg p-5">
              <h3 className="text-lg font-medium mb-4">Top Liked Books</h3>
              <div className="space-y-4">
                {topLikedBooks.length > 0 ? (
                  topLikedBooks.map((book) => (
                    <div key={book.id} className="flex items-center">
                      <div className="h-16 w-12 bg-gray-500 rounded-lg overflow-hidden mr-4">
                        {book.coverImage ? (
                          <img
                            src={book.coverImage}
                            alt={book.title || "Cover"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">
                              No image
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{book.title || "Untitled"}</p>
                        <p className="text-sm text-gray-500">
                          <strong>Author:</strong> {book.author || "Unknown"}
                        </p>
                        <p className="text-sm text-gray-500"> • Likes:{" "}
                          {book.likes || 0}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No liked books available.
                  </p>
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
                        {book.coverImage ? (
                          <img
                            src={book.coverImage}
                            alt={book.title || "Cover"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">
                              No image
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{book.title || "Untitled"}</p>
                        <p className="text-sm text-gray-500">
                          <strong>Author:</strong> {book.author || "Unknown"} 
                        </p>
                        <p className="text-sm text-gray-500"> • Views:{" "}
                          {book.readByUsers || 0}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No viewed books available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;