import {useEffect} from "react";
import {removeUser} from "../../utils";
import {Navigate} from "react-router-dom";

const Logout = () =>  {
    useEffect(() => {
        removeUser('appOne')
    }, [])

    return <Navigate to={'/admin/login'}/>
}

export default Logout;
