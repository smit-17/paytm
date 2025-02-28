import React, { useEffect, useState } from "react";
import { getUserBalance } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authAction";

const Navbar = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state?.userReducer);
  console.log(account);

  useEffect(() => {
    dispatch(getUserBalance());
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white bg-opacity-10 backdrop-blur-md shadow-lg px-6 py-4 flex justify-between items-center border-b border-gray-700">
      {/* Left Section - Logo */}
      <h1 className="text-xl font-bold text-white">MyWallet</h1>

      {/* Middle Section - Balance */}
      <div className="text-white text-lg font-semibold bg-gray-800 bg-opacity-50 px-4 py-2 rounded-lg shadow-md">
        Balance:{" "}
        <span className="text-green-400">{`Rs.` + account ? account : 0}</span>
      </div>

      {/* Right Section - Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-white bg-gray-800 bg-opacity-50 px-4 py-2 rounded-lg hover:bg-opacity-70 transition"
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="w-8 h-8 rounded-full border border-gray-500"
          />
          <span>John Doe</span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden z-50">
            <a href="/profile" className="block px-4 py-2 hover:bg-gray-700">
              Profile
            </a>
            <a href="/settings" className="block px-4 py-2 hover:bg-gray-700">
              Settings
            </a>
            <button
              className="w-full text-left px-4 py-2 hover:bg-red-600"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
