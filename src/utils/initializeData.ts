import { storage } from './storage';
import { dummyJobs, dummyCandidates } from './dummyData';
import { User, CandidateProfile, Job, EmployerProfile } from '../types';

export const initializeData = () => {
  const jobs = storage.getJobs();
  const candidates = storage.getCandidateProfiles();

  if (jobs.length === 0) {
    const employerId = 'employer-demo-001';
    const employerUser: User = {
      id: employerId,
      email: 'demo@employer.com',
      role: 'employer',
      profileComplete: true,
    };

    const users = storage.getUsers();
    if (!users.find(u => u.id === employerId)) {
      storage.setUsers([...users, employerUser]);
    }

    const employerProfiles = storage.getEmployerProfiles();
    if (!employerProfiles.find(p => p.userId === employerId)) {
      const demoEmployerProfile: EmployerProfile = {
        userId: employerId,
        companyName: 'Demo Household Services',
        industry: 'Household Services',
        companySize: '11-50',
        location: 'United States',
        description: 'Leading provider of household staffing services'
      };
      storage.setEmployerProfiles([...employerProfiles, demoEmployerProfile]);
    }

    const newJobs: Job[] = dummyJobs.map((job, index) => ({
      ...job,
      id: `job-${Date.now()}-${index}`,
      employerId: employerId,
      postedDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    }));

    storage.setJobs(newJobs);
  }

  if (candidates.length === 0) {
    const newCandidates: CandidateProfile[] = dummyCandidates.map((candidate, index) => {
      const candidateId = `candidate-${Date.now()}-${index}`;
      const candidateUser: User = {
        id: candidateId,
        email: candidate.email,
        role: 'candidate',
        profileComplete: true,
      };

      const users = storage.getUsers();
      if (!users.find(u => u.id === candidateId)) {
        storage.setUsers([...users, candidateUser]);
      }

      return {
        ...candidate,
        userId: candidateId,
      };
    });

    storage.setCandidateProfiles(newCandidates);
  }
};
