import React, { useState } from 'react';
import { Copy, Check, ExternalLink, RotateCcw } from 'lucide-react';

interface URLResultProps {
  shortURL: string; // can be full URL or just short_code
  onReset: () => void;
}

export const URLResult: React.FC<URLResultProps> = ({ shortURL, onReset }) => {
  const [copied, setCopied] = useState(false);

  // Ensure it's a full link
  const fullURL = shortURL.startsWith('http')
    ? shortURL
    : `${window.location.origin}/${shortURL}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-green-200 shadow-xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Success! Your URL is ready</h2>
          <p className="text-gray-600">Your shortened URL has been generated and is ready to share.</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 mb-1">Your shortened URL:</p>
              <code className="text-lg font-mono text-blue-600 break-all">{fullURL}</code>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={copyToClipboard}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <a
              href={fullURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
              <span>Visit Link</span>
            </a>

            <button
              onClick={onReset}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="h-5 w-5" />
              <span>Shorten Another</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};