import React from 'react';
import { Play, AlertTriangle, CheckCircle, TrendingUp, Clock } from 'lucide-react';

interface AnalysisTabProps {
  analysisResult: any | null;
}

export default function AnalysisTab({ analysisResult }: AnalysisTabProps) {
  if (!analysisResult) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-sand-100 rounded-full flex items-center justify-center mx-auto">
            <Play className="w-8 h-8 text-sand-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-700">No Analysis Available</h3>
            <p className="text-gray-500 mt-2">Upload and analyze a video to see results here</p>
          </div>
        </div>
      </div>
    );
  }

  const mockAnalysis = {
    score: 78,
    feedback: [
      "Good follow-through motion",
      "Maintain better balance during contact",
      "Increase hip rotation for more power"
    ],
    mistakes: [
      { timestamp: 1.2, description: "Low elbow position", severity: 'medium' as const },
      { timestamp: 2.1, description: "Poor weight transfer", severity: 'high' as const },
      { timestamp: 3.5, description: "Late racket preparation", severity: 'low' as const }
    ],
    improvements: [
      "Focus on early racket preparation",
      "Practice shadow swings for muscle memory",
      "Work on core strength for better rotation"
    ]
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Score Overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-sand-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Analysis Results</h2>
          <div className="flex items-center space-x-2">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              mockAnalysis.score >= 80 ? 'bg-emerald-100' : 
              mockAnalysis.score >= 60 ? 'bg-orange-100' : 'bg-red-100'
            }`}>
              <span className={`text-lg font-bold ${
                mockAnalysis.score >= 80 ? 'text-emerald-600' : 
                mockAnalysis.score >= 60 ? 'text-orange-600' : 'text-red-600'
              }`}>
                {mockAnalysis.score}
              </span>
            </div>
          </div>
        </div>
        
        {/* Video Preview */}
        <div className="bg-gray-900 rounded-xl aspect-video flex items-center justify-center mb-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
            <p className="text-white text-lg">Analysis Video with Overlay</p>
            <p className="text-gray-300 text-sm">Click to play slow-motion breakdown</p>
          </div>
        </div>

        {/* Quick Feedback */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockAnalysis.feedback.map((item, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-sky-50 rounded-xl border border-sky-200">
              <CheckCircle className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-sky-800">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detected Mistakes */}
      <div className="bg-white rounded-2xl shadow-sm border border-sand-200 p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Detected Issues</h3>
        <div className="space-y-4">
          {mockAnalysis.mistakes.map((mistake, index) => (
            <div key={index} className={`p-4 rounded-xl border ${getSeverityColor(mistake.severity)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{mistake.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">At {mistake.timestamp}s</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                  mistake.severity === 'high' ? 'bg-red-100 text-red-700' :
                  mistake.severity === 'medium' ? 'bg-orange-100 text-orange-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {mistake.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Improvements */}
      <div className="bg-white rounded-2xl shadow-sm border border-sand-200 p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Recommended Improvements</h3>
        <div className="space-y-4">
          {mockAnalysis.improvements.map((improvement, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <TrendingUp className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <p className="text-emerald-800">{improvement}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}