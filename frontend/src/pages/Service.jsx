import React, { useEffect, useState } from "react";
import apiClient from "../api/client";
import Navbar from "../components/Navbar";

const initialForm = {
  serviceCode: "",
  serviceName: "",
  serviceDescription: "",
  servicePrice: "",
};

function Service() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const res = await apiClient.get("/packages");
      const normalized = (res.data || []).map((item) => ({
        id: item.PackageID ?? item.id ?? item._id,
        serviceCode: item.PackageCode ?? item.serviceCode ?? "",
        serviceName: item.PackageName ?? item.serviceName ?? "",
        serviceDescription: item.PackageDescription ?? item.serviceDescription ?? "",
        servicePrice: item.PackagePrice ?? item.servicePrice ?? "",
      }));
      setServices(normalized);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/packages", {
        PackageCode: form.serviceCode,
        PackageName: form.serviceName,
        PackageDescription: form.serviceDescription,
        PackagePrice: Number(form.servicePrice),
      });
      setForm(initialForm);
      fetchServices();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create service");
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/packages/${id}`);
      fetchServices();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete service");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="mb-4 text-left text-2xl font-semibold text-gray-900">Services</h2>

        <form onSubmit={handleCreate} className="mb-6 grid gap-3 rounded bg-white p-4 shadow md:grid-cols-3">
          <input name="serviceCode" value={form.serviceCode} onChange={handleChange} placeholder="Service Code" className="rounded border px-3 py-2" required />
          <input name="serviceName" value={form.serviceName} onChange={handleChange} placeholder="Service Name" className="rounded border px-3 py-2" required />
          <input name="serviceDescription" value={form.serviceDescription} onChange={handleChange} placeholder="Service Description" className="rounded border px-3 py-2 md:col-span-3" />
          <input name="servicePrice" value={form.servicePrice} onChange={handleChange} placeholder="Service Price" className="rounded border px-3 py-2" required />
          <button type="submit" className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 md:col-span-3">
            Add Service
          </button>
        </form>

        <div className="overflow-x-auto rounded bg-white shadow">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {!loading && services.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                    No services found
                  </td>
                </tr>
              )}
              {services.map((service) => (
                <tr key={service.id} className="border-t">
                  <td className="px-4 py-3">{service.serviceCode}</td>
                  <td className="px-4 py-3">{service.serviceName}</td>
                  <td className="px-4 py-3">{service.serviceDescription}</td>
                  <td className="px-4 py-3">{service.servicePrice}</td>
                  <td className="px-4 py-3">
                    <button type="button" onClick={() => handleDelete(service.id)} className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600">
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

export default Service;
