import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Loader from "../../components/loader/loader"
import "./profile.css";
import avatar from "./avatar.png";
import useStore from "../../state";
export default function Profile() {
	const [monthlyLimitTextFieldValue, setMonthlyLimitTextFieldValue] = useState(0);
	const userProfile = useStore(state => state.userProfile);
	const fetchingProfile = useStore(state => state.fetchingProfile);
	const fetchProfile = useStore(state => state.getProfile);
	const userId = useStore(state => state.userId)
	const [changedMonthlyLimit,setChangedMonthlyLimit] = useState(false)

	const onMonthlyLimitChange = (event) => {
		setMonthlyLimitTextFieldValue(event.target.value);
		if(monthlyLimitTextFieldValue != userProfile.monthlyLimit){
			setChangedMonthlyLimit(true)
		}
	}

	useEffect(()=>{
		async function fetch(){
			if(!fetchingProfile && Object.keys(userProfile).length  === 0)	{
				await fetchProfile(userId,fetchingProfile)
			}
		}
		fetch();
	})

	return (
		<div>
			{fetchingProfile ? (
				<Loader />
			) : (
				<div className="profile-container">
					<img src={avatar} alt=""			/>
					
					<div style={{ width: "25%", marginTop: "30px" }} class="container">
						<div class="row">
							<div class="col-sm">Name</div>
							<div class="col-sm" style={{ fontWeight: "bold" }}>
								{userProfile.name}
							</div>
						</div>
					</div>

					<div
						style={{ width: "25%", marginTop: "30px", marginBottom: "20px" }}
						class="container"
					>
						<div class="row">
							<div class="col-sm">Email</div>
							<div class="col-sm" style={{ fontWeight: "bold" }}>
							{userProfile.email}

							</div>
						</div>
					</div>

					<h6 style={{ margin: "1em", fontWeight: "bold" }}>
						Current Monthly Limit
					</h6>
					<input
						value={userProfile.monthlyLimit}
						className="monthly-limit-textfield"
						onChange={(e) => onMonthlyLimitChange(e)}
						type="number"
						name="monthlyLimit"
						readOnly
					/>
					{
						changedMonthlyLimit ? <button>Save</button> : null
					}
				</div>
			)}
		</div>
	);
}
