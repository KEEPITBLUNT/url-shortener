export interface URLData {
  original_url: string;
  short_code: string;
  clicks: number;
  createdAt: string; // ISO string from backend
  updatedAt: string; // ISO string from backend
  short_url?: string; // present in /api/admin and /api/shorten response
}