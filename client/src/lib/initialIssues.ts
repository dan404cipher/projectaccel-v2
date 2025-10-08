import { Issue, Sprint } from "../store/issue/issueSlice";

const img1 = "/src/assets/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";
const img2 = "/src/assets/icons/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png";
const img3 = "/src/assets/icons/27329e3b78d83b20619fddee55560c05c2cd1469.png";
const img4 = "/src/assets/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";
const img5 = "/src/assets/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";

export const initialIssues: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    type: "TA-117",
    title: "Publish blog page",
    description: "Create and publish a new blog page with responsive design and SEO optimization",
    assignees: [img1, img2, img3, img4, img5],
    moreCount: 24,
    status: "To-do",
    priority: "Low",
    dueDate: "Dec 5",
    sprintId: "SPRINT-1",
    storyPoints: 3,
    labels: ["frontend", "content", "seo"],
  },
  {
    type: "TA-118",
    title: "Fix homepage bug",
    description: "Resolve the navigation menu bug that appears on mobile devices",
    assignees: [img1, img2, img3],
    moreCount: 3,
    status: "In Progress",
    priority: "High",
    dueDate: "Dec 10",
    sprintId: "SPRINT-1",
    storyPoints: 5,
    labels: ["bug", "frontend", "mobile"],
  },
  {
    type: "TA-119",
    title: "Implement user authentication",
    description: "Add JWT-based authentication system with login and registration",
    assignees: [img2, img4],
    moreCount: 2,
    status: "In Progress",
    priority: "High",
    dueDate: "Dec 12",
    sprintId: "SPRINT-1",
    storyPoints: 8,
    labels: ["backend", "security", "auth"],
  },
  {
    type: "TA-120",
    title: "Database optimization",
    description: "Optimize database queries and add proper indexing",
    assignees: [img3, img5],
    moreCount: 2,
    status: "To-do",
    priority: "Medium",
    dueDate: "Dec 15",
    sprintId: "SPRINT-1",
    storyPoints: 5,
    labels: ["database", "performance", "backend"],
  },
  {
    type: "TA-121",
    title: "Add dark mode support",
    description: "Implement dark mode toggle with theme persistence",
    assignees: [img1, img2],
    moreCount: 2,
    status: "Backlog",
    priority: "Low",
    dueDate: "Dec 20",
    storyPoints: 3,
    labels: ["frontend", "ui", "theme"],
  },
  {
    type: "TA-122",
    title: "API rate limiting",
    description: "Implement rate limiting for API endpoints to prevent abuse",
    assignees: [img3, img4],
    moreCount: 2,
    status: "Backlog",
    priority: "Medium",
    dueDate: "Dec 25",
    storyPoints: 4,
    labels: ["backend", "security", "api"],
  },
  {
    type: "TA-123",
    title: "Mobile app testing",
    description: "Comprehensive testing of mobile application on different devices",
    assignees: [img2, img5],
    moreCount: 2,
    status: "Backlog",
    priority: "High",
    dueDate: "Dec 30",
    storyPoints: 6,
    labels: ["testing", "mobile", "qa"],
  },
  {
    type: "TA-124",
    title: "Performance monitoring",
    description: "Set up application performance monitoring and alerting",
    assignees: [img1, img3, img4],
    moreCount: 3,
    status: "Backlog",
    priority: "Medium",
    dueDate: "Jan 5",
    storyPoints: 5,
    labels: ["monitoring", "devops", "performance"],
  },
  {
    type: "TA-125",
    title: "User dashboard redesign",
    description: "Redesign user dashboard with improved UX and accessibility",
    assignees: [img1, img2, img5],
    moreCount: 3,
    status: "Backlog",
    priority: "Medium",
    dueDate: "Jan 10",
    storyPoints: 8,
    labels: ["frontend", "ui", "ux", "accessibility"],
  },
  {
    type: "TA-126",
    title: "Email notification system",
    description: "Implement automated email notifications for user actions",
    assignees: [img3, img4],
    moreCount: 2,
    status: "Backlog",
    priority: "Low",
    dueDate: "Jan 15",
    storyPoints: 4,
    labels: ["backend", "email", "notifications"],
  }
];

export const initialSprints: Omit<Sprint, 'id'>[] = [
  {
    name: "SCRUM Sprint 1",
    startDate: "2025-01-01",
    endDate: "2025-01-07",
    status: "Active",
    issues: ["ISSUE-1", "ISSUE-2", "ISSUE-3", "ISSUE-4"], // Will be updated with actual IDs
  },
  {
    name: "SCRUM Sprint 2",
    startDate: "2025-01-08",
    endDate: "2025-01-14",
    status: "Planning",
    issues: ["ISSUE-5", "ISSUE-6"], // Will be updated with actual IDs
  },
  {
    name: "SCRUM Sprint 3",
    startDate: "2025-01-15",
    endDate: "2025-01-21",
    status: "Planning",
    issues: ["ISSUE-7", "ISSUE-8", "ISSUE-9", "ISSUE-10"], // Will be updated with actual IDs
  }
];
