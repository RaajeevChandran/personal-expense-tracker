import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/app_layout';
import Home from './pages/home/home';
import ExpenseTable from './components/expense_table/expense_table';
import Authentication from "./pages/authentication/authentication"
import { useCookies } from 'react-cookie';

import Profile from './pages/profile/profile';
import { useEffect } from 'react';
import useStore from './state';

function App() {
  const [cookies,setCookies]      = useCookies()
  const setUserId = useStore(state =>state.setUserId)

  useEffect(()=>{
    setUserId(cookies.userId)
  })

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={cookies.userId==='' ? <Authentication/> : <AppLayout />}>
                    <Route index element={<Home />} />
                    <Route path='/stats' element={<ExpenseTable />} />
                    <Route path='/profile' element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}


export default App;