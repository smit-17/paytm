import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAlluser } from "../redux/actions/userAction";
import Navbar from "./Navbar";
import { Search } from "lucide-react"; 

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setsearch] = useState("");
  const { allUser } = useSelector((state) => state.userReducer);
  useEffect(() => {
    dispatch(getAlluser(search));
  }, [search]);

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-4">User List</h2>
        <div>
          <div className="flex items-center bg-white bg-opacity-10 backdrop-blur-md border border-gray-600 rounded-full px-4 py-2 shadow-md w-full max-w-md">
            <Search className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setsearch(e.target.value);
              }}
              className="bg-transparent text-black ml-2 outline-none w-full placeholder-gray-300"
            />
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          {allUser?.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center p-4 border-b last:border-none hover:bg-gray-100 transition"
            >
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <button
                onClick={() => {
                  navigate(`/payment/${user.id}`, {
                    state: {
                      name: user?.username,
                    },
                  });
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Transfer
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
