import React, { useState, useRef } from 'react';
import { Upload, Play, Users, Award, Target } from 'lucide-react';

interface UploadTabProps {
  onAnalyze: (file: File, model: string) => void;
}

const models = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'General tennis technique analysis',
    icon: Target,
    color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
  },
  {
    id: 'federer',
    name: 'Federer',
    description: 'Analysis based on Roger Federer\'s technique',
    icon: Award,
    color: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
  },
  {
    id: 'nadal',
    name: 'Nadal',
    description: 'Analysis based on Rafael Nadal\'s technique',
    icon: Users,
    color: 'bg-orange-50 border-orange-200 hover:bg-orange-100'
  }
];

export default function UploadTab({ onAnalyze }: UploadTabProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('standard');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('video/')) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onAnalyze(selectedFile, selectedModel);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-sand-200 p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Upload Practice Video</h2>
        <p className="text-gray-600 mb-6">Record your tennis stroke and let AI analyze your technique</p>
        
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
            isDragging
              ? 'border-sky-400 bg-sky-50'
              : selectedFile
              ? 'border-emerald-300 bg-emerald-50'
              : 'border-sand-300 bg-sand-50 hover:bg-sand-100'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          />
          
          {selectedFile ? (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <Play className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <p className="text-lg font-medium text-emerald-700">{selectedFile.name}</p>
                <p className="text-sm text-emerald-600">
                  {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-sky-600" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700">
                  Drop your video here or click to browse
                </p>
                <p className="text-sm text-gray-500">MP4, WebM up to 50MB</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Model Selection */}
      <div className="bg-white rounded-2xl shadow-sm border border-sand-200 p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Choose Analysis Model</h2>
        <p className="text-gray-600 mb-6">Select the technique style you want to compare against</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {models.map((model) => {
            const IconComponent = model.icon;
            return (
              <div
                key={model.id}
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                  selectedModel === model.id
                    ? 'border-sky-400 bg-sky-50 shadow-md'
                    : model.color
                }`}
                onClick={() => setSelectedModel(model.id)}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedModel === model.id ? 'bg-sky-100' : 'bg-white'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${
                      selectedModel === model.id ? 'text-sky-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{model.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{model.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analyze Button */}
      <div className="flex justify-center">
        <button
          onClick={handleAnalyze}
          disabled={!selectedFile}
          className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
            selectedFile
              ? 'bg-sky-500 hover:bg-sky-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Analyze Stroke
        </button>
      </div>
    </div>
  );
}