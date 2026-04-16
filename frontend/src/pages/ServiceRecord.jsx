import React, { useEffect, useState } from "react";
import apiClient from "../api/client";
import Navbar from "../components/Navbar";

const initialForm = {
  CarID: "",
  PackageID: "",
  ServiceDate: "",
};

function ServiceRecord() {
  const [records, setRecords] = useState([]);
  const [cars, setCars] = useState([]);
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);

  const fetchPageData = async () => {
    try {
      const [recordsRes, carsRes, servicesRes] = await Promise.all([
        apiClient.get("/services"),
        apiClient.get("/cars/list"),
        apiClient.get("/packages"),
      ]);
      const normalizedRecords = (recordsRes.data || []).map((record) => ({
        id: record.ServiceID ?? record.id ?? record._id,
        carLabel: record.PlateNumber ?? record.plateNumber ?? "-",
        serviceLabel: record.PackageName ?? record.packageName ?? "-",
        serviceDate: record.ServiceDate ?? record.serviceDate ?? "",
      }));
      const normalizedCars = (carsRes.data || []).map((car) => ({
        id: car.CarID ?? car.id ?? car._id,
        plateNumber: car.PlateNumber ?? car.plateNumber ?? "-",
      }));
      const normalizedServices = (servicesRes.data || []).map((service) => ({
        id: service.PackageID ?? service.id ?? service._id,
        name: service.PackageName ?? service.serviceName ?? "-",
      }));

      setRecords(normalizedRecords);
      setCars(normalizedCars);
      setServices(normalizedServices);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load service records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/services", form);
      setForm(initialForm);
      fetchPageData();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create service record");
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/services/${id}`);
      fetchPageData();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete service record");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="mb-4 text-left text-2xl font-semibold text-gray-900">Service Records</h2>

        <form onSubmit={handleCreate} className="mb-6 grid gap-3 rounded bg-white p-4 shadow md:grid-cols-3">
          <select name="CarID" value={form.CarID} onChange={handleChange} className="rounded border px-3 py-2" required>
            <option value="">Select Car</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.plateNumber}
              </option>
            ))}
          </select>

          <select name="PackageID" value={form.PackageID} onChange={handleChange} className="rounded border px-3 py-2" required>
            <option value="">Select Service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>

          <input type="date" name="ServiceDate" value={form.ServiceDate} onChange={handleChange} className="rounded border px-3 py-2" />

          <button type="submit" className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 md:col-span-3">
            Add Service Record
          </button>
        </form>

        <div className="overflow-x-auto rounded bg-white shadow">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3">Car</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Service Date</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {!loading && records.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                    No service records found
                  </td>
                </tr>
              )}
              {records.map((record) => (
                <tr key={record.id} className="border-t">
                  <td className="px-4 py-3">{record.carLabel}</td>
                  <td className="px-4 py-3">{record.serviceLabel}</td>
                  <td className="px-4 py-3">
                    {record.serviceDate ? new Date(record.serviceDate).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-4 py-3">
                    <button type="button" onClick={() => handleDelete(record.id)} className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600">
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

export default ServiceRecord;
