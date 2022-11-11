import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "./home.css"
import ExpenditureBreakdown from './expenditure_breakdown';
import ExpenditureTable from '../expenditure_table/expenditure_table';
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate } from "react-router-dom";
import AddExpenseModal from '../add_expense_modal/add_expense_modal';
import ExpenseCharts from '../expense_charts/expense_charts';

const Home = () => {
  const navigate = useNavigate();
  const [showPopup,setShowPopup] = useState(false)
  const onFabClick = () => {
    setShowPopup(!showPopup)
  }
   return (<div className="main-container">
  <div className="sidebar">
    <div className="logo">
      <svg width="45" height="45" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="45" cy="45" r="45" fill="#0B69FF"/>
        <path d="M28.99 39.05V43.31H35.86V47.27H28.99V51.89H36.76V56H23.86V34.94H36.76V39.05H28.99ZM55.2405 34.94V39.05H49.6605V56H44.5305V39.05H38.9505V34.94H55.2405ZM56.7651 38.87V34.1H65.0751V56H59.7351V38.87H56.7651Z" fill="white"/>
      </svg>
    </div>
    <div className="nav-links">
      <a href='#' className='active'>
        <svg width="25" height="auto" viewBox="0 0 46 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.4 42V27.1765H27.6V42H39.1V22.2353H46L23 0L0 22.2353H6.9V42H18.4Z" fill="black"/>
        </svg>
      </a>
      <a href="#">
        <svg width="25" height="auto" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M36 4H34V0H30V4H10V0H6V4H4C1.8 4 0 5.8 0 8V40C0 42.2 1.8 44 4 44H36C38.2 44 40 42.2 40 40V8C40 5.8 38.2 4 36 4ZM36 40H4V14H36V40Z" fill="black"/>
        </svg>
      </a>
    </div>
  </div>
  
  <div className="main-area">
    <h1 className='hello-text'>Hello, Raajeev</h1>
    <ExpenditureBreakdown/>
    {/* <h1 className='hello-text'>Most Recent Expenses</h1> */}
    {/* <ExpenditureTable/> */}
    {/* <h1 className='hello-text'>Expenditure Insights</h1> */}

    <ExpenseCharts/>
    {
      showPopup ? <AddExpenseModal show={showPopup} handleClose={onFabClick} >
      
    </AddExpenseModal> : null
    }
    <button className='float' onClick={onFabClick}>
    <i class="fa fa-solid fa-plus" style={{color:"black"}}></i>
    </button>
  </div>

  
</div>


)
  }



export default Home;