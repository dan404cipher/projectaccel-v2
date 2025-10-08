import { Project } from "../store/project/projectSlice";

const profile1 = "/src/assets/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";
const profile2 = "/src/assets/icons/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png";
const profile3 = "/src/assets/icons/27329e3b78d83b20619fddee55560c05c2cd1469.png";
const profile4 = "/src/assets/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";
const profile5 = "/src/assets/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";

export const initialProjects: Omit<Project, 'id' | 'createdAt'>[] = [
  {
    title: 'E-commerce Platform Redesign',
    description: 'Complete redesign of the existing e-commerce platform with modern UI/UX and improved performance',
    ProjectId: 'PJ-001',
    startDate: '2025-01-15',
    endDate: '2025-03-15',
    process: 25,
    category: 'Web Development',
    projectUrl: 'https://ecommerce.example.com',
    priority: 'High',
    currency: 'USD',
    budget: '50000',
    visibility: 'public',
    client: {
      name: 'TechCorp Industries',
    },
    projectManager: {
      name: 'Jennifer Martinez',
      profile: profile2,
    },
    assignee: [
      { name: 'Alex Johnson', profile: profile1 },
      { name: 'Sarah Chen', profile: profile2 },
      { name: 'Michael Rodriguez', profile: profile3 },
    ],
  },
  {
    title: 'Mobile Banking App',
    description: 'Development of a secure mobile banking application with biometric authentication and real-time transactions',
    ProjectId: 'PJ-002',
    startDate: '2025-01-20',
    endDate: '2025-04-20',
    process: 15,
    category: 'Mobile Development',
    projectUrl: 'https://banking.example.com',
    priority: 'High',
    currency: 'USD',
    budget: '75000',
    visibility: 'private',
    client: {
      name: 'FinTrust Bank',
    },
    projectManager: {
      name: 'Robert Taylor',
      profile: profile4,
    },
    assignee: [
      { name: 'David Kim', profile: profile4 },
      { name: 'Lisa Thompson', profile: profile5 },
    ],
  },
  {
    title: 'IoT Fleet Management',
    description: 'IoT-based fleet tracking system with live GPS monitoring and analytics dashboard',
    ProjectId: 'PJ-003',
    startDate: '2025-02-01',
    endDate: '2025-05-01',
    process: 40,
    category: 'IoT Development',
    projectUrl: 'https://fleet.example.com',
    priority: 'Medium',
    currency: 'USD',
    budget: '60000',
    visibility: 'public',
    client: {
      name: 'TransLogix',
    },
    projectManager: {
      name: 'Amanda Foster',
      profile: profile1,
    },
    assignee: [
      { name: 'James Wilson', profile: profile1 },
      { name: 'Maria Garcia', profile: profile3 },
    ],
  },
  {
    title: 'AI-Powered Analytics Dashboard',
    description: 'Machine learning dashboard for business intelligence with predictive analytics and automated reporting',
    ProjectId: 'PJ-004',
    startDate: '2025-02-10',
    endDate: '2025-06-10',
    process: 60,
    category: 'AI/ML',
    projectUrl: 'https://analytics.example.com',
    priority: 'High',
    currency: 'USD',
    budget: '85000',
    visibility: 'private',
    client: {
      name: 'DataInsights Corp',
    },
    projectManager: {
      name: 'Christopher Lee',
      profile: profile3,
    },
    assignee: [
      { name: 'Emily Watson', profile: profile2 },
      { name: 'Alex Johnson', profile: profile1 },
      { name: 'Sarah Chen', profile: profile2 },
    ],
  },
  {
    title: 'Healthcare Management System',
    description: 'Comprehensive healthcare management system with patient records, appointment scheduling, and telemedicine features',
    ProjectId: 'PJ-005',
    startDate: '2025-02-15',
    endDate: '2025-07-15',
    process: 30,
    category: 'Healthcare',
    projectUrl: 'https://healthcare.example.com',
    priority: 'Medium',
    currency: 'USD',
    budget: '70000',
    visibility: 'public',
    client: {
      name: 'MediConnect',
    },
    projectManager: {
      name: 'Rachel Green',
      profile: profile5,
    },
    assignee: [
      { name: 'Michael Rodriguez', profile: profile3 },
      { name: 'David Kim', profile: profile4 },
      { name: 'Lisa Thompson', profile: profile5 },
    ],
  },
];
