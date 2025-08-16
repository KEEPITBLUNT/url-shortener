import React, { useState } from 'react';
import { Link2, ArrowRight } from 'lucide-react';

interface URLFormProps {
  onShorten: (url: string) => void;
  isLoading: boolean;
}

export const URLForm: React.FC<URLFormProps> = ({ onShorten, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateURL = (value: string): boolean => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    let validatedURL = url.trim();

    if (!validatedURL) {
      setError('Please enter a URL');
      return;
    }

    // Add protocol if missing
    if (!/^https?:\/\//i.test(validatedURL)) {
      validatedURL = 'https://' + validatedURL;
    }

    if (!validateURL(validatedURL)) {
      setError('Please enter a valid URL');
      return;
    }

    onShorten(validatedURL);
    setUrl(''); // Clear after submission
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 shadow-xl"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Link2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your long URL here..."
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/80"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 min-w-[140px]"
          >
            {isLoading ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              <>
                <span>Shorten</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
        {error && (
          <p className="mt-3 text-sm text-red-600 flex items-center space-x-1">
            <span>⚠️</span>
            <span>{error}</span>
          </p>
        )}
      </form>
    </div>
  );
};