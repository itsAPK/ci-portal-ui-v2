'use client';
import React, { useState, useEffect } from 'react';
import { Header } from './header/header';
import { Header1 } from './header/header1';

interface ContentLayoutProps {
  title?: string;
  children: React.ReactNode;
  tags?: string[];
}

export function ContentLayout({ title, tags, children }: ContentLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <div className="  pl-5 pr-3">
      <div className="sticky z-10 rounded-full  ">
        <Header />
      </div>
      <div className="pb-8 pl-0 pt-4 lg:pr-4 shadow-lg bg-white dark:bg-background rounded ">{children}</div>
    </div>
  );
}
