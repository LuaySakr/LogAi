"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, Bell, Calendar, Plus, Settings } from "lucide-react";

interface Anomaly {
  id: number;
  type: string;
  description: string;
  severity: string;
  status: string;
  confidence_score: number;
  created_at: string;
}

interface AlertRule {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
}

export default function AlertsPage() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [alertRules, setAlertRules] = useState<AlertRule[]>([]);
  const [activeTab, setActiveTab] = useState<'anomalies' | 'rules'>('anomalies');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      setAnomalies([
        {
          id: 1,
          type: "error_spike",
          description: "Unusual spike in error rates detected - 300% increase in database connection errors",
          severity: "critical",
          status: "open",
          confidence_score: 0.95,
          created_at: "2024-01-15T10:30:00Z"
        },
        {
          id: 2,
          type: "unusual_pattern",
          description: "Abnormal access pattern detected - Multiple failed login attempts from single IP",
          severity: "high",
          status: "acknowledged",
          confidence_score: 0.87,
          created_at: "2024-01-15T08:15:00Z"
        }
      ]);
      
      setAlertRules([
        {
          id: 1,
          name: "Critical Error Threshold",
          description: "Alert when error rate exceeds 10% within 5 minutes",
          is_active: true,
          created_at: "2024-01-10T12:00:00Z"
        },
        {
          id: 2,
          name: "Memory Usage Alert",
          description: "Alert when memory usage exceeds 90% for more than 2 minutes",
          is_active: true,
          created_at: "2024-01-08T15:30:00Z"
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800';
      case 'acknowledged':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Alerts & Anomalies</h1>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              New Alert Rule
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('anomalies')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'anomalies'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <AlertTriangle className="h-4 w-4 inline mr-2" />
              Anomalies ({anomalies.length})
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'rules'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Settings className="h-4 w-4 inline mr-2" />
              Alert Rules ({alertRules.length})
            </button>
          </nav>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading alerts...</p>
          </div>
        ) : (
          <div>
            {activeTab === 'anomalies' ? (
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Detected Anomalies</h2>
                  <p className="text-sm text-gray-600">AI-detected unusual patterns in your logs</p>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {anomalies.map((anomaly) => (
                    <div key={anomaly.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                            <span className="font-medium text-gray-900 capitalize">
                              {anomaly.type.replace('_', ' ')}
                            </span>
                            <span className={`ml-3 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(anomaly.severity)}`}>
                              {anomaly.severity}
                            </span>
                            <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(anomaly.status)}`}>
                              {anomaly.status}
                            </span>
                          </div>
                          
                          <p className="text-gray-700 mb-3">
                            {anomaly.description}
                          </p>
                          
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="mr-4">
                              Confidence: {Math.round(anomaly.confidence_score * 100)}%
                            </span>
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>
                              {new Date(anomaly.created_at).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        
                        <div className="ml-6 flex space-x-2">
                          {anomaly.status === 'open' && (
                            <button className="px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                              Acknowledge
                            </button>
                          )}
                          <button className="px-3 py-1 text-sm font-medium text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Alert Rules</h2>
                  <p className="text-sm text-gray-600">Configure when and how you want to be notified</p>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {alertRules.map((rule) => (
                    <div key={rule.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <Bell className="h-5 w-5 text-blue-500 mr-2" />
                            <h3 className="font-medium text-gray-900">{rule.name}</h3>
                            <span className={`ml-3 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              rule.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {rule.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-2">{rule.description}</p>
                          
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Created {new Date(rule.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="ml-6 flex space-x-2">
                          <button className="px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                            Edit
                          </button>
                          <button className="px-3 py-1 text-sm font-medium text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                            {rule.is_active ? 'Disable' : 'Enable'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}