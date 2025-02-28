import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { initload } from "./redux/actions/authAction";
import PaymentCard from "./pages/Payment";

function App() {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.authReducer);

  const user = JSON.parse(localStorage.getItem("userToken"));
  useEffect(() => {
    dispatch(initload());
  }, []);
  return (
    <>
      {userDetails?.token || user?.token ? (
        <Routes>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/payment/:id" element={<PaymentCard />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      )}
    </>
  );
}

export default App;
