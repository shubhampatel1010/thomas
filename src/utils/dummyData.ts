import { CandidateProfile, Job } from '../types';

export const dummyJobs: Omit<Job, 'id' | 'employerId' | 'postedDate'>[] = [
  {
    title: 'House Cleaner',
    description: 'Looking for a reliable and experienced house cleaner to maintain a clean and organized home environment.',
    keywords: ['cleaning', 'house', 'domestic', 'housekeeping'],
    country: 'United States',
    category: 'Domestic Workers',
    salaryRange: '$15-$20 per hour',
    requirements: 'Experience in residential cleaning, attention to detail, reliable transportation',
    employerName: 'Smith Family'
  },
  {
    title: 'Live-in Nanny',
    description: 'Seeking a caring and responsible nanny to provide childcare for two children aged 3 and 5.',
    keywords: ['nanny', 'childcare', 'live-in', 'babysitter'],
    country: 'United Kingdom',
    category: 'Domestic Workers',
    salaryRange: '£25,000-£30,000 per year',
    requirements: 'Childcare certification, CPR certified, previous nanny experience required',
    employerName: 'Johnson Household'
  },
  {
    title: 'Personal Chef',
    description: 'Professional personal chef needed to prepare healthy meals for a family of four.',
    keywords: ['chef', 'cooking', 'meal prep', 'culinary'],
    country: 'Canada',
    category: 'Domestic Workers',
    salaryRange: 'CAD $40,000-$50,000 per year',
    requirements: 'Culinary degree or equivalent, experience with dietary restrictions, food safety certification',
    employerName: 'Miller Family'
  },
  {
    title: 'Housekeeper',
    description: 'Full-time housekeeper needed for large estate. Duties include cleaning, laundry, and light organization.',
    keywords: ['housekeeper', 'cleaning', 'laundry', 'estate'],
    country: 'United States',
    category: 'Domestic Workers',
    salaryRange: '$35,000-$45,000 per year',
    requirements: 'Professional housekeeping experience, references required, ability to work independently',
    employerName: 'Anderson Estate'
  },
  {
    title: 'Elderly Care Assistant',
    description: 'Compassionate caregiver needed to assist elderly individual with daily activities.',
    keywords: ['caregiver', 'elderly', 'care', 'assistant'],
    country: 'Australia',
    category: 'Domestic Workers',
    salaryRange: 'AUD $30-$35 per hour',
    requirements: 'Certificate in aged care, first aid certified, patient and compassionate',
    employerName: 'Williams Family'
  },
  {
    title: 'Gardener',
    description: 'Experienced gardener needed to maintain residential gardens and outdoor spaces.',
    keywords: ['gardener', 'landscaping', 'outdoor', 'maintenance'],
    country: 'United States',
    category: 'Domestic Workers',
    salaryRange: '$18-$25 per hour',
    requirements: 'Gardening experience, knowledge of plants and landscaping, physical fitness',
    employerName: 'Davis Residence'
  },
  {
    title: 'Personal Assistant',
    description: 'Seeking organized personal assistant for household management and administrative tasks.',
    keywords: ['assistant', 'personal', 'administrative', 'management'],
    country: 'United Kingdom',
    category: 'Domestic Workers',
    salaryRange: '£28,000-£35,000 per year',
    requirements: 'Excellent organizational skills, proficiency in office software, discretion and professionalism',
    employerName: 'Thompson Family'
  },
  {
    title: 'Pet Sitter',
    description: 'Reliable pet sitter needed for daily care of two dogs and one cat.',
    keywords: ['pet', 'sitter', 'dog', 'cat', 'animal care'],
    country: 'Canada',
    category: 'Domestic Workers',
    salaryRange: 'CAD $15-$18 per hour',
    requirements: 'Experience with pets, reliable, flexible schedule',
    employerName: 'Brown Family'
  },
  {
    title: 'Laundry Specialist',
    description: 'Professional laundry specialist needed for high-end garment care and organization.',
    keywords: ['laundry', 'garment', 'specialist', 'cleaning'],
    country: 'United States',
    category: 'Domestic Workers',
    salaryRange: '$20-$25 per hour',
    requirements: 'Experience with delicate fabrics, ironing skills, attention to detail',
    employerName: 'Martinez Household'
  },
  {
    title: 'Live-out Babysitter',
    description: 'Part-time babysitter needed for after-school care of three children.',
    keywords: ['babysitter', 'childcare', 'part-time', 'after-school'],
    country: 'Australia',
    category: 'Domestic Workers',
    salaryRange: 'AUD $20-$25 per hour',
    requirements: 'Working with children check, first aid certified, engaging and energetic',
    employerName: 'Wilson Family'
  }
];

export const dummyCandidates: Omit<CandidateProfile, 'userId'>[] = [
  {
    fullName: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '+1-555-0101',
    country: 'United States',
    jobInterest: 'House Cleaner',
    skills: ['Deep Cleaning', 'Organization', 'Time Management', 'Eco-friendly Products'],
    experience: 5,
    photoUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    fullName: 'Jennifer Lee',
    email: 'jennifer.lee@email.com',
    phone: '+44-20-5550102',
    country: 'United Kingdom',
    jobInterest: 'Live-in Nanny',
    skills: ['Childcare', 'Early Education', 'CPR', 'Meal Preparation'],
    experience: 7,
    photoUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    fullName: 'Robert Chen',
    email: 'robert.chen@email.com',
    phone: '+1-555-0103',
    country: 'Canada',
    jobInterest: 'Personal Chef',
    skills: ['Culinary Arts', 'Meal Planning', 'Dietary Restrictions', 'Food Safety'],
    experience: 10,
    photoUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    fullName: 'Patricia Moore',
    email: 'patricia.moore@email.com',
    phone: '+1-555-0104',
    country: 'United States',
    jobInterest: 'Housekeeper',
    skills: ['Professional Cleaning', 'Laundry', 'Estate Management', 'Discretion'],
    experience: 8,
    photoUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+61-2-55550105',
    country: 'Australia',
    jobInterest: 'Elderly Care Assistant',
    skills: ['Aged Care', 'First Aid', 'Patient Care', 'Companionship'],
    experience: 6,
    photoUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    fullName: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '+1-555-0106',
    country: 'United States',
    jobInterest: 'Gardener',
    skills: ['Landscaping', 'Plant Care', 'Irrigation', 'Lawn Maintenance'],
    experience: 12,
    photoUrl: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    fullName: 'Emily Watson',
    email: 'emily.watson@email.com',
    phone: '+44-20-5550107',
    country: 'United Kingdom',
    jobInterest: 'Personal Assistant',
    skills: ['Organization', 'Admin', 'Scheduling', 'Communication'],
    experience: 4,
    photoUrl: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    fullName: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+1-555-0108',
    country: 'Canada',
    jobInterest: 'Pet Sitter',
    skills: ['Animal Care', 'Dog Training', 'Pet First Aid', 'Exercise'],
    experience: 3,
    photoUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    fullName: 'Anna Martinez',
    email: 'anna.martinez@email.com',
    phone: '+1-555-0109',
    country: 'United States',
    jobInterest: 'Laundry Specialist',
    skills: ['Garment Care', 'Ironing', 'Stain Removal', 'Fabric Knowledge'],
    experience: 9,
    photoUrl: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    fullName: 'Lisa Taylor',
    email: 'lisa.taylor@email.com',
    phone: '+61-2-55550110',
    country: 'Australia',
    jobInterest: 'Live-out Babysitter',
    skills: ['Childcare', 'Homework Help', 'Activities', 'Safety'],
    experience: 5,
    photoUrl: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    fullName: 'Carmen Rodriguez',
    email: 'carmen.rodriguez@email.com',
    phone: '+1-555-0111',
    country: 'United States',
    jobInterest: 'House Cleaner',
    skills: ['Residential Cleaning', 'Detail-Oriented', 'Efficient', 'Trustworthy'],
    experience: 6,
    photoUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    fullName: 'Sophie Anderson',
    email: 'sophie.anderson@email.com',
    phone: '+44-20-5550112',
    country: 'United Kingdom',
    jobInterest: 'Live-in Nanny',
    skills: ['Infant Care', 'Educational Activities', 'Light Cooking', 'Flexible'],
    experience: 4,
    photoUrl: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    fullName: 'James Wilson',
    email: 'james.wilson@email.com',
    phone: '+1-555-0113',
    country: 'Canada',
    jobInterest: 'Personal Chef',
    skills: ['International Cuisine', 'Healthy Cooking', 'Menu Planning', 'Presentation'],
    experience: 8,
    photoUrl: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    fullName: 'Rachel Green',
    email: 'rachel.green@email.com',
    phone: '+1-555-0114',
    country: 'United States',
    jobInterest: 'Housekeeper',
    skills: ['Deep Cleaning', 'Organization', 'Inventory', 'Reliability'],
    experience: 7,
    photoUrl: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    fullName: 'Thomas Anderson',
    email: 'thomas.anderson@email.com',
    phone: '+61-2-55550115',
    country: 'Australia',
    jobInterest: 'Elderly Care Assistant',
    skills: ['Senior Care', 'Mobility Assistance', 'Medication Management', 'Empathy'],
    experience: 5,
    photoUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];
