import React, { useEffect, useState } from 'react';
import { useURLContext } from '../context/URLContext';
import { URLData } from '../types/URL';
import { ExternalLink, Copy, Eye, Calendar, TrendingUp } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

export const AdminPage: React.FC = () => {
  const { getAllURLs } = useURLContext();
  const [urls, setUrls] = useState<URLData[]>([]);
  const [totalClicks, setTotalClicks] = useState(0);

  useEffect(() => {
    const fetchURLs = () => {
      const allUrls = getAllURLs();
      setUrls(allUrls);
      setTotalClicks(allUrls.reduce((sum, url) => sum + url.clicks, 0));
    };

    fetchURLs();
    // Set up refresh data every 5 seconds
    const interval = setInterval(fetchURLs, 5000);
    return () => clearInterval(interval);
  }, [getAllURLs]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Analytics Dashboard</h1>
        <p className="text-gray-600 text-lg">Monitor your shortened URLs and track their performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
          title="Total Links"
          value={urls.length.toString()}
          color="blue"
        />
        <StatCard
          icon={<Eye className="h-6 w-6 text-green-600" />}
          title="Total Clicks"
          value={totalClicks.toString()}
          color="green"
        />
        <StatCard
          icon={<Calendar className="h-6 w-6 text-purple-600" />}
          title="Average Clicks"
          value={urls.length > 0 ? (totalClicks / urls.length).toFixed(1) : '0'}
          color="purple"
        />
      </div>

      {/* URLs Table */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Your Shortened URLs</h2>
        </div>
        
        {urls.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No URLs Yet</h3>
            <p className="text-gray-600">Start shortening URLs to see analytics here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Original URL
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Short URL
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {urls.map((url) => (
                  <tr key={url.short_code} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <a
                          href={url.original_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 truncate max-w-xs"
                          title={url.original_url}
                        >
                          {url.original_url}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-800">
                          {window.location.origin}/{url.short_code}
                        </code>
                        <button
                          onClick={() => copyToClipboard(`${window.location.origin}/${url.short_code}`)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          title="Copy to clipboard"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <Eye className="h-3 w-3 mr-1" />
                        {url.clicks}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(url.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <a
                        href={`/${url.short_code}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Visit short URL"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
  color: 'blue' | 'green' | 'purple';
}> = ({ icon, title, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200'
  };

  return (
    <div className={`bg-white/60 backdrop-blur-sm p-6 rounded-xl border ${colorClasses[color]} shadow-lg`}>
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-white/80">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};