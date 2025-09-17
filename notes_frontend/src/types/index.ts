export type User = {
  id: string;
  email: string;
  name?: string | null;
  token?: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
};

/**
 * PUBLIC_INTERFACE
 * API standard response for list and item endpoints.
 */
export type ApiListResponse<T> = {
  data: T[];
};

export type ApiItemResponse<T> = {
  data: T;
};
