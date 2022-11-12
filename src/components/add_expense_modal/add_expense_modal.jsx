import './add_expense_modal.css';
import React,{useState,useEffect} from 'react'
const AddExpenseModal = ({ handleClose, show }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const [formData, setFormData] = useState({
    date:"",
    amount: "",
    category: "",
    notes: "",
    expenseType:""
  });
  

  let categories = [ "Food", "Automobiles", "Entertainment", "Clothing", "Healthcare", "Others"];
  let expenseTypes = ["Credit","Debit"]

  const [categoryDropDown,setCategoryDropDown] = useState("Food")
  const [expenseType, setExpenseType] = useState('Credit')

  const onCategoryChange = (e) => {
    setCategoryDropDown(e.target.value)
  }

  const onExpenseTypeChange = (e) => {
    setExpenseType(e.target.value)
  }

  const updateFormData = event =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  const { amount, notes,date } = formData;

  const handleSubmit = () => {
    
  }

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
       
        <div className='close-button-container'>
        <button className='close-button' onClick={handleClose}>
          <i className='fa fa-solid fa-close'/>
        </button>
        </div>

        <div className='form'>
        <h1>Create Expense</h1>
        <form>
        <h6 style={{margin:'1em',fontWeight:"bold"}}>Date</h6>
        <input
        value={date}
        className="textfield"
        onChange={e => updateFormData(e)}
        type="date"
        name="date"
        required
      />
        <h6 style={{margin:'1em',fontWeight:"bold"}}>{'Amount (₹)'}</h6>

      <input
        value={amount}
        className="textfield"
        onChange={e => updateFormData(e)}
        type="number"
        name="amount"
        required
      />
      
        <h6 style={{margin:'1em',fontWeight:"bold"}}>Category</h6>
        <select className='textfield' onChange={onCategoryChange}>
          {categories.map(n => (
            <option className='dropdown-item' value={n}>{n}</option>
          ))}
        </select>

        <h6 style={{margin:'1em',fontWeight:"bold"}}>Expense Type</h6>
        <select className='textfield' onChange={onExpenseTypeChange}>
          {expenseTypes.map(n => (
            <option className='dropdown-item' value={n}>{n}</option>
          ))}
        </select>
   
      <h6 style={{margin:'1em',fontWeight:"bold"}}>Notes</h6>

      <input
        value={notes}
        className="textfield"
        onChange={e => updateFormData(e)}
        type="text"
        name="notes"
        required
      />

      <div className='create-expense-button-container'>
      <button  className='create-expense-button'>Create</button>
      </div>
    </form>
        </div>
      </div>
    </div>
  );
};
export default AddExpenseModal;