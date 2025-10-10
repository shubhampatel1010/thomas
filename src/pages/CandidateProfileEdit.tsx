import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { CandidateProfile } from '../types';
import { storage } from '../utils/storage';

interface CandidateProfileEditProps {
  userId: string;
  onNavigate: (page: string) => void;
  onShowToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export default function CandidateProfileEdit({ userId, onNavigate, onShowToast }: CandidateProfileEditProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    country: '',
    jobInterest: '',
    skills: '',
    experience: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profiles = storage.getCandidateProfiles();
    const profile = profiles.find(p => p.userId === userId);
    if (profile) {
      setFormData({
        fullName: profile.fullName,
        phone: profile.phone,
        country: profile.country,
        jobInterest: profile.jobInterest,
        skills: profile.skills.join(', '),
        experience: profile.experience.toString(),
      });
    }
    setLoading(false);
  }, [userId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const profiles = storage.getCandidateProfiles();
    const updatedProfiles = profiles.map(p =>
      p.userId === userId
        ? {
            ...p,
            fullName: formData.fullName,
            phone: formData.phone,
            country: formData.country,
            jobInterest: formData.jobInterest,
            skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
            experience: parseInt(formData.experience),
          }
        : p
    );
    storage.setCandidateProfiles(updatedProfiles);

    onShowToast('Profile updated successfully!', 'success');
    onNavigate('candidate-dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('candidate-dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Profile</h1>
          <p className="text-gray-600 mb-8">Update your professional information</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="+1-555-0123"
                  required
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select Country</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Spain">Spain</option>
                  <option value="Italy">Italy</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="jobInterest" className="block text-sm font-medium text-gray-700 mb-2">
                Job Interest / Title <span className="text-red-500">*</span>
              </label>
              <select
                id="jobInterest"
                value={formData.jobInterest}
                onChange={(e) => setFormData({ ...formData, jobInterest: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              >
                <option value="">Select Job Interest</option>
                <option value="House Cleaner">House Cleaner</option>
                <option value="Live-in Nanny">Live-in Nanny</option>
                <option value="Personal Chef">Personal Chef</option>
                <option value="Housekeeper">Housekeeper</option>
                <option value="Elderly Care Assistant">Elderly Care Assistant</option>
                <option value="Gardener">Gardener</option>
                <option value="Personal Assistant">Personal Assistant</option>
                <option value="Pet Sitter">Pet Sitter</option>
                <option value="Laundry Specialist">Laundry Specialist</option>
                <option value="Live-out Babysitter">Live-out Babysitter</option>
              </select>
            </div>

            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                Skills <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="skills"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="e.g., Cleaning, Organization, Time Management (comma-separated)"
                required
              />
              <p className="mt-1 text-sm text-gray-500">Separate skills with commas</p>
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                min="0"
                max="50"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => onNavigate('candidate-dashboard')}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
