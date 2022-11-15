import { chartArea } from "fontawesome";
import React, { useEffect, useState } from "react";
import {
	Radar,
	RadarChart,
	PolarGrid,
	Legend,
	PolarAngleAxis,
	PolarRadiusAxis,
	ResponsiveContainer,
	PieChart,
	Pie,
	Sector,
	Cell,
} from "recharts";
import Loader from "../../components/loader/loader"
import useStore from "../../state";
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);


const data = [
	{
		subject: "Food",
		A: 120,
		B: 110,
		fullMark: 3000,
	},
	{
		subject: "Automobiles",
		A: 98,
		B: 130,
		fullMark: 3000,
	},
	{
		subject: "Entertainment",
		A: 86,
		B: 130,
		fullMark: 3000,
	},
	{
		subject: "Clothing",
		A: 99,
		B: 100,
		fullMark: 3000,
	},
	{
		subject: "Healthcare",
		A: 85,
		B: 90,
		fullMark: 3000,
	},
	{
		subject: "Others",
		A: 65,
		B: 85,
		fullMark: 3000,
	},
];




// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
// 	cx,
// 	cy,
// 	midAngle,
// 	innerRadius,
// 	outerRadius,
// 	percent,
// 	index,
// }) => {
// 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
// 	const x = cx + radius * Math.cos(-midAngle * RADIAN);
// 	const y = cy + radius * Math.sin(-midAngle * RADIAN);

// 	return (
// 		<text
// 			x={x}
// 			y={y}
// 			fill="white"
// 			textAnchor={x > cx ? "start" : "end"}
// 			dominantBaseline="central"
// 		>
// 			{`${(percent * 100).toFixed(0)}%`}
// 		</text>
// 	);
// };

export default function ExpenseCharts() {

	const [loading,setLoading] = useState(true)
	const userId = useStore(state=>state.userId)
	const fetchChart = useStore(state=> state.fetchCharts)
	const fetchingChart = useStore(state => state.fetchingChart)
	const chartData = useStore(state=> state.chart)
	const pieChartData = useStore(state=> state.pieChart)
	const radarChartData = useStore(state => state.radarChart)

	let renderLabel = function(entry) {
		return entry.name;
	}



		useEffect(()=>{
			async function fetch(){
				if(!fetchingChart && Object.keys(chartData).length === 0){
					await fetchChart(userId,fetchingChart)
				}
				console.log(pieChartData)
			}	
			fetch()
		})

		return fetchingChart ? <Loader/> : (
			<div style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}>
					<ReactFC {...{
		type: 'column2d',
		width: 600,
		height: 400,
		dataFormat: 'json',
		dataSource: {
			"chart": {
			  "caption": "",
			  "subCaption": "",
			  "xAxisName": "Categories",
			  "yAxisName": "Spent",
			  "theme": "fusion"
			},
			"data": radarChartData
		  },
	  }} /> 

				{
					
						
				 <div style={{ width: "100%", height: 450 }}>
					 <ResponsiveContainer>
						 <PieChart>
							 <Pie dataKey="value" data={pieChartData} fill="#8884d8" label={renderLabel} />
						 </PieChart>
					 </ResponsiveContainer>
				 </div>
				}
			</div>
		);
	
}


<ResponsiveContainer width={"99%"} height={500}>
					 <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
						 <PolarGrid />
						 <PolarAngleAxis dataKey="subject" />
						 <PolarRadiusAxis angle={30} domain={[0, 150]} />
						 <Radar
							 name="Food"
							 dataKey="A"
							 stroke="#8884d8"
							 fill="#8884d8"
							 fillOpacity={0.6}
						 />
						 {/* <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} /> */}
						 <Legend />
					 </RadarChart>
				 </ResponsiveContainer>