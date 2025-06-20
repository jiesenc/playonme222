import React, { useState } from 'react';
import { Upload, BarChart3, User, Menu, X, CreditCard } from 'lucide-react';
import UploadTab from './components/UploadTab';
import AnalysisTab from './components/AnalysisTab';
import ProfileTab from './components/ProfileTab';
import PricingTab from './components/PricingTab';
import type { TabType } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('upload');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: 'upload' as TabType, name: 'Upload', icon: Upload },
    { id: 'analysis' as TabType, name: 'Analysis', icon: BarChart3 },
    { id: 'profile' as TabType, name: 'Profile', icon: User },
    { id: 'pricing' as TabType, name: 'Pricing', icon: CreditCard },
  ];

  const handleAnalyze = (file: File, model: string) => {
    // Simulate analysis process
    setTimeout(() => {
      setAnalysisResult({ file, model, timestamp: Date.now() });
      setActiveTab('analysis');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sand-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-sand-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Playonme</h1>
                <p className="text-xs text-gray-500 hidden sm:block">AI Tennis Coach</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-sky-100 text-sky-700 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-sand-200 bg-white">
            <nav className="px-4 py-2 space-y-1">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-sky-100 text-sky-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section (only on upload tab) */}
        {activeTab === 'upload' && (
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
              Your personal tennis coach,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500"> anytime, anywhere</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload your practice videos and get instant AI-powered analysis to improve your technique like the pros
            </p>
          </div>
        )}

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {activeTab === 'upload' && <UploadTab onAnalyze={handleAnalyze} />}
          {activeTab === 'analysis' && <AnalysisTab analysisResult={analysisResult} />}
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'pricing' && <PricingTab />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-sand-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <span className="text-gray-600">Train smarter. Play better.</span>
            </div>
            <div className="text-sm text-gray-500">
              <a href="mailto:hello@playonme.ai" className="hover:text-sky-600 transition-colors">
                hello@playonme.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;