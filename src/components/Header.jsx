// src/components/Header.jsx
export default function Header() {
    return (
      <main>
      <header className=" relative w-full shadow-md shadow-black/20 ">
        <div className="max-w-7xl mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold">Publishing Dashboard</h1>
          </div>
          <div className="flex items-center">
            <input
              type="search"
              placeholder="Search books..."
              className="px-3 py-1 border rounded-md mr-4"
            />
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-white">AH</span>
            </div>
          </div>
        </div>
      </header>
      </main>
    )
  }