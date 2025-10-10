import { useEffect, useState } from 'react';
import { Briefcase, Plus, Eye, Calendar } from 'lucide-react';
import { Job } from '../types';
import { storage } from '../utils/storage';

interface EmployerDashboardProps {
  userId: string;
  onNavigate: (page: string, data?: any) => void;
  onShowToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export default function EmployerDashboard({ userId, onNavigate, onShowToast }: EmployerDashboardProps) {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const allJobs = storage.getJobs();
    const myJobs = allJobs.filter(job => job.employerId === userId);
    setJobs(myJobs);
  }, [userId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={() => onNavigate('add-job')}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Job Posting
            </button>
          </div>
          <p className="text-gray-600">Manage your job postings for Domestic Workers</p>
        </div>

        <div className="grid gap-6">
          {jobs.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Job Postings Yet</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first job posting</p>
              <button
                onClick={() => onNavigate('add-job')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Job Posting
              </button>
            </div>
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Posted {formatDate(job.postedDate)}
                          </span>
                          <span>📍 {job.country}</span>
                          <span>💰 {job.salaryRange}</span>
                        </div>
                        <p className="text-gray-700 line-clamp-2">{job.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {job.keywords.map((keyword, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('job-detail', { jobId: job.id })}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors ml-4"
                  >
                    <Eye className="w-4 h-4" />
                    View Job
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{jobs.length}</div>
                <div className="text-sm text-gray-600">Active Jobs</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-600">Interviews Scheduled</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
