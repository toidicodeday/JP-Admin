export type ListOf<T> = T[];

export type SelectOptionType = {
  id?: number;
  label: string;
  value: string | number;
  raw?: any;
};

export type ListWithPageOf<T> = {
  data: T[];
  pages: number;
  total: number;
};

export type DetailsOf<T> = {
  status: number;
  data: T;
};
