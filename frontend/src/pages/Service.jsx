import React, { useEffect, useState } from "react";
import apiClient from "../api/client";
import Navbar from "../components/Navbar";

function Service() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [PackageName, setServiceName] = useState("");
  const [PackageDescription, setServiceDescription] = useState("");
  const [PackagePrice, setServicePrice] = useState("");


























  useEffect(() => {

    const fetchPackages = async () => {
      try {
        const res = await apiClient.get("/packages/list");
    
        setPackages(res.data);
      } catch (error) {
        setPackages([]);

        alert(error.response?.data?.message || "Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);



  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/packages/create", {

  PackageName,
	PackageDescription,
  PackagePrice
        
      });
   
      
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create service");
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/packages/${id}`);

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
   
          <input name="serviceName" value={PackageName} onChange={(e)=>setServiceName(e.target.value)} placeholder="Service Name" className="rounded border px-3 py-2" required />
          <input name="serviceDescription" value={	PackageDescription} onChange={(e)=>setServiceDescription(e.target.value)} placeholder="Service Description" className="rounded border px-3 py-2 md:col-span-3" />
          <input name="servicePrice" value={PackagePrice} onChange={(e) => setServicePrice(e.target.value)}
            placeholder="Service Price" className="rounded border px-3 py-2" required />
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
              {loading && (
                <tr>
                  <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                    Loading services...
                  </td>
                </tr>
              )}
              {!loading && packages.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                    No services found
                  </td>
                </tr>
              )}
              {packages?.map((service) => (
                <tr key={service.id} className="border-t">
                  <td className="px-4 py-3">{service.PackageID}</td>
                  <td className="px-4 py-3">{service.PackageName}</td>
                  <td className="px-4 py-3">{service.PackageDescription}</td>
                  <td className="px-4 py-3">{service.PackagePrice}</td>
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
