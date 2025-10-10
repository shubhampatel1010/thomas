export interface User {
  id: string;
  email: string;
  role: 'candidate' | 'employer';
  profileComplete: boolean;
}

export interface EmployerProfile {
  userId: string;
  companyName: string;
  industry: string;
  companySize: string;
  location: string;
  description: string;
}

export interface CandidateProfile {
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  jobInterest: string;
  skills: string[];
  experience: number;
  resumeUrl?: string;
  photoUrl?: string;
}

export interface Job {
  id: string;
  employerId: string;
  title: string;
  description: string;
  keywords: string[];
  country: string;
  category: string;
  salaryRange: string;
  requirements: string;
  postedDate: string;
  employerName?: string;
}

export interface CandidateMatch {
  candidate: CandidateProfile;
  matchScore: number;
  status: 'pending' | 'meeting_scheduled' | 'selected' | 'offer_sent' | 'offer_accepted' | 'payment_sent';
}

export interface Offer {
  id: string;
  jobId: string;
  candidateId: string;
  employerId: string;
  status: 'pending' | 'accepted' | 'payment_pending' | 'completed';
  createdAt: string;
  jobTitle?: string;
  employerName?: string;
}
