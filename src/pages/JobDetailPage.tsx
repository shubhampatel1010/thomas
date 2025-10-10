import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, MapPin, DollarSign, FileText, User, CheckCircle, Send, CreditCard } from 'lucide-react';
import { Job, CandidateProfile, CandidateMatch, Offer } from '../types';
import { storage } from '../utils/storage';

interface JobDetailPageProps {
  jobId: string;
  onNavigate: (page: string) => void;
  onShowToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export default function JobDetailPage({ jobId, onNavigate, onShowToast }: JobDetailPageProps) {
  const [job, setJob] = useState<Job | null>(null);
  const [matches, setMatches] = useState<CandidateMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jobs = storage.getJobs();
    const foundJob = jobs.find(j => j.id === jobId);
    if (foundJob) {
      setJob(foundJob);
      findMatchingCandidates(foundJob);
    }
    setLoading(false);
  }, [jobId]);

  const findMatchingCandidates = (job: Job) => {
    const candidates = storage.getCandidateProfiles();
    const allMatches = storage.getCandidateMatches();
    const jobMatches = allMatches[jobId] || [];

    const matchedCandidates: CandidateMatch[] = candidates
      .filter(candidate => {
        const countryMatch = candidate.country === job.country;
        const titleMatch = job.keywords.some(keyword =>
          candidate.jobInterest.toLowerCase().includes(keyword.toLowerCase()) ||
          keyword.toLowerCase().includes(candidate.jobInterest.toLowerCase())
        );
        return countryMatch && titleMatch;
      })
      .map(candidate => {
        const existingMatch = jobMatches.find(m => m.candidate.userId === candidate.userId);
        if (existingMatch) {
          return existingMatch;
        }

        let matchScore = 0;
        if (candidate.country === job.country) matchScore += 40;

        const titleWords = job.title.toLowerCase().split(' ');
        const interestWords = candidate.jobInterest.toLowerCase().split(' ');
        const commonWords = titleWords.filter(word => interestWords.includes(word));
        matchScore += Math.min(commonWords.length * 15, 45);

        const keywordMatches = job.keywords.filter(keyword =>
          candidate.skills.some(skill => skill.toLowerCase().includes(keyword.toLowerCase()))
        );
        matchScore += Math.min(keywordMatches.length * 5, 15);

        return {
          candidate,
          matchScore: Math.min(matchScore, 100),
          status: 'pending' as const,
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);

    setMatches(matchedCandidates);
  };

  const updateMatchStatus = (candidateId: string, newStatus: CandidateMatch['status']) => {
    const updatedMatches = matches.map(match =>
      match.candidate.userId === candidateId
        ? { ...match, status: newStatus }
        : match
    );
    setMatches(updatedMatches);

    const allMatches = storage.getCandidateMatches();
    allMatches[jobId] = updatedMatches;
    storage.setCandidateMatches(allMatches);
  };

  const handleScheduleMeeting = (candidate: CandidateProfile) => {
    const calendlyLink = `https://calendly.com/demo-meeting?email=${encodeURIComponent(candidate.email)}`;
    onShowToast(`Calendly meeting link generated and sent to ${candidate.fullName}`, 'success');
    updateMatchStatus(candidate.userId, 'meeting_scheduled');
  };

  const handleSelectCandidate = (candidate: CandidateProfile) => {
    updateMatchStatus(candidate.userId, 'selected');
    onShowToast(`${candidate.fullName} has been selected for this position`, 'success');
  };

  const handleSendOffer = (candidate: CandidateProfile) => {
    if (!job) return;

    const offer: Offer = {
      id: `offer-${Date.now()}`,
      jobId: job.id,
      candidateId: candidate.userId,
      employerId: job.employerId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      jobTitle: job.title,
      employerName: job.employerName,
    };

    const offers = storage.getOffers();
    storage.setOffers([...offers, offer]);

    updateMatchStatus(candidate.userId, 'offer_sent');
    onShowToast(`Offer letter sent to ${candidate.fullName}`, 'success');
  };

  const handleCreatePaymentLink = (candidate: CandidateProfile) => {
    if (!job) return;

    const paymentLink = `https://payment.demo/pay/${job.id}/${candidate.userId}`;

    const webhookPayload = {
      candidateDetails: {
        name: candidate.fullName,
        email: candidate.email,
        phone: candidate.phone,
      },
      jobDetails: {
        title: job.title,
        salaryRange: job.salaryRange,
      },
      employerDetails: {
        employerId: job.employerId,
      },
      offerAmount: job.salaryRange,
    };

    console.log('Webhook triggered with payload:', webhookPayload);

    onShowToast(`Payment link created: ${paymentLink}`, 'success');
    updateMatchStatus(candidate.userId, 'payment_sent');
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-blue-600 bg-blue-50';
    return 'text-orange-600 bg-orange-50';
  };

  if (loading || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate('employer-dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
              <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Posted {formatDate(job.postedDate)}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {job.country}
                </span>
                <span className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  {job.salaryRange}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {job.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Job Description</h2>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Requirements</h2>
              <p className="text-gray-700 leading-relaxed">{job.requirements}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Category</h2>
              <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">
                {job.category}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Matching Candidates ({matches.length})
          </h2>

          {matches.length === 0 ? (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Matching Candidates</h3>
              <p className="text-gray-600">
                No candidates match the criteria for this job yet. Check back later!
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {matches.map((match) => (
                <div key={match.candidate.userId} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-6">
                    <img
                      src={match.candidate.photoUrl || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200'}
                      alt={match.candidate.fullName}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{match.candidate.fullName}</h3>
                          <p className="text-gray-600">{match.candidate.jobInterest}</p>
                        </div>
                        <span className={`px-4 py-2 rounded-full font-semibold ${getMatchScoreColor(match.matchScore)}`}>
                          {match.matchScore}% Match
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
                        <div>📍 {match.candidate.country}</div>
                        <div>📧 {match.candidate.email}</div>
                        <div>📱 {match.candidate.phone}</div>
                        <div>⏱ {match.candidate.experience} years experience</div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {match.candidate.skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {match.status === 'pending' && (
                          <button
                            onClick={() => handleScheduleMeeting(match.candidate)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Calendar className="w-4 h-4" />
                            Create Calendly Meeting
                          </button>
                        )}

                        {match.status === 'meeting_scheduled' && (
                          <>
                            <span className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 font-medium rounded-lg">
                              <CheckCircle className="w-4 h-4" />
                              Meeting Scheduled
                            </span>
                            <button
                              onClick={() => handleSelectCandidate(match.candidate)}
                              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Select Candidate
                            </button>
                          </>
                        )}

                        {match.status === 'selected' && (
                          <>
                            <span className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 font-medium rounded-lg">
                              <CheckCircle className="w-4 h-4" />
                              Selected
                            </span>
                            <button
                              onClick={() => handleSendOffer(match.candidate)}
                              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                            >
                              <Send className="w-4 h-4" />
                              Send Offer Letter
                            </button>
                          </>
                        )}

                        {match.status === 'offer_sent' && (
                          <span className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 font-medium rounded-lg">
                            <Send className="w-4 h-4" />
                            Offer Sent - Awaiting Response
                          </span>
                        )}

                        {match.status === 'offer_accepted' && (
                          <>
                            <span className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 font-medium rounded-lg">
                              <CheckCircle className="w-4 h-4" />
                              Offer Accepted
                            </span>
                            <button
                              onClick={() => handleCreatePaymentLink(match.candidate)}
                              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <CreditCard className="w-4 h-4" />
                              Create Payment Link
                            </button>
                          </>
                        )}

                        {match.status === 'payment_sent' && (
                          <span className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 font-medium rounded-lg">
                            <CheckCircle className="w-4 h-4" />
                            Payment Link Sent
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
