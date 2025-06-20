import React from 'react';
import { Calendar, TrendingUp, Video, Award, BarChart3, Clock } from 'lucide-react';

export default function ProfileTab() {
  const mockHistory = [
    {
      id: '1',
      filename: 'forehand_practice_01.mp4',
      date: '2024-01-15',
      model: 'Federer',
      score: 78,
      analyzed: true
    },
    {
      id: '2', 
      filename: 'backhand_drill.mp4',
      date: '2024-01-12',
      model: 'Standard',
      score: 65,
      analyzed: true
    },
    {
      id: '3',
      filename: 'serve_practice.mp4',
      date: '2024-01-10',
      model: 'Nadal',
      score: 82,
      analyzed: true
    }
  ];

  const averageScore = Math.round(mockHistory.reduce((acc, item) => acc + item.score, 0) / mockHistory.length);

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-sky-50 to-emerald-50 rounded-2xl p-8 border border-sky-200">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-sky-500 rounded-full flex items-center justify-center">
            <Award className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Your Tennis Journey</h2>
            <p className="text-gray-600 mt-1">Keep practicing to improve your technique</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-sand-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Total Videos</h3>
            <Video className="w-5 h-5 text-sky-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{mockHistory.length}</p>
          <p className="text-sm text-gray-500 mt-1">Analyzed sessions</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-sand-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Average Score</h3>
            <BarChart3 className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{averageScore}</p>
          <p className="text-sm text-emerald-600 mt-1">↑ Improving</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-sand-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Best Score</h3>
            <TrendingUp className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{Math.max(...mockHistory.map(h => h.score))}</p>
          <p className="text-sm text-gray-500 mt-1">Personal best</p>
        </div>
      </div>

      {/* Upload History */}
      <div className="bg-white rounded-2xl shadow-sm border border-sand-200 p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Analyses</h3>
        <div className="space-y-4">
          {mockHistory.map((item) => (
            <div key={item.id} className="border border-sand-200 rounded-xl p-6 hover:bg-sand-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                    <Video className="w-6 h-6 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{item.filename}</h4>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                      <span>•</span>
                      <span>Model: {item.model}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.score >= 80 ? 'bg-emerald-100 text-emerald-700' :
                    item.score >= 60 ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    Score: {item.score}
                  </div>
                  <button className="text-sky-600 hover:bg-sky-50 px-3 py-1 rounded-lg text-sm font-medium transition-colors">
                    Re-analyze
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Chart Placeholder */}
      <div className="bg-white rounded-2xl shadow-sm border border-sand-200 p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Progress Over Time</h3>
        <div className="h-64 bg-gradient-to-r from-sky-50 to-emerald-50 rounded-xl flex items-center justify-center border border-sky-200">
          <div className="text-center space-y-2">
            <BarChart3 className="w-12 h-12 text-sky-600 mx-auto" />
            <p className="text-gray-600">Progress chart coming soon</p>
            <p className="text-sm text-gray-500">Track your improvement over time</p>
          </div>
        </div>
      </div>
    </div>
  );
}