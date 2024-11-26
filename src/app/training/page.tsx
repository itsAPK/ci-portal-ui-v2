'use client';
import WordPullUp from '@/components/ui/word-pull-up';

import { ContentLayout } from '@/components/content-layout';
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
        <h1>Training</h1>
        <div className="sticky1">I am sticky!</div>
      </div>
    </ContentLayout>
  );
}
