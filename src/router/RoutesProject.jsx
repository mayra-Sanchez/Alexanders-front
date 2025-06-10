import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import AdminPanel from "../pages/admin/AdminPanel";

const RoutesProject = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesProject;