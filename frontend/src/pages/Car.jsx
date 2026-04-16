import React, { useEffect, useState } from "react";
import apiClient from "../api/client";
import Navbar from "../components/Navbar";





function Car() {
  const [cars, setCars] = useState([]);
  
 const [plateNumber,setPlateNumber] = useState("");
 const [carType,setCarType] = useState("");
 const [carSize,setCarSize] = useState("");
 const [driverName,setDriverName] = useState("");
 const [phoneNumber,setPhoneNumber] = useState("");

const [loading, setLoading] = useState(true);


  const getCarId = (car) => car.CarID ?? car.id ?? car._id;

  const fetchCars = async () => {
    try {

      const res = await apiClient.get("/cars/list");


      setCars(res.data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to load cars");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCars();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/cars", {
        plateNumber,
        carType,
        carSize,
        driverName,
        phoneNumber
      });

      fetchCars();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create car");
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/cars/${id}`);

      
      fetchCars();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete car");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="mb-4 text-left text-2xl font-semibold text-gray-900">Cars</h2>

        <form onSubmit={handleCreate} className="mb-6 grid gap-3 rounded bg-white p-4 shadow md:grid-cols-3">
          <input name="PlateNumber" value={plateNumber} onChange={(e)=>setPlateNumber(e.target.value)} placeholder="Plate Number" className="rounded border px-3 py-2" required />

          <input name="CarType" value={carType} onChange={(e)=>setCarType(e.target.value)} placeholder="Car Type" className="rounded border px-3 py-2" />

          <input name="CarSize" value={carSize} onChange={(e)=>setCarSize(e.target.value)} placeholder="Car Size" className="rounded border px-3 py-2" />

          <input name="DriverName" value={driverName} onChange={(e)=>setDriverName(e.target.value)} placeholder="Driver Name" className="rounded border px-3 py-2" />
          <input name="PhoneNumber" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} 
            placeholder="Phone Number" className="rounded border px-3 py-2" />
          
          
          <button type="submit" className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 md:col-span-3">
            Add Car
          </button>
        </form>

        <div className="overflow-x-auto rounded bg-white shadow">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3">Plate Number</th>
                <th className="px-4 py-3">Car Type</th>
                <th className="px-4 py-3">Car Size</th>
                <th className="px-4 py-3">Driver Name</th>
                <th className="px-4 py-3">Phone Number</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {!loading && cars.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                    No cars found
                  </td>
                </tr>
              )}
              {cars.map((car) => (
                <tr key={getCarId(car) ?? car.PlateNumber} className="border-t">
                  <td className="px-4 py-3">{car.PlateNumber}</td>
                  <td className="px-4 py-3">{car.CarType}</td>
                  <td className="px-4 py-3">{car.CarSize}</td>
                  <td className="px-4 py-3">{car.DriverName}</td>
                  <td className="px-4 py-3">{car.PhoneNumber}</td>
                  <td className="px-4 py-3">
                    <button type="button" onClick={() => handleDelete(getCarId(car))} className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Car;
