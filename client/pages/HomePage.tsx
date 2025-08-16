import React, { useState } from 'react';
import { URLForm } from '../components/URLForm';
import { URLResult } from '../components/URLResult';
import { useURLContext } from '../context/URLContext';
import { Zap, Shield, BarChart, Users, Globe } from 'lucide-react';

// FeatureCard component
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="bg-white/60 backdrop-blur-2xl p-6 rounded-2xl border border-gray-200 shadow-md flex flex-col items-center text-center
      mb-6 mx-2 md:mx-0 md:mb-0 md:p-8 lg:p-10 transition-transform hover:-translate-y-1 hover:shadow-lg">
    <div className="mb-4 md:mb-6">{icon}</div>
    <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">{title}</h3>
    <p className="text-sm md:text-base text-gray-600">{description}</p>
  </div>
);

// StatCard component
const StatCard: React.FC<{ number: string; label: string }> = ({ number, label }) => (
  <div className="bg-gradient-to-br from-blue-100/70 to-purple-100/90 p-6 rounded-2xl border border-gray-100 shadow flex flex-col items-center
      mb-6 mx-2 md:mx-0 md:mb-0 md:p-10">
    <h3 className="text-2xl md:text-4xl font-extrabold text-blue-700 mb-1 md:mb-2">{number}</h3>
    <p className="text-gray-700 font-semibold uppercase tracking-wide text-xs md:text-sm">{label}</p>
  </div>
);

export const HomePage: React.FC = () => {
  const { shortenURL } = useURLContext();
  const [shortURL, setShortURL] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleShorten = async (originalURL: string) => {
    setIsLoading(true);
    try {
      const result = await shortenURL(originalURL);
      const fullShortURL = `${window.location.origin}/${result.short_code}`;
      setShortURL(fullShortURL);
    } catch (error) {
      console.error('Error shortening URL:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => setShortURL('');

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-100 min-h-screen w-full">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-16 px-4 md:py-28 md:px-8 min-h-[50vh] md:min-h-[70vh] relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none blur-2xl opacity-30">
          <div className="absolute top-1/3 left-0 rounded-full w-3/5 h-1/3 bg-gradient-to-br from-blue-400 to-purple-400 opacity-50"></div>
        </div>
        <h1 className="relative z-10 text-3xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight md:text-5xl lg:text-6xl">
          Shorten Your{' '}
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-transparent bg-clip-text">
            Links
          </span>
        </h1>
        <p className="relative z-10 text-base text-gray-700 max-w-md mx-auto leading-relaxed mb-6 md:text-xl md:max-w-xl lg:max-w-2xl">
          Transform long URLs into beautiful short links. Track clicks and manage your links securely.
        </p>
        <div className="relative z-10 flex flex-col gap-3 w-full max-w-xs mx-auto md:flex-row md:justify-center md:gap-5 md:max-w-md lg:max-w-2xl mt-2">
          <a
            href="#shorten"
            className="px-6 py-3 bg-blue-700 text-white rounded-full font-bold shadow w-full md:w-auto md:text-lg text-center"
          >
            Get Started
          </a>
          <a
            href="#features"
            className="px-6 py-3 border-2 border-blue-700 text-blue-700 rounded-full font-bold bg-blue-100 w-full md:w-auto md:text-lg text-center"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* URL Shortener Section */}
      <section
        id="shorten"
        className="py-10 px-4 max-w-lg mx-auto md:py-16 md:px-0 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl"
      >
        {!shortURL ? (
          <URLForm onShorten={handleShorten} isLoading={isLoading} />
        ) : (
          <URLResult shortURL={shortURL} onReset={handleReset} />
        )}
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-12 px-4 max-w-2xl mx-auto md:py-20 md:max-w-4xl lg:max-w-6xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 md:text-4xl lg:text-5xl">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
          <FeatureCard
            icon={<Zap className="h-8 w-8 md:h-12 md:w-12 text-blue-600" />}
            title="Lightning Fast"
            description="Generate short URLs instantly with our optimized infrastructure."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8 md:h-12 md:w-12 text-purple-600" />}
            title="Secure & Reliable"
            description="Enterprise-grade encryption ensures your links always work safely."
          />
          <FeatureCard
            icon={<BarChart className="h-8 w-8 md:h-12 md:w-12 text-blue-600" />}
            title="Analytics"
            description="Track click analytics and gain insights into your link usage."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8 md:h-12 md:w-12 text-pink-600" />}
            title="User-Friendly"
            description="Intuitive navigation and link management for everyone."
          />
          <FeatureCard
            icon={<Globe className="h-8 w-8 md:h-12 md:w-12 text-blue-600" />}
            title="Global Access"
            description="Your short links work anywhere in the world on any device."
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 px-4 bg-gradient-to-r from-blue-100 to-purple-100 md:py-16">
        <div className="max-w-2xl mx-auto grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8 md:max-w-4xl lg:max-w-6xl text-center">
          <StatCard number="10K+" label="Links Shortened" />
          <StatCard number="5K+" label="Active Users" />
          <StatCard number="99.9%" label="Uptime & Reliability" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 text-center md:py-20 lg:py-24">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 md:text-4xl lg:text-5xl">
          Start Shortening Your Links Today
        </h2>
        <p className="text-gray-700 mb-6 max-w-md mx-auto text-base md:text-xl lg:text-2xl md:max-w-xl lg:max-w-2xl">
          Simplify your links and get analytics with a tap. Free, fast, and secure.
        </p>
        <a
          href="#shorten"
          className="px-6 py-3 md:px-10 md:py-5 bg-gradient-to-r from-blue-700 to-purple-700 text-white rounded-full font-bold shadow md:text-lg lg:text-xl inline-block"
        >
          Shorten Now
        </a>
      </section>
    </div>
  );
}; 