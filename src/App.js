import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/app_layout';
import Home from './pages/home/home';
import ExpenseTable from './components/expense_table/expense_table';
import Authentication from "./pages/authentication/authentication"
import useStore from './state';
import Profile from './pages/profile/profile';
function App() {
  const userId = useStore(state => state.userId)

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={userId==='' ? <Authentication/> : <AppLayout />}>
                    <Route index element={<Home />} />
                    <Route path='/stats' element={<ExpenseTable />} />
                    <Route path='/profile' element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}


export default App;