"use client";

"use client";

import React, { useState } from "react";
import { z } from "zod";
import { tableViewSchema } from "@/schema/table"; 
import { ContentLayout } from "@/components/content-layout";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const TableView = () => {
  const companies = ["Company 1", "Company 2", "Company 3"];
  const savingTypes = ["Type 1", "Type 2", "Type 3"];
  const projectCategories = ["Category 1", "Category 2", "Category 3"];

  const [formData, setFormData] = useState({
    company: "placeholder",
    savingType: "placeholder",
    projectCategory: "placeholder",
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    // Replace "placeholder" with empty strings before validation
    const cleanedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        value === "placeholder" ? "" : value,
      ])
    );

    try {
      tableViewSchema.parse(cleanedData);
      console.log("Form submitted successfully", cleanedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "", 
    }));
  };

  const renderSelect = (
    label: string,
    field: string,
    options: string[]
  ) => (
    <div className="w-1/3">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <Select
        value={formData[field]}
        onValueChange={(value) => handleInputChange(field, value)}
      >
        <SelectTrigger className="focus:ring-2 focus:ring-[#ff8800] focus:outline-none border-gray-300 border rounded-md">
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="placeholder">Select {label}</SelectItem>
          {options.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors[field] && (
        <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
      )}
    </div>
  );

  return (
    <ContentLayout>
      <div className="h-screen p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full">
          <div className="space-y-4">
            <div className="flex space-x-4">
              {renderSelect("Company", "company", companies)}
              {renderSelect("Saving Type", "savingType", savingTypes)}
              {renderSelect("Project Category", "projectCategory", projectCategories)}
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                  className="block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff8800] focus:outline-none"
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.startDate}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff8800] focus:outline-none"
                />
                {errors.endDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
                )}
              </div>
            </div>
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
    </ContentLayout>
  );
};

export default TableView;
