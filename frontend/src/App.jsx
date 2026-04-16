import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Car from "./pages/Car";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Service from "./pages/Service";
import ServiceRecord from "./pages/ServiceRecord";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cars"
          element={
            <ProtectedRoute>
              <Car />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          element={
         
              <Service />
         
          }
        />
        <Route
          path="/service-records"
          element={
            <ProtectedRoute>
              <ServiceRecord />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
