import create from "zustand";
import Axios from "axios";
// const url = "https://p-e-t.herokuapp.com";
const url = "http://192.168.101.6:5000";
const useStore = create((set) => ({
	userId: "",
	setUserId: (id) => set((state) => ({ userId: id })),
	expenditureBreakdown: {},
	setExpenditureBreakdown: (updatedData) =>
		set((_) => ({ expenditureBreakdown: updatedData })),
	fetchExpenditureBreakdown: async () => {
		const response = await fetch(
			"https://api.github.com/search/users?q=john&per_page=5"
		);
		const json = await response.json();
		set((_) => ({
			expenditureBreakdown: {
				totalSpent: "3,000",
				today: "200",
				thisWeek: "500",
				thisMonth: "1,000",
				thisYear: "3000",
				mostSpentOn: "Food",
				mostSpentDay: "Thursday",
				leastSpentDay: "Monday",
			},
		}));
	},
	logIn: async () => {
		const response = await fetch(
			"https://api.github.com/search/users?q=john&per_page=5"
		);
		const json = await response.json();
		set((_) => ({
			userId: "rcn",
		}));
	},
	signUp: async (data) => {
		const response = await fetch(url + "/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: data,
		});
		const json = await response.json();
		console.log(json);
		set((_) => ({
			userId: json["user_id"],
		}));
	},
	logout: () => {
		set((_) => ({ userId: "" }));
	},
}));
export default useStore;
