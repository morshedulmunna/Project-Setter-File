// export const HOST = process.env.NEXT_PUBLIC_CRM_ADMIN_API_URL;

export const HOST =
  process.env.NEXT_PUBLIC_CRM_ADMIN_API_URL || "http://localhost:5002";

export const DEFAULT_QUERY = {
  page: 1,
  limit: 10,
  search: "",
};
