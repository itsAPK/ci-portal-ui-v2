'use client';
import React from 'react';
import { DocumentTable } from './table';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { parseFilterInput, buildFilter, parseSort } from '@/lib/filter-parser';

export function Document() {
  const params = useSearchParams();

  const document = useQuery({
    queryKey: ['get-document'],
    queryFn: async (): Promise<any> => {
      

      return await api
        .get(`/document`)
        .then((res) => {
          if (!res.data.success) {
            throw new Error(res.data.message);
          }
          return res.data.data;
        })
        .catch((err) => {
          throw err;
        });
    },
  });
  return (
    <>
      <div className="p-3 text-xl font-semibold text-gray-800 dark:text-white">Templates</div>
      <DocumentTable
        refetchFn={document.refetch}
        data={document.data ? document.data : []}
        pageCount={ 1}
        total = {0}
      />
    </>
  );
}
