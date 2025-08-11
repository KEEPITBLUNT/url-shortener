import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useURLContext } from '../context/URLContext';
import { ExternalLink, AlertCircle } from 'lucide-react';

export const RedirectPage: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const { redirectToOriginal } = useURLContext();
  const [redirecting, setRedirecting] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleRedirect = async () => {
      if (!shortCode) {
        setError(true);
        setRedirecting(false);
        return;
      }

      try {
        const originalURL = redirectToOriginal(shortCode);
        if (originalURL) {
          // Add a small delay for better UX
          setTimeout(() => {
            window.location.href = originalURL;
          }, 1000);
        } else {
          setError(true);
          setRedirecting(false);
        }
      } catch (err) {
        setError(true);
        setRedirecting(false);
      }
    };

    handleRedirect();
  }, [shortCode, redirectToOriginal]);

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-red-200 shadow-lg">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Link Not Found</h1>
          <p className="text-gray-600 mb-6">
            The short URL you're looking for doesn't exist or may have expired.
          </p>
          <a
            href="/"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>Create a New Short URL</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 shadow-lg">
        <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-6"></div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Redirecting...</h1>
        <p className="text-gray-600 mb-4">
          You'll be redirected to your destination in just a moment.
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <ExternalLink className="h-4 w-4" />
          <span>Taking you to: {shortCode}</span>
        </div>
      </div>
    </div>
  );
};