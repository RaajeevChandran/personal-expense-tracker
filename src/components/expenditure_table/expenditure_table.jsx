import React from "react"
import "./expenditure_table.css"
const ExpenditureTable = () => (
    <div class="table-container">
	<table>
		<thead>
			<tr>
				<th>Date</th>
				<th>Expense</th>
				<th>Category</th>
				<th>Notes</th>
				<th> </th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>12/4/22</td>
				<td>
				₹ 200
				</td>
				<td>Food</td>
				<td>Breakfast expense</td>
				<td>Cell 5</td>
			</tr>
			<tr>
				<td>Cell 1</td>
				<td>Cell 2</td>
				<td>Cell 3</td>
				<td>Cell 4</td>
				<td>Cell 5</td>
			</tr>
			<tr>
				<td>Cell 1</td>
				<td>Cell 2</td>
				<td>Cell 3</td>
				<td>Cell 4</td>
				<td>Cell 5</td>
			</tr>
			<tr>
				<td>Cell 1</td>
				<td>Cell 2</td>
				<td>Cell 3</td>
				<td>Cell 4</td>
				<td>Cell 5</td>
			</tr>
			<tr>
				<td>Cell 1</td>
				<td>Cell 2</td>
				<td>Cell 3</td>
				<td>Cell 4</td>
				<td>Cell 5</td>
			</tr>
		</tbody>
	</table>
</div>
)

export default ExpenditureTable;