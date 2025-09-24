"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      setUploadComplete(true);
    }, 3000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/logs" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Logs
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Upload Log Files</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Upload New Log Files</h2>
            <p className="text-sm text-gray-600">Upload log files for AI-powered analysis and insights</p>
          </div>

          <div className="p-6">
            {!uploadComplete ? (
              <>
                {/* File Upload Area */}
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
                    dragActive
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    multiple
                    accept=".log,.txt"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-4">
                    <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Upload className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Drop log files here, or click to browse
                      </h3>
                      <p className="text-sm text-gray-600">
                        Supports .log and .txt files up to 100MB each
                      </p>
                    </div>
                  </div>
                </div>

                {/* Selected Files */}
                {files.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Selected Files</h3>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{file.name}</p>
                              <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setFiles(files.filter((_, i) => i !== index))}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload Button */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleUpload}
                    disabled={files.length === 0 || uploading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                  >
                    {uploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Files
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              /* Upload Success */
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Successful!</h3>
                <p className="text-gray-600 mb-6">
                  Your log files have been uploaded and are being processed by our AI system.
                </p>
                <div className="space-x-4">
                  <Link
                    href="/logs"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    View All Logs
                  </Link>
                  <button
                    onClick={() => {
                      setFiles([]);
                      setUploadComplete(false);
                    }}
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                  >
                    Upload More
                  </button>
                </div>
              </div>
            )}

            {/* Help Text */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900">Tips for better analysis:</h4>
                  <ul className="text-sm text-blue-800 mt-1 space-y-1">
                    <li>• Include timestamp information in your logs</li>
                    <li>• Use consistent log formats when possible</li>
                    <li>• Include error levels and context information</li>
                    <li>• Larger log files provide more comprehensive analysis</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}