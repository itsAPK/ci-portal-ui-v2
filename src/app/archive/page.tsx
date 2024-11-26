"use client";

import { ContentLayout } from '@/components/content-layout';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import React, { useState } from 'react';

export default function Archive() {
  const years = ["2024", "2023", "2022"];
  const companies = ["Company 1", "Company 2", "Company 3"];
  const departments = ["Department 1", "Department 2", "Department 3"];
  const categories = ["Category 1", "Category 2", "Category 3"];

  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSubmit = () => {
    console.log("Year:", selectedYear);
    console.log("Company:", selectedCompany);
    console.log("Department:", selectedDepartment);
    console.log("Category:", selectedCategory);
  };

  const renderSelect = (
    label: string,
    options: string[],
    selectedValue: string,
    setSelectedValue: React.Dispatch<React.SetStateAction<string>>
  ) => (
    <div className="w-1/4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <Select value={selectedValue} onValueChange={setSelectedValue}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {options.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <ContentLayout>
      <div className="h-screen">
        <h1>Archive</h1>
      </div>
    </ContentLayout>
  );
}
