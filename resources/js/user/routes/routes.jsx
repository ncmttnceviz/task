import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../pages/login";
import PrivateRoute from "./privateRoute";
import Panel from "../pages/panel";
import Register from "../pages/register";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path={'/'}  element={<Login/>} />
                <Route exact path={'/register'}  element={<Register/>} />
                <Route exact path='/' element={<PrivateRoute/>}>
                    <Route path={'panel'} element={<Panel/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;
