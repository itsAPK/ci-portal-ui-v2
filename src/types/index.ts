export type SearchParams = Record<string, string | string[] | undefined>;

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface DataTableFilterField<TData> {
  label: string;
  value: keyof TData;
  placeholder?: string;
  options?: Option[];
  dtype?: 'string' | 'int';
}

export interface DataTableFilterOption<TData> {
  id: string;
  label: string;
  value: keyof TData;
  options: Option[];
  filterValues?: string[];
  filterOperator?: string;
  isMulti?: boolean;
  dtype?: 'string' | 'int';
}

export interface IndexPageProps {
  searchParams: SearchParams;
}

export interface DashboardCardData {
  iconText: string;
  iconBgColor: string;
  statValue: string | number;
  statLabel: string;
  cardBgColor: string;
}
