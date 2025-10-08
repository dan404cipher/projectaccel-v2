import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  dateRange?: string;
  tasks?: number;
  timeSpent?: string;
  progress?: number;
  skills?: string[];
  hours?: number;
  cost?: number;
  timeUnit?: 'hours' | 'days';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  ProjectId: string;
  startDate: string;
  endDate: string;
  process: number;
  category: string;
  projectUrl: string;
  priority: string;
  currency: string;
  budget: string;
  visibility: 'public' | 'private';
  client: {
    name: string;
  };
  projectManager: {
    name: string;
    profile: string;
  };
  assignee: Array<{
    name: string;
    profile: string;
  }>;
  teamMembers?: TeamMember[];
  createdAt: string;
}

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Omit<Project, 'id' | 'createdAt'>>) => {
      const newProject: Project = {
        ...action.payload,
        id: `project-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      state.projects.unshift(newProject); // Add to beginning of array
    },
    updateProject: (state, action: PayloadAction<{ id: string; updates: Partial<Project> }>) => {
      const index = state.projects.findIndex(project => project.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = { ...state.projects[index], ...action.payload.updates };
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(project => project.id !== action.payload);
    },
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  addProject, 
  updateProject, 
  deleteProject, 
  setProjects, 
  setLoading, 
  setError 
} = projectSlice.actions;

export default projectSlice.reducer;
