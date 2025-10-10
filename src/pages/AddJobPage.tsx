import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Job } from "../types";
import { storage } from "../utils/storage";

interface AddJobPageProps {
  userId: string;
  onNavigate: (page: string) => void;
  onShowToast: (message: string, type: "success" | "error" | "info") => void;
}

export default function AddJobPage({
  userId,
  onNavigate,
  onShowToast,
}: AddJobPageProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    keywords: "",
    country: "",
    category: "Domestic Workers",
    salaryRange: "",
    requirements: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newJob: Job = {
      id: `job-${Date.now()}`,
      employerId: userId,
      title: formData.title,
      description: formData.description,
      keywords: formData.keywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k),
      country: formData.country,
      category: formData.category,
      salaryRange: formData.salaryRange,
      requirements: formData.requirements,
      postedDate: new Date().toISOString(),
    };

    const jobs = storage.getJobs();
    storage.setJobs([...jobs, newJob]);

    onShowToast("Job posting created successfully!", "success");
    onNavigate("employer-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate("employer-dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add Job Posting
          </h1>
          <p className="text-gray-600 mb-8">
            Fill in the details to create a new job posting
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="e.g., House Cleaner"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder="Describe the job responsibilities..."
                required
              />
            </div>

            <div>
              <label
                htmlFor="keywords"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Keywords (for matching) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="keywords"
                value={formData.keywords}
                onChange={(e) =>
                  setFormData({ ...formData, keywords: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="e.g., cleaning, housekeeping, domestic (comma-separated)"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Separate keywords with commas
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  id="country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select Country</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Philippines">Philippines</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Job Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select Job Category</option>
                  <option value="Domestic Work">Domestic Work</option>
                  <option value="International Work">International Work</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="salaryRange"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Salary Range <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="salaryRange"
                value={formData.salaryRange}
                onChange={(e) =>
                  setFormData({ ...formData, salaryRange: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="e.g., $15-$20 per hour"
                required
              />
            </div>

            <div>
              <label
                htmlFor="requirements"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Requirements <span className="text-red-500">*</span>
              </label>
              <textarea
                id="requirements"
                rows={4}
                value={formData.requirements}
                onChange={(e) =>
                  setFormData({ ...formData, requirements: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder="List the job requirements..."
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => onNavigate("employer-dashboard")}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Job Posting
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
