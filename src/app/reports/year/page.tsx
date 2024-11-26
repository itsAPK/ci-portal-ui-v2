"use client";
import React, { useState } from "react";
import { ContentLayout } from "@/components/content-layout";

const YearReport = () => {
  const [dates, setDates] = useState({ startDate: "", endDate: "" });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDates((prevDates) => ({ ...prevDates, [id]: value }));
  };

  const handleSubmit = () => {
    console.log("Start Date:", dates.startDate);
    console.log("End Date:", dates.endDate);
  };

  return (
    <ContentLayout>
      <div className="h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
      <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Yearly Report
          </h2>
          <div className="space-y-6">
            {/* Start Date */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
              <input
                id="startDate"
                type="date"
                value={dates.startDate}
                onChange={handleInputChange}
                className="block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff8800] focus:outline-none"

              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="endDate">
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                value={dates.endDate}
                onChange={handleInputChange}
                className="block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff8800] focus:outline-none"
               
              />
            </div>
          </div>

          <div className="mt-6">
          <button
              onClick={handleSubmit}
              className="bg-[#ff8800] text-white px-4 py-2 rounded-md shadow hover:bg-orange-600"
              type="button"
            >
              Submit
            </button>
          </div>
        </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default YearReport;
