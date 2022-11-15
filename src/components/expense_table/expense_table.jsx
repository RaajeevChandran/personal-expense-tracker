import React, { useEffect, useState } from "react";
import "./expense_table.css";
import dayjs from "dayjs";
import Modal from "react-modal";
import useStore from "../../state";
import Loader from "../../components/loader/loader"
import { satellite } from "fontawesome";

const ExpenseTable = () => {
	let expenseTypes = ["All Expenses", "Debit", "Credit"];
	const [expenseType, setExpenseType] = useState("All Expenses");
	const [showDeleteExpensePopup, setShowDeleteExpensePopup] = useState(false);
	const [loading, setLoading] = useState(false);
	const allExpenses = useStore((state) => state.allExpenses);
	const creditExpenses = useStore((state) => state.creditExpenses);
	const debitExpenses = useStore((state) => state.debitExpenses);
	const fetchingTable = useStore(state=>state.fetchingExpensesTable)
	const [deleteExpenseId,setDeleteExpenseId] = useState('')
	const [deletingExpense,setDeletingExpense] = useState(false)

	const fetchExpensesTable = useStore((state) => state.fetchExpensesTable);

	const deleteExpenseFromTable = useStore(state=> state.deleteExpenseFromTable)
	const deleteExpenseAPI = useStore(state=>state.deleteExpense)
	

	const userId = useStore((state) => state.userId);

	const onExpenseTypeChange = (e) => {
		setExpenseType(e.target.value);
		fetch();
	};

	const onDeleteExpenseIconClick = (id) => {
		setDeleteExpenseId(id)
		setDeletingExpense(false)
		setShowDeleteExpensePopup(true);
	};

	const onDeleteExpenseButtonOnModalClick = async() => {
		setDeletingExpense(true)
		await deleteExpenseAPI(userId,deleteExpenseId)
		deleteExpenseFromTable(expenseType.toLowerCase(),allExpenses,creditExpenses,debitExpenses,deleteExpenseId)
		setDeletingExpense(false)
		setShowDeleteExpensePopup(false)
	}

	async function fetch() {
		if (
			expenseType == "All Expenses" &&
			Array.from(allExpenses).length === 0 && !fetchingTable
		) {
			await fetchExpensesTable(fetchingTable,userId, "All Expenses");
		} else if (
			expenseType == "Credit" &&
			Array.from(creditExpenses).length === 0 && !fetchingTable
		) {
			await fetchExpensesTable(fetchingTable,userId, "Credit");
		} else if (
			expenseType == "Debit" &&
			Array.from(debitExpenses).length === 0 && !fetchingTable
		) {

			await fetchExpensesTable(fetchingTable,userId, "Debit");
		}
	}

	useEffect(() => {
		fetch();
	});

	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
		},
	};

	const buttonStyle = (color) => {
		return {
			width: "130px",
			height: "40px",
			color: "#fff",
			borderRadius: "5px",
			padding: "10px 25px",
			marginRight: "10px",
			textAlign: "center",
			background: color,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		};
	};

	return (
		<div>
			<div className="table-filter">
				<select className="filter-dropdown" onChange={onExpenseTypeChange}>
					{expenseTypes.map((n) => (
						<option className="filter-dropdown-item" value={n}>
							{n}
						</option>
					))}
				</select>
			</div>

			<Modal
				isOpen={showDeleteExpensePopup}
				onRequestClose={()=>{
					setShowDeleteExpensePopup(false)
				}}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<h1>Delete Expense?</h1>
				<h4 style={{ fontWeight: "200" }}>
					{
						`Are you sure you want to delete this expense ? This action is
						IRREVERSIBLE`
					}
				</h4>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "flex-end",
						marginTop: "20px",
					}}
				>
					<button style={buttonStyle("#4aa088")} onClick={()=>{
						setShowDeleteExpensePopup(false)
					}}>
						Cancel
					</button>
					<button
						style={buttonStyle("linear-gradient(to right, #ff416c, #ff4b2b)")}
						onClick={onDeleteExpenseButtonOnModalClick}
					>
						{
							deletingExpense  ? 'Deleting' : 'Delete'
						}
					</button>
				</div>
			</Modal>

			{
				fetchingTable ? <Loader/> : (
					
					<table className="expense-table">
				<thead>
					<tr>
						<th className="column-names">Date</th>
						<th className="column-names">Expense</th>
						<th className="column-names">Category</th>
						<th className="column-names">Notes</th>
						<th className="column-names"> </th>
					</tr>
				</thead>
				<tbody>
					{Array.from(expenseType == "All Expenses" ? allExpenses : (expenseType == "Credit" ? creditExpenses : debitExpenses)).map((e) => {
						return (
							<tr>
								<td className="table-entry">
									{dayjs(e.date).format("DD MMM YY")}
								</td>
								<td className="table-entry">₹ {e.amount}</td>
								<td className="table-entry">{e["category_name"]}</td>
								<td className="table-entry">{e["description"]}</td>
								<td>
									<div className="table-entry-actions">
										<i className="bx bx-edit" id="table-entry-icon" />
										<i
											className="bx bxs-trash"
											id="table-entry-icon"
											onClick={()=>onDeleteExpenseIconClick(e['expense_id'])}
											style={{ color: "#de2146" }}
										/>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			 </table>
				)
			}
		</div>
	);
};

export default ExpenseTable;
