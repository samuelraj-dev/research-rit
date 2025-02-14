import { useState } from "react";

export function FundingForm() {
  const [formData, setFormData] = useState({
    title: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    ongoing: false,
    role: "",
    fundingAgency: "",
    grantNo: "",
    status: "",
    amount: "",
  });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = Array.from({ length: 50 }, (_, i) => 2025 - i);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "ongoing" && checked ? { endMonth: "", endYear: "" } : {}),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-gray-700">Title of the project</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Start Date */}
      <div>
        <label className="block text-gray-700">Start Date</label>
        <div className="flex space-x-2">
          <select
            name="startMonth"
            value={formData.startMonth}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Month</option>
            {months.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
          <select
            name="startYear"
            value={formData.startYear}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* End Date */}
      <div>
        <label className="block text-gray-700">End Date</label>
        <div className="flex space-x-2">
          <select
            name="endMonth"
            value={formData.endMonth}
            onChange={handleChange}
            disabled={formData.ongoing}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Month</option>
            {months.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
          <select
            name="endYear"
            value={formData.endYear}
            onChange={handleChange}
            disabled={formData.ongoing}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Ongoing Checkbox */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="ongoing"
          checked={formData.ongoing}
          onChange={handleChange}
          className="form-checkbox h-4 w-4"
        />
        <label className="text-gray-700">Ongoing</label>
      </div>

      {/* Role */}
      <div>
        <label htmlFor="role" className="block text-gray-700">Role</label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Funding Agency */}
      <div>
        <label htmlFor="fundingAgency" className="block text-gray-700">Funding Agency</label>
        <input
          type="text"
          id="fundingAgency"
          name="fundingAgency"
          value={formData.fundingAgency}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Grant No */}
      <div>
        <label htmlFor="grantNo" className="block text-gray-700">Grant No.</label>
        <input
          type="text"
          id="grantNo"
          name="grantNo"
          value={formData.grantNo}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status" className="block text-gray-700">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Amount */}
      <div>
        <label htmlFor="amount" className="block text-gray-700">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-center items-center">
        <button
          type="button"
          onClick={handleSubmit}
          className="px-12 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};