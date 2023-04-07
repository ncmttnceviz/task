import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {getUser} from "../../utils";

const PrivateRoute = () => {
    const auth = !!getUser('appOne');
    return auth ? <Outlet /> : <Navigate to="/admin/login" />;
}

export default PrivateRoute;
