import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './app_layout';
import Home from './pages/home/home';
import ExpenseTable from './components/expense_table/expense_table';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route index element={<Home />} />
                    {/* <Route path='/started' element={<Blank/>} /> */}
                    <Route path='/stats' element={<ExpenseTable />} />
                    <Route path='/profile' element={<Blank />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
const Blank = () => {
  return <div>This is Blank page</div>;
};

export default App;