import React, { useEffect, useState } from "react";
import apiClient from "../api/client";
import Navbar from "../components/Navbar";

const initialForm = {
  ServiceID: "",
  AmountPaid: "",
  PaymentDate: "",
  ReceivedBy: "",
};

function Payment() {
  const [payments, setPayments] = useState([]);
  const [serviceRecords, setServiceRecords] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);

  const fetchPageData = async () => {
    try {
      const [paymentsRes, recordsRes] = await Promise.all([
        apiClient.get("/payments"),
        apiClient.get("/services"),
      ]);
      const normalizedPayments = (paymentsRes.data || []).map((payment) => ({
        id: payment.PaymentID ?? payment.id ?? payment._id,
        serviceId: payment.ServiceID ?? payment.serviceId ?? "-",
        plateNumber: payment.PlateNumber ?? payment.plateNumber ?? "-",
        amountPaid: payment.AmountPaid ?? payment.amountPaid ?? "",
        paymentDate: payment.PaymentDate ?? payment.paymentDate ?? "",
        receivedBy: payment.ReceivedBy ?? payment.receivedBy ?? "",
      }));
      const normalizedRecords = (recordsRes.data || []).map((record) => ({
        id: record.ServiceID ?? record.id ?? record._id,
        label: `${record.PlateNumber ?? record.plateNumber ?? "No Car"} - ${
          record.PackageName ?? record.packageName ?? "No Service"
        }`,
      }));

      setPayments(normalizedPayments);
      setServiceRecords(normalizedRecords);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load payments");
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
      await apiClient.post("/payments", {
        ServiceID: Number(form.ServiceID),
        AmountPaid: Number(form.AmountPaid),
        PaymentDate: form.PaymentDate || null,
        ReceivedBy: form.ReceivedBy || null,
      });
      setForm(initialForm);
      fetchPageData();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create payment");
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/payments/${id}`);
      fetchPageData();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete payment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="mb-4 text-left text-2xl font-semibold text-gray-900">Payments</h2>

        <form onSubmit={handleCreate} className="mb-6 grid gap-3 rounded bg-white p-4 shadow md:grid-cols-4">
          <select name="ServiceID" value={form.ServiceID} onChange={handleChange} className="rounded border px-3 py-2" required>
            <option value="">Select Service Record</option>
            {serviceRecords.map((record) => (
              <option key={record.id} value={record.id}>
                {record.label}
              </option>
            ))}
          </select>
          <input name="AmountPaid" value={form.AmountPaid} onChange={handleChange} placeholder="Amount Paid" className="rounded border px-3 py-2" required />
          <input type="date" name="PaymentDate" value={form.PaymentDate} onChange={handleChange} className="rounded border px-3 py-2" />
          <input name="ReceivedBy" value={form.ReceivedBy} onChange={handleChange} placeholder="Received By" className="rounded border px-3 py-2" />
          <button type="submit" className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 md:col-span-4">
            Add Payment
          </button>
        </form>

        <div className="overflow-x-auto rounded bg-white shadow">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3">Service Record</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Payment Date</th>
                <th className="px-4 py-3">Received By</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {!loading && payments.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                    No payments found
                  </td>
                </tr>
              )}
              {payments.map((payment) => (
                <tr key={payment.id} className="border-t">
                  <td className="px-4 py-3">
                    #{payment.serviceId} - {payment.plateNumber}
                  </td>
                  <td className="px-4 py-3">{payment.amountPaid}</td>
                  <td className="px-4 py-3">
                    {payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-4 py-3">{payment.receivedBy}</td>
                  <td className="px-4 py-3">
                    <button type="button" onClick={() => handleDelete(payment.id)} className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600">
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

export default Payment;
