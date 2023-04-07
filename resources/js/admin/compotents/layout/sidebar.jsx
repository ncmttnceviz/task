import {Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {ExitToApp, Flag, RequestPage, VerifiedUser} from "@mui/icons-material";
import Logout from "../../pages/logout";
import {Link} from "react-router-dom";

const Sidebar = () => {
    return (
        <>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Flag/>
                        </ListItemIcon>
                        <Link
                            style={{textDecoration: 'none', color: 'inherit'}}
                            to={'/admin/flags'}
                        >
                            <ListItemText primary={'Flags'}/>
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <VerifiedUser/>
                        </ListItemIcon>
                        <Link
                            style={{textDecoration: 'none', color: 'inherit'}}
                            to={'/admin/members'}
                        >
                            <ListItemText primary={'Members'}/>
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <RequestPage/>
                        </ListItemIcon>
                        <Link
                            style={{textDecoration: 'none', color: 'inherit'}}
                            to={'/admin/requests'}
                        >
                            <ListItemText primary={'Requests'}/>
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <RequestPage/>
                        </ListItemIcon>
                        <Link
                            style={{textDecoration: 'none', color: 'inherit'}}
                            to={'/admin/waiting_requests'}
                        >
                            <ListItemText primary={'Waiting Requests'}/>
                        </Link>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ExitToApp/>
                        </ListItemIcon>
                        <Link
                            style={{textDecoration: 'none', color: 'inherit'}}
                            to={'/admin/logout'}
                        >
                            <ListItemText primary={'Logout'}/>
                        </Link>
                    </ListItemButton>
                </ListItem>
            </List>
        </>

    )
}

export default Sidebar;
