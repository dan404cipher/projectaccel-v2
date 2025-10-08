import { TeamMember } from '../store/team/teamSlice';

// Mock profile images
const imgEllipse7 = "http://localhost:3845/assets/4415cf6b90ae6200aee0458930211f231742cfb8.png";
const imgProfile1 = "/src/assets/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";
const imgProfile2 = "/src/assets/icons/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png";
const imgProfile3 = "/src/assets/icons/27329e3b78d83b20619fddee55560c05c2cd1469.png";
const imgProfile4 = "/src/assets/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";
const imgProfile5 = "/src/assets/icons/8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a.png";
const imgProfile6 = "/src/assets/icons/9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b.png";
const imgProfile7 = "/src/assets/icons/cccccccccccccccccccccccccccccccccccccccc.png";
const imgProfile8 = "/src/assets/icons/dddddddddddddddddddddddddddddddddddddddd.png";

export const availableMembers: Omit<TeamMember, 'id'>[] = [
  {
    name: 'Alex Thompson',
    role: 'Frontend Developer',
    avatar: imgProfile1,
    dateRange: '2025-01-01 to 2025-12-31',
    tasks: 0,
    timeSpent: '0h/0h',
    progress: 0,
    skills: ['React', 'Vue.js', 'TypeScript', 'CSS'],
    email: 'alex.thompson@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Engineering',
    joinDate: '2025-01-15'
  },
  {
    name: 'Maria Garcia',
    role: 'Backend Developer',
    avatar: imgProfile2,
    dateRange: '2025-01-01 to 2025-12-31',
    tasks: 0,
    timeSpent: '0h/0h',
    progress: 0,
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    email: 'maria.garcia@company.com',
    phone: '+1 (555) 234-5678',
    department: 'Engineering',
    joinDate: '2025-01-20'
  },
  {
    name: 'James Wilson',
    role: 'UI/UX Designer',
    avatar: imgProfile3,
    dateRange: '2025-01-01 to 2025-12-31',
    tasks: 0,
    timeSpent: '0h/0h',
    progress: 0,
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    email: 'james.wilson@company.com',
    phone: '+1 (555) 345-6789',
    department: 'Design',
    joinDate: '2025-01-25'
  },
  {
    name: 'Sarah Davis',
    role: 'Product Manager',
    avatar: imgProfile4,
    dateRange: '2025-01-01 to 2025-12-31',
    tasks: 0,
    timeSpent: '0h/0h',
    progress: 0,
    skills: ['Product Strategy', 'Roadmap', 'Analytics', 'Leadership'],
    email: 'sarah.davis@company.com',
    phone: '+1 (555) 456-7890',
    department: 'Product Management',
    joinDate: '2025-02-01'
  },
  {
    name: 'Robert Brown',
    role: 'DevOps Engineer',
    avatar: imgProfile5,
    dateRange: '2025-01-01 to 2025-12-31',
    tasks: 0,
    timeSpent: '0h/0h',
    progress: 0,
    skills: ['Kubernetes', 'CI/CD', 'AWS', 'Monitoring'],
    email: 'robert.brown@company.com',
    phone: '+1 (555) 567-8901',
    department: 'Engineering',
    joinDate: '2025-02-05'
  },
  {
    name: 'Lisa Anderson',
    role: 'QA Engineer',
    avatar: imgProfile6,
    dateRange: '2025-01-01 to 2025-12-31',
    tasks: 0,
    timeSpent: '0h/0h',
    progress: 0,
    skills: ['Testing', 'Automation', 'Selenium', 'Jest'],
    email: 'lisa.anderson@company.com',
    phone: '+1 (555) 678-9012',
    department: 'Quality Assurance',
    joinDate: '2025-02-10'
  },
  {
    name: 'Michael Taylor',
    role: 'Data Analyst',
    avatar: imgProfile7,
    dateRange: '2025-01-01 to 2025-12-31',
    tasks: 0,
    timeSpent: '0h/0h',
    progress: 0,
    skills: ['SQL', 'Python', 'Tableau', 'Statistics'],
    email: 'michael.taylor@company.com',
    phone: '+1 (555) 789-0123',
    department: 'Analytics',
    joinDate: '2025-02-15'
  },
  {
    name: 'Jennifer Lee',
    role: 'Marketing Specialist',
    avatar: imgProfile8,
    dateRange: '2025-01-01 to 2025-12-31',
    tasks: 0,
    timeSpent: '0h/0h',
    progress: 0,
    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
    email: 'jennifer.lee@company.com',
    phone: '+1 (555) 890-1234',
    department: 'Marketing',
    joinDate: '2025-02-20'
  },
  {
    name: 'David Martinez',
    role: 'Full Stack Developer',
    avatar: imgProfile1,
    dateRange: '2025-01-01 to 2025-12-31',
    tasks: 0,
    timeSpent: '0h/0h',
    progress: 0,
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    email: 'david.martinez@company.com',
    phone: '+1 (555) 901-2345',
    department: 'Engineering',
    joinDate: '2025-02-25'
  },
  {
    name: 'Amanda White',
    role: 'Business Analyst',
    avatar: imgProfile2,
    dateRange: '2025-01-01 to 2025-12-31',
    tasks: 0,
    timeSpent: '0h/0h',
    progress: 0,
    skills: ['Requirements', 'Documentation', 'Stakeholder Management', 'Process Improvement'],
    email: 'amanda.white@company.com',
    phone: '+1 (555) 012-3456',
    department: 'Business Analysis',
    joinDate: '2025-03-01'
  }
];
