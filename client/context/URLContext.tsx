import React, { createContext, useContext, ReactNode } from 'react';
import { URLData } from '../types/URL';

interface URLContextType {
  shortenURL: (originalURL: string) => Promise<{ short_code: string; short_url: string }>;
  redirectToOriginal: (shortCode: string) => Promise<string | null>;
  getAllURLs: () => Promise<URLData[]>;
}

const URLContext = createContext<URLContextType | undefined>(undefined);

export const useURLContext = () => {
  const context = useContext(URLContext);
  if (!context) {
    throw new Error('useURLContext must be used within a URLProvider');
  }
  return context;
};

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5001'
    : 'https://url-shortener-1-z59x.onrender.com';

export const URLProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Shorten a URL via backend
  const shortenURL = async (
    originalURL: string
  ): Promise<{ short_code: string; short_url: string }> => {
    const response = await fetch(`${API_BASE_URL}/api/shorten`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ original_url: originalURL }),
    });

    if (!response.ok) {
      throw new Error('Failed to shorten URL');
    }

    const data = await response.json();
    return {
      short_code: data.short_code,
      short_url: data.short_url || `${API_BASE_URL}/${data.short_code}`,
    };
  };

  // Ask backend for original URL & track click
  const redirectToOriginal = async (shortCode: string): Promise<string | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/${shortCode}`, {
        method: 'GET',
      });

      if (!response.ok) return null;

      const data = await response.json();
      return data.original_url || null;
    } catch (error) {
      console.error('Redirect error:', error);
      return null;
    }
  };

  // Fetch all URLs from backend (admin panel or stats page)
  const getAllURLs = async (): Promise<URLData[]> => {
    const response = await fetch(`${API_BASE_URL}/api/admin`);
    if (!response.ok) throw new Error('Failed to fetch URLs');
    return await response.json();
  };

  return (
    <URLContext.Provider value={{ shortenURL, redirectToOriginal, getAllURLs }}>
      {children}
    </URLContext.Provider>
  );
};
