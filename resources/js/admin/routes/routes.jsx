import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../pages/login";
import PrivateRoute from "./privateRoute";
import Layout from "../compotents/layout/layout";
import Logout from "../pages/logout";
import Flags from "../pages/flags/flags";
import AddFlag from "../pages/flags/addFlag";
import Members from "../pages/members/members";
import Requests from "../pages/requests/requests";
import WaitingRequests from "../pages/requests/watingRequests";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path={'/admin/login'}  element={<Login/>} />
                <Route exact path='/admin' element={<Layout><PrivateRoute/></Layout>}>
                    <Route path={'/admin/logout'} element={<Logout/>}/>
                    <Route path={'/admin/flags'} element={<Flags/>}/>
                    <Route path={'/admin/flags/add'} element={<AddFlag/>}/>
                    <Route path={'/admin/members'} element={<Members/>}/>
                    <Route path={'/admin/requests'} element={<Requests/>}/>
                    <Route path={'/admin/waiting_requests'} element={<WaitingRequests/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;
