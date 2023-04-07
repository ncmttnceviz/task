import {
    Stack,
    Grid,
    Typography,
    Box,
    LinearProgress,
    Snackbar,
    Alert,
    TextField,
    FormControl, NativeSelect, Button
} from "@mui/material";
import {useEffect, useState} from "react";
import {filterRequests, getRequests} from "../../api/requestsApi";
import {getFlags} from "../../api/flagApi";
import {getUsers} from "../../api/usersApi";
import {Filter} from "@mui/icons-material";
import RequestsTable from "../../compotents/requestsTable";


const WaitingRequests = () => {

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [status, setStatus] = useState();
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState();
    const [total, setTotal] = useState(-1)

    useEffect(() => {
        loadData()
    }, [page])


    const loadData = async () => {
        getRequests(page).then((res) => {
            setMessage(res.message)
            setStatus(res.status)
            setItems(res.data?.requests)
            setLoading(false)
            setPerPage(res.data?.per_page)
            setTotal(res.data?.total)
        })
    }


    const handlePage = (event, page) => {
        setPage(page + 1)
    }


    return (
        <>
            <Grid container spacing={2} marginTop={3}>
                <Grid item xs={9}>
                    <Stack direction={'row'} justifyContent={'space-between'} marginBottom={1}>
                        <Typography>Point Requests</Typography>
                    </Stack>
                    <Box sx={{width: '100%'}}>
                        {loading && <LinearProgress/>}
                    </Box>
                </Grid>
                <Grid item xs={9}>
                    <RequestsTable
                        items={items}
                        perPage={perPage}
                        currentPage={page}
                        handlePage={handlePage}
                        total={total}
                        reload={loadData}
                        isDetail={false}
                    />
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

export default WaitingRequests;
