import React from 'react';
import { Card } from './ui/card'; // Adjust the import path according to your project structure

// Define the DashboardCardData interface if it's not already defined in '@/types'
export interface DashboardCardData {
  iconText: string;
  iconBgColor: string;
  statValue: string | number;
  statLabel: string;
  cardBgColor: string;
}

const DashboardCard = ({ data }: any) => {
  const { iconText, iconBgColor, statValue, statLabel, cardBgColor } = data;
  return (
    <Card>
      <div
        className="flex items-center justify-between rounded-lg p-6"
        style={{ backgroundColor: cardBgColor }}
      >
        <div className="rounded-full px-4 py-2 text-white" style={{ backgroundColor: iconBgColor }}>
          {iconText}
        </div>
        <div className="text-[#3f414d]">
          <h1 className="text-3xl font-[400]">{statValue}</h1>
          <p className="text-end font-[400]">{statLabel}</p>
        </div>
      </div>
    </Card>
  );
};

export default DashboardCard;
