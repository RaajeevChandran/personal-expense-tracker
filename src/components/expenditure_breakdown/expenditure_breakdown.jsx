import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../pages/home/home.css";
import LoadingDots from "../loader/loading_dots";
import useStore from "../../state";

const ExpenditureBreakdown = () => {
	const [loading, setLoading] = useState(true);
	const userId = useStore(state => state.userId)
	const fetchExpenditureBreakdown = useStore(state => state.fetchExpenditureBreakdown)
	const [data, setData] = useState({
		totalSpent: "3,000",
		today: "200",
		thisWeek: "500",
		thisMonth: "1,000",
		thisYear: "3000",
		mostSpentOn: "Food",
		mostSpentDay: "Thursday",
		leastSpentDay: "Monday",
	});
	const gradients = [
		"card-purple-blue",
		"card-salmon-pink",
		"card-blue-green",
		"card-purple-pink",
	];

	useEffect(() => {
		fetchExpenditureBreakdown(userId)
	});

	return (
		<div className="container-fluid">
			<div className="row row-cols-4">
				{Object.entries(data)
					.slice(0, 4)
					.map(([key, val], i) => (
						<div className="col-12 col-sm-6 col-md-3">
							<div
								className={`card ${gradients[i % 4]} text-white mb-3 mb-md-0`}
							>
								<div className="card-body d-flex justify-content-between align-items-end">
									<div className="card-number">
										<div className="h3 m-0">
											{loading ? <LoadingDots /> : `₹ ${val}`}
										</div>
										<small>
											<strong>
												{key
													.replace(/([A-Z])/g, " $1")
													.charAt(0)
													.toUpperCase() +
													key.replace(/([A-Z])/g, " $1").slice(1)}
											</strong>
										</small>
									</div>
									<div className="card-description text-right">
										<small> </small>
										<br />
										<small> </small>
									</div>
								</div>
							</div>
						</div>
					))}
				{Object.entries(data)
					.slice(4)
					.map(([key, val], i) => (
						<div className="col-12 col-sm-6 col-md-3 mt-3">
							<div
								className={`card ${gradients[i % 4]} text-white mb-3 mb-md-0`}
							>
								<div className="card-body d-flex justify-content-between align-items-end">
									<div className="card-number">
										<div className="h3 m-0">
											{loading ? (
												<LoadingDots />
											) : val.match(/^\d/) ? (
												`₹ ${val}`
											) : (
												val
											)}
										</div>
										<small>
											<strong>
												{key
													.replace(/([A-Z])/g, " $1")
													.charAt(0)
													.toUpperCase() +
													key.replace(/([A-Z])/g, " $1").slice(1)}
											</strong>
										</small>
									</div>
									<div className="card-description text-right">
										<small> </small>
										<br />
										<small> </small>
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default ExpenditureBreakdown;
