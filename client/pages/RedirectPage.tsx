import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ExternalLink, AlertCircle } from 'lucide-react';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5001'
    : 'https://url-shortener-1-z59x.onrender.com'; 

export const RedirectPage: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [redirecting, setRedirecting] = useState(true);
  const [error, setError] = useState(false);
  const [destination, setDestination] = useState('');

  useEffect(() => {
    const handleRedirect = async () => {
      if (!shortCode) {
        setError(true);
        setRedirecting(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/${shortCode}`);
        if (!response.ok) {
          setError(true);
          setRedirecting(false);
          return;
        }

        const data = await response.json();
        setDestination(data.original_url);

        setTimeout(() => {
          window.location.href = data.original_url;
        }, 1200); // slight delay for smooth UX
      } catch (err) {
        setError(true);
        setRedirecting(false);
      }
    };

    handleRedirect();
  }, [shortCode]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 px-4">
        <div className="bg-white shadow-xl rounded-3xl p-10 max-w-md w-full text-center border border-red-200">
          <AlertCircle className="mx-auto text-red-500 w-16 h-16 mb-5" />
          <h1 className="text-2xl font-bold text-red-600 mb-3">Oops! Link Not Found</h1>
          <p className="text-gray-600 mb-6">
            The short URL you tried to access doesn’t exist or has expired.
          </p>
          <a
            href="/"
            className="inline-block bg-red-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-red-600 transition-colors"
          >
            Create a New Short URL
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl p-10 max-w-md w-full text-center border border-gray-200">
        <div className="mx-auto mb-6 w-16 h-16 relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Redirecting...</h1>
        <p className="text-gray-600 mb-4">
          You will be redirected shortly to your destination.
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mt-2 break-words">
          <ExternalLink className="w-4 h-4" />
          <span>{destination || `short.ly/${shortCode}`}</span>
        </div>
        <div className="mt-6 text-gray-400 text-xs">
          If you are not redirected automatically,{' '}
          <a href={destination} className="underline text-blue-500">
            click here
          </a>.
        </div>
      </div>
    </div>
  );
};
