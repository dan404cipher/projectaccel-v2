import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  dateRange: string;
  tasks: number;
  timeSpent: string;
  progress: number;
  skills: string[];
  email?: string;
  phone?: string;
  department?: string;
  joinDate?: string;
}

interface TeamState {
  members: TeamMember[];
}

const initialState: TeamState = {
  members: [],
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setMembers: (state, action: PayloadAction<TeamMember[]>) => {
      state.members = action.payload;
    },
    addMember: (state, action: PayloadAction<Omit<TeamMember, 'id'>>) => {
      const newMember: TeamMember = {
        ...action.payload,
        id: `TM-${state.members.length + 1}`,
      };
      state.members.push(newMember);
    },
    updateMember: (state, action: PayloadAction<TeamMember>) => {
      const index = state.members.findIndex((member) => member.id === action.payload.id);
      if (index !== -1) {
        state.members[index] = action.payload;
      }
    },
    deleteMember: (state, action: PayloadAction<string>) => {
      state.members = state.members.filter((member) => member.id !== action.payload);
    },
    updateMemberProgress: (state, action: PayloadAction<{ id: string; progress: number; tasks: number; timeSpent: string }>) => {
      const index = state.members.findIndex((member) => member.id === action.payload.id);
      if (index !== -1) {
        state.members[index].progress = action.payload.progress;
        state.members[index].tasks = action.payload.tasks;
        state.members[index].timeSpent = action.payload.timeSpent;
      }
    },
  },
});

export const { setMembers, addMember, updateMember, deleteMember, updateMemberProgress } = teamSlice.actions;
export default teamSlice.reducer;

