import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/app_layout';
import Home from './pages/home/home';
import ExpenseTable from './components/expense_table/expense_table';
import Authentication from "./pages/authentication/authentication"
import useStore from './state';
function App() {
  const userId = useStore(state => state.userId)

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={userId==='' ? <Authentication/> : <AppLayout />}>
                    <Route index element={<Home />} />
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