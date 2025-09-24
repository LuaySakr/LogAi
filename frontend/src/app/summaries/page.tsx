"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Brain, Calendar, Eye } from "lucide-react";

interface Summary {
  id: number;
  title: string;
  content: string;
  severity: string;
  upload_id: number;
  created_at: string;
}

export default function SummariesPage() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now
    setTimeout(() => {
      setSummaries([
        {
          id: 1,
          title: "Critical Error Analysis - app-error.log",
          content: "Found 45 error instances with high memory usage patterns. Multiple database connection timeouts detected.",
          severity: "critical",
          upload_id: 1,
          created_at: "2024-01-15T10:30:00Z"
        },
        {
          id: 2,
          title: "Access Pattern Summary - nginx-access.log",
          content: "Normal traffic patterns with slight increase in 404 errors. No security threats detected.",
          severity: "low",
          upload_id: 2,
          created_at: "2024-01-15T09:15:00Z"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">AI Summaries</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading summaries...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">AI-Generated Log Summaries</h2>
                <p className="text-sm text-gray-600">Key insights and analysis from your log files</p>
              </div>
              
              <div className="divide-y divide-gray-200">
                {summaries.map((summary) => (
                  <div key={summary.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Brain className="h-5 w-5 text-blue-500 mr-2" />
                          <h3 className="text-lg font-medium text-gray-900">
                            {summary.title}
                          </h3>
                          <span className={`ml-3 inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getSeverityColor(summary.severity)}`}>
                            {summary.severity}
                          </span>
                        </div>
                        
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {summary.content}
                        </p>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="mr-4">
                            {new Date(summary.created_at).toLocaleString()}
                          </span>
                          <FileText className="h-4 w-4 mr-1" />
                          <span>Log ID: {summary.upload_id}</span>
                        </div>
                      </div>
                      
                      <div className="ml-6 flex-shrink-0">
                        <Link
                          href={`/summaries/${summary.id}`}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}