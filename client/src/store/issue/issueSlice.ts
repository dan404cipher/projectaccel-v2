import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Issue {
  id: string;
  type: string;
  title: string;
  description?: string;
  assignees: string[];
  moreCount: number;
  status: 'To-do' | 'In Progress' | 'Done' | 'Backlog';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  dueDate: string;
  sprintId?: string;
  storyPoints?: number;
  labels?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Completed' | 'Planning';
  issues: string[]; // Array of issue IDs
}

interface IssueState {
  issues: Issue[];
  sprints: Sprint[];
  loading: boolean;
  error: string | null;
}

const initialState: IssueState = {
  issues: [],
  sprints: [],
  loading: false,
  error: null,
};

const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {
    addIssue: (state, action: PayloadAction<Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const newIssue: Issue = {
        ...action.payload,
        id: `ISSUE-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.issues.push(newIssue);
    },
    updateIssue: (state, action: PayloadAction<{ id: string; updates: Partial<Issue> }>) => {
      const index = state.issues.findIndex(issue => issue.id === action.payload.id);
      if (index !== -1) {
        state.issues[index] = { 
          ...state.issues[index], 
          ...action.payload.updates,
          updatedAt: new Date().toISOString()
        };
      }
    },
    deleteIssue: (state, action: PayloadAction<string>) => {
      state.issues = state.issues.filter(issue => issue.id !== action.payload);
    },
    addSprint: (state, action: PayloadAction<Omit<Sprint, 'id'>>) => {
      const newSprint: Sprint = {
        ...action.payload,
        id: `SPRINT-${Date.now()}`,
      };
      state.sprints.push(newSprint);
    },
    updateSprint: (state, action: PayloadAction<{ id: string; updates: Partial<Sprint> }>) => {
      const index = state.sprints.findIndex(sprint => sprint.id === action.payload.id);
      if (index !== -1) {
        state.sprints[index] = { ...state.sprints[index], ...action.payload.updates };
      }
    },
    setIssues: (state, action: PayloadAction<Issue[]>) => {
      state.issues = action.payload;
    },
    setSprints: (state, action: PayloadAction<Sprint[]>) => {
      state.sprints = action.payload;
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
  addIssue, 
  updateIssue, 
  deleteIssue, 
  addSprint, 
  updateSprint, 
  setIssues, 
  setSprints, 
  setLoading, 
  setError 
} = issueSlice.actions;

export default issueSlice.reducer;
