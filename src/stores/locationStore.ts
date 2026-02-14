import { create } from "zustand";
import type { Location } from "@/types";

interface LocationState {
  location: Location | null;
  loading: boolean;
  permissionDenied: boolean;
  setLocation: (location: Location | null) => void;
  setLoading: (loading: boolean) => void;
  setPermissionDenied: (denied: boolean) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  location: null,
  loading: true,
  permissionDenied: false,
  setLocation: (location) => set({ location, loading: false }),
  setLoading: (loading) => set({ loading }),
  setPermissionDenied: (permissionDenied) => set({ permissionDenied, loading: false }),
}));
