import React from "react"
import "./expense_table.css"
import dayjs from "dayjs"
const ExpenseTable = () => (
    <div class="table-container">
	<table className="expense-table">
		<thead>
			<tr>
				<th className = "column-names">Date</th>
				<th className = "column-names">Expense</th>
				<th className = "column-names">Category</th>
				<th className = "column-names">Notes</th>
				<th className = "column-names"> </th>
			</tr>
		</thead>
		<tbody>
				{
					Array.from(Array(20).keys()).map((e)=>{
						return (<tr>
							<td className="table-entry">{dayjs("2022-05-05").format('DD MMM YY')}</td>
						<td className="table-entry">
						₹ 200
						</td>
						<td className="table-entry">Food</td>
						<td className="table-entry">Breakfast at Sheraton</td>
						<td>
							<div className="table-entry-actions">
								<i className="bx bx-edit" id="table-entry-icon" />
								<i className="bx bxs-trash" id="table-entry-icon" style={{color:"#de2146"}}/>
							</div>
						</td>
						</tr>)
					})
				}
			
			
		</tbody>
	</table>
</div>
)

export default ExpenseTable;