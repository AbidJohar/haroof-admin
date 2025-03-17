import { 
  FaBook, 
  FaTachometerAlt, 
  FaUsers, 
  FaDollarSign, 
  FaChartBar,
  FaAngleLeft 
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ isOpen, toggleSidebar }) {
  const navbar = [
    { path: '/', name: 'Dashboard', Icon: FaTachometerAlt },
    { path: '/books', name: 'Books', Icon: FaBook },
    { path: '/sales', name: 'Sales', Icon: FaDollarSign },
    { path: '/authors', name: 'Authors', Icon: FaUsers },
    { path: '/reports', name: 'Reports', Icon: FaChartBar },
  ];

  return (
    <div
      className={`bg-[#013147] relative text-white h-full shadow-xl transition-all duration-500 ease-in-out ${
        isOpen ? 'w-52' : 'w-0' // Changed w-0 to w-12 to keep button visible
      }`}
    >
      {/* Sidebar Content */}
      <div
        className={`p-5 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Logo & Title */}
        <div className="flex items-center justify-center mb-8">
          <FaBook className="w-10 h-10 mr-2 text-indigo-300" />
          {isOpen && <h2 className="text-2xl font-bold">Book Dashboard</h2>}
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {navbar.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-sm  transition-colors ${
                  isActive ? 'bg-indigo-600  text-white pl-3 ' : 'hover:bg-gray-600'
                }`
              }
            >
              <item.Icon className="w-5 h-5 mr-3" />
              {isOpen && item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`absolute -right-6 top-1/2 transform -translate-y-1/2 bg-black/90 text-white w-6 h-12 rounded-r-full flex items-center justify-center shadow-md transition-transform`}
      >
        <FaAngleLeft
          className={`w-5 h-5 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
    </div>
  );
}