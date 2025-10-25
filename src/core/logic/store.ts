import { create } from 'zustand'
import type {Profile} from "@/types/profile.ts";
import type {Analysis} from "@/types/analysis.ts";

interface AppStore {
    isAppInitialized: boolean;
    profile: Profile | null;
    lastAnalysis: Analysis | null;
    setAppInitialized: (initialized: boolean) => void;
    setProfile: (profile: Profile) => void;
    setLastAnalysis: (analysis: Analysis) => void;
}

const useAppStore = create<AppStore>((set) => ({
    isAppInitialized: false,
    profile: null,
    lastAnalysis: null,
    setAppInitialized: (sup) => set({ isAppInitialized: sup }),
    setProfile: (profile) => set({ profile: profile }),
    setLastAnalysis: (analysis) => set({ lastAnalysis: analysis }),
}))

export { useAppStore }
