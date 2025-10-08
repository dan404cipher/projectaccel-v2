import { TeamMember } from '../store/team/teamSlice';

// Mock profile images
const imgEllipse7 = "http://localhost:3845/assets/4415cf6b90ae6200aee0458930211f231742cfb8.png";
const imgEllipse248 = "/src/assets/icons/b1766b7062b0c67d9be111f724f646b15b02bf09.png";
const imgProfile1 = "/src/assets/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";
const imgProfile2 = "/src/assets/icons/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png";
const imgProfile3 = "/src/assets/icons/8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a.png";
const imgProfile4 = "/src/assets/icons/9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b.png";
const imgProfile5 = "/src/assets/icons/cccccccccccccccccccccccccccccccccccccccc.png";
const imgProfile6 = "/src/assets/icons/dddddddddddddddddddddddddddddddddddddddd.png";

export const initialTeamMembers: Omit<TeamMember, 'id'>[] = [
  {
    name: 'Sarah Johnson',
    role: 'Project Manager',
    avatar: imgEllipse7,
    dateRange: '2025-01-01 to 2025-12-31',
    tasks: 8,
    timeSpent: '32h/40h',
    progress: 80,
    skills: ['Product strategy', 'Roadmap', 'Analytics', 'Leadership'],
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Product Management',
    joinDate: '2024-01-15'
  },
  {
    name: 'Michael Chen',
    role: 'Senior Developer',
    avatar: imgProfile1,
    dateRange: '2025-01-01 to 2025-12-31',
    tasks: 12,
    timeSpent: '45h/40h',
    progress: 90,
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    email: 'michael.chen@company.com',
    phone: '+1 (555) 234-5678',
    department: 'Engineering',
    joinDate: '2023-06-20'
  },
  {
    name: 'Emily Rodriguez',
    role: 'UI/UX Designer',
    avatar: imgProfile2,
    dateRange: '2025-01-01 to 2025-12-31',
    tasks: 6,
    timeSpent: '24h/32h',
    progress: 75,
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    email: 'emily.rodriguez@company.com',
    phone: '+1 (555) 345-6789',
    department: 'Design',
    joinDate: '2024-03-10'
  },
  {
    name: 'David Kim',
    role: 'Backend Developer',
    avatar: imgProfile3,
    dateRange: '2025-01-01 to 2025-12-31',
    tasks: 10,
    timeSpent: '38h/40h',
    progress: 95,
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    email: 'david.kim@company.com',
    phone: '+1 (555) 456-7890',
    department: 'Engineering',
    joinDate: '2023-09-05'
  },
  {
    name: 'Lisa Thompson',
    role: 'QA Engineer',
    avatar: imgProfile4,
    dateRange: '2025-01-01 to 2025-12-31',
    tasks: 15,
    timeSpent: '28h/35h',
    progress: 70,
    skills: ['Testing', 'Automation', 'Selenium', 'Jest'],
    email: 'lisa.thompson@company.com',
    phone: '+1 (555) 567-8901',
    department: 'Quality Assurance',
    joinDate: '2024-02-28'
  },
  {
    name: 'Alex Martinez',
    role: 'DevOps Engineer',
    avatar: imgProfile5,
    dateRange: '2025-01-01 to 2025-12-31',
    tasks: 7,
    timeSpent: '30h/35h',
    progress: 85,
    skills: ['Kubernetes', 'CI/CD', 'Monitoring', 'Infrastructure'],
    email: 'alex.martinez@company.com',
    phone: '+1 (555) 678-9012',
    department: 'Engineering',
    joinDate: '2023-11-12'
  },
  {
    name: 'Rachel Green',
    role: 'Business Analyst',
    avatar: imgProfile6,
    dateRange: '2025-01-01 to 2025-12-31',
    tasks: 5,
    timeSpent: '20h/25h',
    progress: 80,
    skills: ['Data Analysis', 'Requirements', 'Documentation', 'Stakeholder Management'],
    email: 'rachel.green@company.com',
    phone: '+1 (555) 789-0123',
    department: 'Business Analysis',
    joinDate: '2024-04-18'
  }
];

