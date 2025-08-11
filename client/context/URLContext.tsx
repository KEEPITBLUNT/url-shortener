import React, { createContext, useContext, ReactNode } from 'react';
import { URLData } from '../types/URL';
import { generateShortCode } from '../utils/shortCodeGenerator';

interface URLContextType {
  shortenURL: (originalURL: string) => Promise<{ short_url: string }>;
  redirectToOriginal: (shortCode: string) => string | null;
  getAllURLs: () => URLData[];
}

const URLContext = createContext<URLContextType | undefined>(undefined);

export const useURLContext = () => {
  const context = useContext(URLContext);
  if (!context) {
    throw new Error('useURLContext must be used within a URLProvider');
  }
  return context;
};

export const URLProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const shortenURL = async (originalURL: string): Promise<{ short_url: string }> => {
    const shortCode = generateShortCode();
    const baseURL = window.location.origin;
    const shortURL = `${baseURL}/${shortCode}`;

    const urlData: URLData = {
      original_url: originalURL,
      short_code: shortCode,
      clicks: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

 // local storege
    const existingURLs = JSON.parse(localStorage.getItem('shortenedURLs') || '[]');
    existingURLs.push(urlData);
    localStorage.setItem('shortenedURLs', JSON.stringify(existingURLs));

    return { short_url: shortURL };
  };

  const redirectToOriginal = (shortCode: string): string | null => {
    const existingURLs: URLData[] = JSON.parse(localStorage.getItem('shortenedURLs') || '[]');
    const urlData = existingURLs.find(url => url.short_code === shortCode);

    if (urlData) {
      // Increment click count
      urlData.clicks += 1;
      urlData.updatedAt = new Date();
      
      // Update localStorage
      const updatedURLs = existingURLs.map(url => 
        url.short_code === shortCode ? urlData : url
      );
      localStorage.setItem('shortenedURLs', JSON.stringify(updatedURLs));

      return urlData.original_url;
    }

    return null;
  };

  const getAllURLs = (): URLData[] => {
    const existingURLs: URLData[] = JSON.parse(localStorage.getItem('shortenedURLs') || '[]');
    // Convert string dates back to Date objects
    return existingURLs
      .map(url => ({
        ...url,
        createdAt: new Date(url.createdAt),
        updatedAt: new Date(url.updatedAt)
      }))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  };

  return (
    <URLContext.Provider value={{ shortenURL, redirectToOriginal, getAllURLs }}>
      {children}
    </URLContext.Provider>
  );
};