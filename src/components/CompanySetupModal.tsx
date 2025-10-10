import { useState } from 'react';
import Modal from './Modal';
import { EmployerProfile } from '../types';
import { storage } from '../utils/storage';

interface CompanySetupModalProps {
  isOpen: boolean;
  userId: string;
  onComplete: () => void;
  onShowToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export default function CompanySetupModal({ isOpen, userId, onComplete, onShowToast }: CompanySetupModalProps) {
  const [formData, setFormData] = useState<Omit<EmployerProfile, 'userId'>>({
    companyName: '',
    industry: '',
    companySize: '',
    location: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const profile: EmployerProfile = {
      ...formData,
      userId,
    };

    const profiles = storage.getEmployerProfiles();
    storage.setEmployerProfiles([...profiles, profile]);

    const users = storage.getUsers();
    const updatedUsers = users.map(u =>
      u.id === userId ? { ...u, profileComplete: true } : u
    );
    storage.setUsers(updatedUsers);

    const currentUser = storage.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      storage.setCurrentUser({ ...currentUser, profileComplete: true });
    }

    onShowToast('Company profile created successfully!', 'success');
    onComplete();
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} title="Complete Your Company Profile" maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
              Industry <span className="text-red-500">*</span>
            </label>
            <select
              id="industry"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            >
              <option value="">Select Industry</option>
              <option value="Household Services">Household Services</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-2">
              Company Size <span className="text-red-500">*</span>
            </label>
            <select
              id="companySize"
              value={formData.companySize}
              onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            >
              <option value="">Select Size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="500+">500+ employees</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location / Country <span className="text-red-500">*</span>
          </label>
          
          <select
            id="country"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            required
          >
            <option value="">Select Country</option>
            <option value="Singapore">Singapore</option>
            <option value="Philippines">Philippines</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Company Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            placeholder="Tell us about your company..."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Complete Setup
        </button>
      </form>
    </Modal>
  );
}
