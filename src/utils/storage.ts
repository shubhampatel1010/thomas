import { User, EmployerProfile, CandidateProfile, Job, Offer, CandidateMatch } from '../types';

const STORAGE_KEYS = {
  USERS: 'hiring_platform_users',
  CURRENT_USER: 'hiring_platform_current_user',
  EMPLOYER_PROFILES: 'hiring_platform_employer_profiles',
  CANDIDATE_PROFILES: 'hiring_platform_candidate_profiles',
  JOBS: 'hiring_platform_jobs',
  OFFERS: 'hiring_platform_offers',
  CANDIDATE_MATCHES: 'hiring_platform_candidate_matches',
};

export const storage = {
  getUsers: (): User[] => {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  },

  setUsers: (users: User[]) => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },

  setCurrentUser: (user: User | null) => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },

  getEmployerProfiles: (): EmployerProfile[] => {
    const data = localStorage.getItem(STORAGE_KEYS.EMPLOYER_PROFILES);
    return data ? JSON.parse(data) : [];
  },

  setEmployerProfiles: (profiles: EmployerProfile[]) => {
    localStorage.setItem(STORAGE_KEYS.EMPLOYER_PROFILES, JSON.stringify(profiles));
  },

  getCandidateProfiles: (): CandidateProfile[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CANDIDATE_PROFILES);
    return data ? JSON.parse(data) : [];
  },

  setCandidateProfiles: (profiles: CandidateProfile[]) => {
    localStorage.setItem(STORAGE_KEYS.CANDIDATE_PROFILES, JSON.stringify(profiles));
  },

  getJobs: (): Job[] => {
    const data = localStorage.getItem(STORAGE_KEYS.JOBS);
    return data ? JSON.parse(data) : [];
  },

  setJobs: (jobs: Job[]) => {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  },

  getOffers: (): Offer[] => {
    const data = localStorage.getItem(STORAGE_KEYS.OFFERS);
    return data ? JSON.parse(data) : [];
  },

  setOffers: (offers: Offer[]) => {
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers));
  },

  getCandidateMatches: (): Record<string, CandidateMatch[]> => {
    const data = localStorage.getItem(STORAGE_KEYS.CANDIDATE_MATCHES);
    return data ? JSON.parse(data) : {};
  },

  setCandidateMatches: (matches: Record<string, CandidateMatch[]>) => {
    localStorage.setItem(STORAGE_KEYS.CANDIDATE_MATCHES, JSON.stringify(matches));
  },
};
