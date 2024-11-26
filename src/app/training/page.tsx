'use client';
import WordPullUp from '@/components/ui/word-pull-up';

import { ContentLayout } from '@/components/content-layout';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import React from 'react';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

export default function Training() {
  return (
    <ContentLayout>
       <div className="h-screen">
      <div className="space-y-4">
        {/* Select Month Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Month
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose a month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={index} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Select Year Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Year
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose a year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
        </div>
        <button
            className="bg-[#ff8800] text-white px-4 py-2 rounded-md shadow hover:bg-orange-600"
            type="button"
          >
            Training Requirement
          </button>
      </div>
     
     
       
      </div>
     
    </ContentLayout>
  );
}
