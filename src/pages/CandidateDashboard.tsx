import { useEffect, useState } from 'react';
import { Briefcase, MapPin, DollarSign, Calendar, CheckCircle, Clock, CreditCard } from 'lucide-react';
import { Job, CandidateProfile, Offer } from '../types';
import { storage } from '../utils/storage';

interface CandidateDashboardProps {
  userId: string;
  onNavigate: (page: string, data?: any) => void;
  onShowToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export default function CandidateDashboard({ userId, onNavigate, onShowToast }: CandidateDashboardProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const profiles = storage.getCandidateProfiles();
    const myProfile = profiles.find(p => p.userId === userId);
    if (myProfile) {
      setProfile(myProfile);

      const allJobs = storage.getJobs();
      const allMatches = storage.getCandidateMatches();

      const selectedJobs = allJobs.filter(job => {
        const jobMatches = allMatches[job.id] || [];
        const isSelected = jobMatches.some(match =>
          match.candidate.userId === userId &&
          (match.status === 'selected' || match.status === 'offer_sent' || match.status === 'offer_accepted' || match.status === 'payment_sent')
        );
        return isSelected;
      });

      const employerProfiles = storage.getEmployerProfiles();
      const jobsWithEmployerNames = selectedJobs.map(job => {
        const employer = employerProfiles.find(e => e.userId === job.employerId);
        return {
          ...job,
          employerName: employer?.companyName || 'Professional Employer'
        };
      });

      setJobs(jobsWithEmployerNames);

      const allOffers = storage.getOffers();
      const myOffers = allOffers.filter(offer => offer.candidateId === userId);
      setOffers(myOffers);
    }
  }, [userId]);

  const handleAcceptOffer = (offerId: string) => {
    const allOffers = storage.getOffers();
    const updatedOffers = allOffers.map(offer =>
      offer.id === offerId ? { ...offer, status: 'accepted' as const } : offer
    );
    storage.setOffers(updatedOffers);

    const offer = updatedOffers.find(o => o.id === offerId);
    if (offer) {
      const allMatches = storage.getCandidateMatches();
      const jobMatches = allMatches[offer.jobId] || [];
      const updatedMatches = jobMatches.map(match =>
        match.candidate.userId === userId
          ? { ...match, status: 'offer_accepted' as const }
          : match
      );
      allMatches[offer.jobId] = updatedMatches;
      storage.setCandidateMatches(allMatches);
    }

    setOffers(updatedOffers.filter(o => o.candidateId === userId));
    onShowToast('Offer accepted successfully! The employer will send you the payment link.', 'success');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getStatusBadge = (status: Offer['status']) => {
    const statusConfig = {
      pending: { text: 'Pending Review', color: 'bg-yellow-50 text-yellow-700' },
      accepted: { text: 'Offer Accepted', color: 'bg-green-50 text-green-700' },
      payment_pending: { text: 'Payment Pending', color: 'bg-blue-50 text-blue-700' },
      completed: { text: 'Completed', color: 'bg-gray-50 text-gray-700' },
    };
    const config = statusConfig[status];
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {profile?.fullName}!</h1>
          <p className="text-gray-600">Discover job opportunities matching your profile</p>
        </div>

        {offers.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Offers ({offers.length})</h2>
            <div className="space-y-4">
              {offers.map((offer) => (
                <div key={offer.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{offer.jobTitle}</h3>
                    <p className="text-sm text-gray-600 mb-2">From: {offer.employerName || 'Employer'}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(offer.createdAt)}
                      </span>
                      {getStatusBadge(offer.status)}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {offer.status === 'pending' && (
                      <button
                        onClick={() => handleAcceptOffer(offer.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Accept Offer
                      </button>
                    )}
                    {offer.status === 'accepted' && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
                        <Clock className="w-4 h-4" />
                        Awaiting Payment Link
                      </div>
                    )}
                    {offer.status === 'payment_pending' && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-lg">
                        <CreditCard className="w-4 h-4" />
                        Payment Processing
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Matching Jobs for You</h2>

          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Matching Jobs Yet</h3>
              <p className="text-gray-600">
                Keep your profile updated to get matched with relevant opportunities!
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {jobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                      <p className="text-gray-600 mb-3">{job.employerName || 'Professional Employer'}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.country}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {job.salaryRange}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Posted {formatDate(job.postedDate)}
                        </span>
                      </div>
                      <p className="text-gray-700 line-clamp-2 mb-3">{job.description}</p>
                      <div className="flex flex-wrap gap-2">
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
                    <button
                      onClick={() => onNavigate('candidate-job-detail', { jobId: job.id })}
                      className="ml-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{jobs.length}</div>
                <div className="text-sm text-gray-600">Matching Jobs</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{offers.length}</div>
                <div className="text-sm text-gray-600">Job Offers</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{profile?.experience || 0}</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
