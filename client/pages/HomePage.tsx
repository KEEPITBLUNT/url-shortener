import React, { useState } from 'react';
import { URLForm } from '../components/URLForm';
import { URLResult } from '../components/URLResult';
import { useURLContext } from '../context/URLContext';
import { LinkIcon, Zap, Shield, BarChart } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { shortenURL } = useURLContext();
  const [shortURL, setShortURL] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleShorten = async (originalURL: string) => {
    setIsLoading(true);
    try {
      const result = await shortenURL(originalURL);
      setShortURL(result.short_url);
    } catch (error) {
      console.error('Error shortening URL:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setShortURL('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Shorten Your
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Links</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Transform long, unwieldy URLs into clean, shareable links. Track clicks, manage your links, and boost your online presence.
        </p>
      </div>

      {/* URL Shortener Form */}
      <div className="mb-16">
        {!shortURL ? (
          <URLForm onShorten={handleShorten} isLoading={isLoading} />
        ) : (
          <URLResult shortURL={shortURL} onReset={handleReset} />
        )}
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <FeatureCard
          icon={<Zap className="h-8 w-8 text-blue-600" />}
          title="Lightning Fast"
          description="Generate short URLs instantly with our optimized algorithm"
        />
        <FeatureCard
          icon={<Shield className="h-8 w-8 text-green-600" />}
          title="Secure & Reliable"
          description="Your links are safe and will always redirect to the right place"
        />
        <FeatureCard
          icon={<BarChart className="h-8 w-8 text-purple-600" />}
          title="Analytics"
          description="Track clicks and monitor the performance of your shortened links"
        />
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};