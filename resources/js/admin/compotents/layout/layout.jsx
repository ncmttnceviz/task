import {Box, Container, Drawer, Grid} from "@mui/material";
import Sidebar from "./sidebar";

const Layout = ({children}) => {
    return (
        <Grid container spacing={0}>
            <Grid item xs={2} >
            <Drawer
                variant={"permanent"}
                open={true}
            >
                <Sidebar/>
            </Drawer>
            </Grid>
            <Grid item xs={10} >
                {children}
            </Grid>
        </Grid>
    )
}

export default Layout;
