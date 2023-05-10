import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { MainContextProvider } from './contexts/MainContext';
import { HomeProvider } from "./contexts/HomeContext";
import HomePage from './pages/Home';

import App from './pages/Main/App';
import { getItem } from './utils/storage';
import ClientsPage from './pages/Clients';
import ChargesPage from './pages/Charges';
import ClientDetailPage from './pages/ClientDetail';

function MainRoutes() {
    function ProtectedRoutes({ redirectTo }) {
        const token = getItem('token');
        console.log(token);
        return token ? <Outlet /> : <Navigate to={redirectTo} />
    }

    return (
        <Routes>
            <Route path='/' element={<MainContextProvider><App /></MainContextProvider>} />
            <Route element={<ProtectedRoutes redirectTo='/' />} >
                <Route path='/Home' element={<HomePage />} />
                <Route path='/Clients/:status' element={<HomeProvider><ClientsPage /></HomeProvider>} />
                <Route path='/Clients/detalhamento/:id/:name' element={<HomeProvider><ClientDetailPage /></HomeProvider>} />
                <Route path='/Charges/:status' element={<HomeProvider><ChargesPage /></HomeProvider>} />
            </Route>
            <Route path='*' element={<MainContextProvider><App /></MainContextProvider>} />
        </Routes>
    )
}

export default MainRoutes;
