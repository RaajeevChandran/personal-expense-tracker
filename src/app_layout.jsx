import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";

const AppLayout = () => {
    return <div style={{
        padding: '20px 0px 0px 320px'
    }}>
        <Sidebar />
        <Outlet />
    </div>;
};

export default AppLayout;