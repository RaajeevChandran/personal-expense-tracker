import create from "zustand";

const url = "https://p-e-t.herokuapp.com";

const useStore = create((set) => ({
	userId: "",
	setUserId: (id) => set((_) => ({ userId: id })),
	expenditureBreakdown: {},
	fetchingBreakdown: false,
	fetchExpenditureBreakdown: async (fetchingBreakdown, userId) => {
		if (!fetchingBreakdown) {
			set((_) => ({ fetchingBreakdown: true }));
			var myHeaders = new Headers();
			myHeaders.append("user_id", userId);
			const response = await fetch(url + "/expenditure-breakdown", {
				method: "GET",
				headers: myHeaders,
				redirect: "follow",
			});
			if (response.status === 200) {
				const json = await response.json();
				console.log({
					totalSpent:
						json["total"] === null || json["total"] === undefined
							? 0
							: json["total"],
					today:
						json["today"] === null || json["today"] === undefined
							? 0
							: json["today"],
					thisWeek:
						json["week"] === null || json["week"] === undefined
							? 0
							: json["week"],
					thisMonth:
						json["month"] === null || json["month"] === undefined
							? 0
							: json["month"],
					thisYear:
						json["year"] === null || json["year"] === undefined
							? 0
							: json["year"],
					mostSpentOn:
						json["most_spent_on"] === null ||
						json["most_spent_on"] === undefined
							? "-"
							: json["most_spent_on"],
					mostSpentDay:
						json["most_spent_day"] === null ||
						json["most_spent_day"] === undefined
							? "-"
							: json["most_spent_day"],
					leastSpentDay:
						json["least_spent_day"] === null ||
						json["least_spent_day"] === undefined
							? "-"
							: json["least_spent_day"],
				});
				set((_) => ({
					expenditureBreakdown: {
						totalSpent: json["total"],
						today: json["today"],
						thisWeek: json["week"],
						thisMonth: json["month"],
						thisYear: json["year"],
						mostSpentOn: json["most_spent_on"],
						mostSpentDay: json["most_spent_day"],
						leastSpentDay: json["least_spent_day"],
					},
				}));
			}
			set((_) => ({ fetchingBreakdown: false }));
		}
	},
	fetchingProfile: false,
	userProfile: {},
	updateMonthlyLimit: async (userId, monthlyLimit, userProfile) => {
		var myHeaders = new Headers();
		myHeaders.append("user_id", userId);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			redirect: "follow",
		};

		const response = await fetch(url+"/update-monthly-limit/"+monthlyLimit, requestOptions);
		if(response.status===200){
			userProfile.monthlyLimit = monthlyLimit
			set(_=>({
				profile: userProfile
			}))
		}
	},
	getProfile: async (userId, fetchingProfile) => {
		if (!fetchingProfile) {
			set((_) => ({ fetchingProfile: true }));
			var myHeaders = new Headers();
			myHeaders.append("user_id", userId);

			var requestOptions = {
				method: "GET",
				headers: myHeaders,
				redirect: "follow",
			};

			const response = await fetch(url + "/profile", requestOptions);
			if (response.status === 200) {
				const json = await response.json();
				console.log(json);
				set((_) => ({
					userProfile: {
						name: json["name"],
						email: json["email"],
						monthlyLimit: json["monthly_limit"],
					},
				}));
			}
			set((_) => ({ fetchingProfile: false }));
		}
	},
	fetchingCharts: false,
	chart: {},
	pieChart: [],
	radarChart: [],
	fetchCharts: async (userId, fetchingCharts) => {
		if (!fetchingCharts) {
			set((_) => ({
				fetchingCharts: true,
			}));
			var myHeaders = new Headers();
			myHeaders.append("user_id", userId);

			var requestOptions = {
				method: "GET",
				headers: myHeaders,
				redirect: "follow",
			};

			const response = await fetch(url + "/chart", requestOptions);
			if (response.status === 200) {
				const json = await response.json();
				const pieChartData = [];
				const radarChartData = [];
				Object.entries(json).forEach(([key, value]) => {
					if (value !== 0) {
						pieChartData.push({
							name: key,
							value: value,
						});
					}
					radarChartData.push({
						label: key,
						value: value.toString(),
					});
				});
				console.log(json);
				console.log(pieChartData);
				set((_) => ({
					chart: json,
				}));
				set((_) => ({
					pieChart: pieChartData,
					radarChart: radarChartData,
				}));
			}
			set((_) => ({
				fetchingCharts: false,
			}));
		}
	},
	addExpense: async (data, userId, fetchExpenditureBreakdown, fetchChart) => {
		var myHeaders = new Headers();
		myHeaders.append("user_id", userId);
		var formdata = new FormData();
		let categories = {
			Food: 1,
			Automobiles: 2,
			Entertainment: 3,
			Clothing: 4,
			Healthcare: 5,
			Others: 6,
		};
		formdata.append("date", data.date + " 00:00:00");
		formdata.append("amount", data.amount);
		formdata.append("category_id", categories[data["category"]]);
		formdata.append("description", data.description);
		formdata.append("expense_type", data["expenseType"]);
		const response = await fetch(url + "/add", {
			method: "POST",
			headers: myHeaders,
			body: formdata,
			redirect: "follow",
		});
		if (response.status === 200) {
			const json = await response.json();
			console.log(json);
			await fetchExpenditureBreakdown(false, userId);
			await fetchChart(userId, false);
			var newExpenseMap = {};
			for (var pair of formdata.entries()) {
				newExpenseMap[pair[0]] = pair[1];
			}
			newExpenseMap["category"] = data["category"];
			return newExpenseMap;
		}
	},
	logIn: async (data, setCookie) => {
		try {
			var formdata = new FormData();
			formdata.append("email", data.email);
			formdata.append("password", data.password);
			const response = await fetch(url + "/login", {
				method: "POST",
				body: formdata,
				redirect: "follow",
			});
			if (response.status === 200) {
				const json = await response.json();

				console.log("user id " + json["user_id"]);
				set((_) => ({
					userId: json["user_id"],
				}));
				setCookie("userId", json["user_id"]);
				console.log("COOKIE SET");
			}
		} catch (e) {
			console.log(e);
		}
	},
	signUp: async (data, setCookie) => {
		try {
			var formdata = new FormData();
			formdata.append("name", data.name);
			formdata.append("email", data.email);
			formdata.append("password", data.password);
			formdata.append("monthly_limit", data["monthly-limit"]);

			var requestOptions = {
				method: "POST",
				body: formdata,
				redirect: "follow",
			};

			const response = await fetch(url + "/register", requestOptions);
			if (response.status === 200) {
				const json = await response.json();
				set((_) => ({ userId: json["user_id"] }));
				setCookie("userId", json["user_id"]);
			}
		} catch (e) {
			console.log(e);
		}
	},
	logout: (setCookie) => {
		setCookie("userId", "");
		set((_) => ({ userId: "" }));
	},
	allExpenses: [],
	creditExpenses: [],
	debitExpenses: [],
	fetchingExpenseTable: false,
	fetchExpensesTable: async (fetchingTable, userId, type) => {
		if (!fetchingTable) {
			set((_) => ({ fetchingExpenseTable: true }));
			var myHeaders = new Headers();
			myHeaders.append("user_id", userId);

			var requestOptions = {
				method: "GET",
				headers: myHeaders,
				redirect: "follow",
			};

			try {
				console.log("fetching table " + type);
				const response = await fetch(
					url +
						`/expenses${
							type === "All Expenses"
								? ""
								: `?type=${type === "Credit" ? "credit" : "debit"}`
						}`,
					requestOptions
				);

				if (response.status === 200) {
					const json = await response.json();
					console.log(json);
					console.log("type " + type + json.length);
					switch (type) {
						case "All Expenses":
							set((_) => ({
								allExpenses: json,
							}));
							break;
						case "Credit":
							set((_) => ({
								creditExpenses: json,
							}));
							break;
						default:
							set((_) => ({
								debitExpenses: json,
							}));
							break;
					}
				}
			} catch (e) {
				set((_) => ({ fetchingExpenseTable: false }));
			}
		}
		set((_) => ({ fetchingExpenseTable: false }));
	},
	addToExpenseTable: (
		type,
		allExpenses,
		creditExpenses,
		debitExpenses,
		newData
	) => {
		set((_) => ({
			allExpenses: [newData, ...allExpenses],
		}));

		set((_) =>
			type === "credit"
				? {
						creditExpenses: [newData, ...creditExpenses],
				  }
				: {
						debitExpenses: [newData, ...debitExpenses],
				  }
		);
	},
	deleteExpense: async (userId, expenseId) => {
		var myHeaders = new Headers();
		myHeaders.append("user_id", userId);
		var requestOptions = {
			method: "DELETE",
			headers: myHeaders,
			redirect: "follow",
		};
		await fetch(url + "/delete-expense/" + expenseId, requestOptions);
	},
	deleteExpenseFromTable: (
		type,
		allExpenses,
		creditExpenses,
		debitExpenses,
		id
	) => {
		set((_) => ({
			allExpenses: allExpenses.filter((e) => e["expense_id"] !== id),
		}));

		set((_) =>
			type === "credit"
				? {
						creditExpenses: creditExpenses.filter(
							(e) => e["expense_id"] !== id
						),
				  }
				: {
						debitExpenses: debitExpenses.filter((e) => e["expense_id"] !== id),
				  }
		);
	},
}));
export default useStore;
