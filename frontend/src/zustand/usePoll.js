import { create } from "zustand";

const usePoll = create((set) => ({
	selectedPoll: null,
	setSelectedPoll: (selectedPoll) => set({ selectedPoll }),
	option: null,
	setOption: (option) => set({ option }),
}));

export default usePoll;