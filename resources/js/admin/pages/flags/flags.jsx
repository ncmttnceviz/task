import {Stack, Button, Grid, Typography, Box, LinearProgress, Snackbar, Alert} from "@mui/material";
import {Add} from "@mui/icons-material";
import FlagTable from "../../compotents/flagTable";
import {useEffect, useState} from "react";
import {getFlags} from "../../api/flagApi";
import {Link} from "react-router-dom";


const Flags = () => {

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState();
    const [status, setStatus] = useState();
    const [items, setItems] = useState([]);

    useEffect( () => {
        getFlags().then((res) => {
            setMessage(res.message)
            setStatus(res.status)
            setItems(res.data)
            setLoading(false)
        })
    },[])

    return (
        <>
            <Grid container spacing={2} marginTop={3}>
                <Grid item xs={9}>
                    <Stack direction={'row'} justifyContent={'space-between'} marginBottom={1}>
                        <Typography>Flags</Typography>
                        <Link to={'/admin/flags/add'}  style={{textDecoration:'none', color:'inherit'}}>
                            <Button variant={"contained"} startIcon={<Add/>}> Add </Button>
                        </Link>
                    </Stack>
                    <Box sx={{width: '100%'}}>
                        {loading && <LinearProgress/>}
                    </Box>
                </Grid>
                <Grid item xs={9}>
                    <FlagTable data={items}/>
                </Grid>
                <Snackbar open={!!message} autoHideDuration={6000}>
                    <Alert variant="filled" severity={status ? 'success' : 'error'}>
                        {message}
                    </Alert>
                </Snackbar>
            </Grid>
        </>
    )
}

export default Flags;
