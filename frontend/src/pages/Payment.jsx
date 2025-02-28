import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { transferAmount } from "../redux/actions/userAction";

const PaymentCard = () => {
  const [amount, setAmount] = useState(0);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSendPayment = (id) => {
    dispatch(
      transferAmount(amount, id, (res) => {
        if (res) {
          navigate("/home");
        }
      })
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl p-6 w-80 border border-gray-700">
        {/* Card Header */}
        <h2 className="text-lg font-semibold text-white text-center">
          Payment Details
        </h2>

        {/* User Info */}
        <div className="mt-4 p-4 rounded-lg bg-gray-800 bg-opacity-50 text-white">
          <p className="text-sm text-gray-300">Recipient</p>
          <h3 className="text-lg font-medium">{state.name}</h3>
        </div>

        {/* Amount Input Section */}
        <div className="mt-4 p-4 rounded-lg bg-gray-800 bg-opacity-50">
          <label className="text-sm text-gray-300">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-2 w-full bg-transparent text-white text-lg font-semibold border-b border-gray-500 focus:outline-none focus:border-blue-400 transition duration-300"
            placeholder="Enter amount"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={() => {
            handleSendPayment(id);
          }}
          className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition duration-300"
        >
          Send Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
