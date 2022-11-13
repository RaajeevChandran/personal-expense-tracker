import create from "zustand";

import Axios from "axios";
const url = "https://p-e-t.herokuapp.com";
// const url = "http://192.168.101.6:5000";
const useStore = create((set) => ({
	userId: "",
	setUserId: (id) => set((state) => ({ userId: id })),
	expenditureBreakdown: {},
	addExpense: async(data)=>{
		console.log(data)
		var formdata = new FormData();
		formdata.append("date", data.date);
		const response = await fetch(
			url+"/add", {
				method: "POST",
				body: formdata,
				redirect: "follow",
			}
		);
		const json = await response.json();
		console.log(json)
	},
	fetchExpenditureBreakdown: async (userId) => {
		var formdata = new FormData();
		formdata.append("user_id", userId);
		const response = await fetch(
			url + "/expenditure-breakdown",
			{
				method:"POST",
				body: formdata,
				redirect: "follow",

			}
		);
		const json = await response.json();
		console.log(json)
		// set((_) => ({
		// 	expenditureBreakdown: {
		// 		totalSpent: "3,000",
		// 		today: "200",
		// 		thisWeek: "500",
		// 		thisMonth: "1,000",
		// 		thisYear: "3000",
		// 		mostSpentOn: "Food",
		// 		mostSpentDay: "Thursday",
		// 		leastSpentDay: "Monday",
		// 	},
		// }));
	},
	logIn: async (data,setCookie) => {
		var formdata = new FormData();
		formdata.append("email", data.email);
		formdata.append("password", data.password);
		const response = await fetch(
			url+"/login", {
				method: "POST",
				body: formdata,
				redirect: "follow",
			}
		);
		const json = await response.json();
		console.log("user id "+json['user_id'])
		set((_) => ({
			userId: json["user_id"],
		}));
		setCookie('userId',json["user_id"])
		console.log("COOKIE SET")
	},
	signUp: async (data) => {
		try {
			// console.log(JSON.stringify(data))
			// const response = await fetch(url + "/register", {
			// 	method: "POST",
			// 	headers: { "Content-Type": "application/json" },
			// 	body: JSON.stringify(data),
			// });
			// const json = await response.json();
			// console.log(json);
			// set((_) => ({
			// 	userId: json["user_id"],
			// }));

			var formdata = new FormData();
			formdata.append("name", data.name);
			formdata.append("email", data.email);
			formdata.append("password", data.password);
			formdata.append("monthly_limit", data['monthly-limit']);

			var requestOptions = {
				method: "POST",
				body: formdata,
				redirect: "follow",
			};

			fetch(url+"/register", requestOptions)
				.then((response) => response.text())
				.then((result) => console.log(result))
				.catch((error) => console.log("error", error));
		} catch (e) {
			console.log(e);
		}
	},
	logout: (setCookie) => {
		setCookie("userId","")
		set((_) => ({ userId: "" }));
	},
}));
export default useStore;
